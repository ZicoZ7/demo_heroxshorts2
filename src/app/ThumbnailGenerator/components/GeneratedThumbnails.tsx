"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";

interface Thumbnail {
    path: string;
    style: string;
    bucket: string;
    aspectRatio?: string;
}

interface GeneratedThumbnailsProps {
    thumbnails: Thumbnail[];
    aspectRatio: string;
    onDownload: (path: string) => Promise<void>;
    onRegenerate: () => Promise<void>;
    isLoading: boolean;
}

export function GeneratedThumbnails({ thumbnails, aspectRatio, onDownload, onRegenerate, isLoading }: GeneratedThumbnailsProps) {
    const aspectRatioClass = aspectRatio === '16:9' ? 'aspect-video' :
        aspectRatio === '9:16' ? 'aspect-[9/16]' :
            'aspect-square';

    return (
        <Card>
            <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {thumbnails.map((thumbnail, index) => (
                        <div key={index} className="relative group">
                            <div className={`relative ${aspectRatioClass} rounded-lg overflow-hidden`}>
                                <Image
                                    src={`https://picsum.photos/800/600?random=${index}`}
                                    alt={`Generated thumbnail ${index + 1}`}
                                    fill
                                    unoptimized
                                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="bg-white/10 hover:bg-white/20"
                                        onClick={() => onDownload(thumbnail.path)}
                                        disabled={isLoading}
                                    >
                                        <Download className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4">
                    <Button onClick={onRegenerate} disabled={isLoading}>
                        Regenerate
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
} 