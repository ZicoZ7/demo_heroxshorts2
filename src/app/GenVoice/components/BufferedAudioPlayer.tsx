"use client";

import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";

interface BufferedAudioPlayerProps {
    src: string;
    text: string;
    downloadPath: string;
    index: number;
}

export function BufferedAudioPlayer({ src, text, downloadPath, index }: BufferedAudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (audioRef.current) {
            const audio = audioRef.current;

            // Set audio properties for better buffering
            audio.preload = "auto";
            // Set buffer size to 50MB
            if ('preservesPitch' in audio) {
                audio.preservesPitch = false; // For better performance
            }
            if ('webkitAudioContext' in window) {
                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                audioContext.createBufferSource();
            }

            // Add event listeners for better loading handling
            const handleCanPlay = () => {
                setIsLoaded(true);
                setError(null);
            };

            const handleWaiting = () => {
                setIsLoaded(false);
            };

            const handleError = (e: ErrorEvent) => {
                setError("Failed to load audio");
                setIsLoaded(false);
            };

            const handleProgress = () => {
                if (audio.buffered.length > 0) {
                    const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
                    const duration = audio.duration;
                    setProgress((bufferedEnd / duration) * 100);
                }
            };

            const handleStalled = () => {
                if (!isLoaded) {
                    // Try reloading if stalled
                    audio.load();
                }
            };

            audio.addEventListener('canplay', handleCanPlay);
            audio.addEventListener('waiting', handleWaiting);
            audio.addEventListener('error', handleError);
            audio.addEventListener('progress', handleProgress);
            audio.addEventListener('stalled', handleStalled);

            // Clean up
            return () => {
                audio.removeEventListener('canplay', handleCanPlay);
                audio.removeEventListener('waiting', handleWaiting);
                audio.removeEventListener('error', handleError);
                audio.removeEventListener('progress', handleProgress);
                audio.removeEventListener('stalled', handleStalled);
            };
        }
    }, []);

    return (
        <div className="p-2 rounded-md bg-[#b026ff]/5 hover:bg-[#b026ff]/10 transition-colors border border-[#b026ff]/20">
            <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] text-gray-500 line-clamp-1 flex-1">{text}</p>
                <a
                    href={downloadPath}
                    download={`audio_${index + 1}.wav`}
                    className="ml-2 p-1 rounded hover:bg-[#b026ff]/20 transition-colors"
                >
                    <Download className="h-3 w-3 text-[#b026ff]" />
                </a>
            </div>
            <div className="relative">
                {error && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-xs text-red-500">{error}</p>
                    </div>
                )}
                <audio
                    ref={audioRef}
                    controls
                    className={`w-full h-6 [&::-webkit-media-controls-panel]:bg-[#b026ff]/10 [&::-webkit-media-controls-current-time-display]:text-[#b026ff] [&::-webkit-media-controls-time-remaining-display]:text-[#b026ff] [&::-webkit-media-controls-play-button]:hover:brightness-125 [&::-webkit-media-controls-timeline]:accent-[#b026ff] [&::-webkit-media-controls-volume-slider]:accent-[#b026ff] ${!isLoaded ? 'opacity-50' : ''}`}
                >
                    <source src={src} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
                {!isLoaded && !error && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full max-w-[80%] h-1 bg-[#b026ff]/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#b026ff]/40 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 