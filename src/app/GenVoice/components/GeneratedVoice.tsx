"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";

interface VoiceSegment {
    id: string;
    path: string;
    bucket: string;
    text: string;
    duration: number;
}

interface VoiceResults {
    type: string;
    text: string;
    voice: string;
    speed: number;
    segments: VoiceSegment[];
}

export function GeneratedVoice({ jobId, onRegenerate }: { jobId: string; onRegenerate: () => void }) {
    const [results, setResults] = useState<VoiceResults | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                // Simulate status check delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Demo response
                const demoResults: VoiceResults = {
                    type: 'demo',
                    text: 'This is a demo voice segment',
                    voice: 'Demo Voice',
                    speed: 1.0,
                    segments: [
                        {
                            id: '1',
                            path: 'demo1.mp3',
                            bucket: 'voices',
                            text: 'This is a demo voice segment',
                            duration: 5
                        },
                        {
                            id: '2',
                            path: 'demo2.mp3',
                            bucket: 'voices',
                            text: 'Another demo voice segment',
                            duration: 3
                        }
                    ]
                };

                setResults(demoResults);
                setIsLoading(false);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to fetch status');
                setIsLoading(false);
            }
        };

        checkStatus();
    }, [jobId]);

    if (isLoading) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-center h-32">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="text-center text-red-500">
                        <p>Error: {error}</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!results) {
        return null;
    }

    return (
        <Card>
            <CardContent className="p-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">Generated Voice</h3>
                        <p className="text-sm text-zinc-400">{results.text}</p>
                    </div>

                    <div className="space-y-2">
                        {results.segments.map((segment) => (
                            <div key={segment.id} className="relative h-[100px] w-full">
                                <Image
                                    src={`https://picsum.photos/800/600?random=${segment.id}`}
                                    alt={`Voice segment ${segment.id}`}
                                    fill
                                    unoptimized
                                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="bg-white/10 hover:bg-white/20"
                                    >
                                        <Download className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 