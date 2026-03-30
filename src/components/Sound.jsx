import { useEffect } from 'react';
import { useSound } from '../hooks/UseSoundHook';

export default function Sound({ soundPath, shouldPlay, options = {} }) {
    const soundToUse = soundPath[Math.floor(Math.random() * soundPath.length)];
    const { play, error } = useSound(soundToUse, options); 

    useEffect(() => {
        console.log(`Playing sound: ${soundToUse}`);
        if (shouldPlay) play().catch((err) => console.error('Playback failed:', err));
    }, [shouldPlay, play]);
    if (error) console.error('Sound error:', error);  

    return null;
}