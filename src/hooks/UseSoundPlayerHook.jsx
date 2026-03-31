import { useRef, useEffect, useState, useCallback } from 'react';

export default function useSoundPlayer(soundPath)
{
    const paths = Array.isArray(soundPath) ? soundPath : [soundPath];

    const audioContextRef = useRef(null);
    const buffersRef = useRef(new Map());
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() =>
    {
        if (!audioContextRef.current)
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }, []);

    useEffect(() =>
    {
        const context = audioContextRef.current;
        if (!context) return;

        buffersRef.current.clear();
        setIsLoaded(false);
        setError(null);

        const loadPromises = paths.map(async (path) =>
        {
            try
            {
                if (buffersRef.current.has(path)) return;

                const response = await fetch(path);
                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = await context.decodeAudioData(arrayBuffer);
                buffersRef.current.set(path, audioBuffer);
            }
            catch (err)
            {
                console.error(`[DEBUG, UseSoundPlayerHook] Failed to load sound: ${path}`, err);
                throw err;
            }
        });

        Promise.all(loadPromises)
            .then(() =>
            {
                setIsLoaded(true);
                setError(null);
            })
            .catch((err) =>
            {
                setError(err);
                setIsLoaded(false);
            });
    }, [paths])

    const playRandom = useCallback(async () =>
    {
        if (!buffersRef.current.size)
        {
            console.warn('[DEBUG, UseSoundPlayerHook] No sounds loaded yet');
            return;
        }

        const context = audioContextRef.current;
        if (!context)
        {
            console.warn('[DEBUG] No AudioContext');
            return;
        }

        if (context.state === 'suspended')
        {
            console.log('[DEBUG] Resuming AudioContext');
            await context.resume();
        }

        const paths = Array.from(buffersRef.current.keys());
        const randomPath = paths[Math.floor(Math.random() * paths.length)];
        const buffer = buffersRef.current.get(randomPath);

        if (!buffer) return;

        const source = context.createBufferSource();
        source.buffer = buffer;

        const gainNode = context.createGain();
        source.connect(gainNode);
        gainNode.connect(context.destination);

        source.playbackRate.value = 0.7 + Math.random() * 0.6;
        source.detune.value = Math.random() * 400 - 200;
        gainNode.gain.value = 0.5 + Math.random() * 0.5;

        source.start();

        source.onended = () =>
        {
            source.disconnect();
            gainNode.disconnect();
        };
    }, []);

    useEffect(() =>
    {
        return () =>
        {
            if (audioContextRef.current)
            {
                audioContextRef.current.close();
                audioContextRef.current = null;
            }
        };
    }, []);

    return [playRandom, isLoaded, error];
}