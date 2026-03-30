import { useEffect, useRef, useState } from 'react';

export function useSound(soundUrl, options = {}) {
    const { volume = 1, loop = false, autoPlay = false } = options; 

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);   

    useEffect(() => {
        const audio = new Audio(soundUrl);
        audio.volume = volume;
        audio.loop = loop;
        audio.preload = 'auto';

        const handleCanPlayThrough = () => 
        {
            setIsLoading(false);
            setError(null);
        };

        const handleError = () => 
        {
            setError(new Error(`Failed to load sound: ${soundUrl}`));
            setIsLoading(false);
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);    

        audio.addEventListener('canplaythrough', handleCanPlayThrough);
        audio.addEventListener('error', handleError);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded); 
        audioRef.current = audio; 

        if (autoPlay) {
            audio.play().catch((err) => {
                console.warn('Auto‑play was blocked by the browser:', err);
                setError(err);
            });
        } 

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
                audioRef.current.removeEventListener('error', handleError);
                audioRef.current.removeEventListener('play', handlePlay);
                audioRef.current.removeEventListener('pause', handlePause);
                audioRef.current.removeEventListener('ended', handleEnded);
                audioRef.current = null;
            }
        };
    }, [soundUrl, volume, loop, autoPlay]); 
    
    const play = () => {
        if (!audioRef.current) {
            console.error(`[DEBUG] UseSoundHook: audio ${soundUrl} cannot be initialized`);
            return Promise.reject(new Error('Audio not initialized'));
        }
        return audioRef.current.play();
    };

    const pause = () => {
        if (audioRef.current && !audioRef.current.paused) audioRef.current.pause();
    };  

    return {
        play,
        pause,
        isPlaying,
        isLoading,
        error,
    };
}