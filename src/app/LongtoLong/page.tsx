"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { HeroxShortsIcon } from "@/components/ui/custom-icon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/utils";
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
};

interface CreditInfo {
    videoProcessCredits: number;
}

export default function LongtoLongPage() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [includeBroll, setIncludeBroll] = useState(false);
    const [uploadedVideoId, setUploadedVideoId] = useState<string | null>(null);
    const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [isValidatingYoutube, setIsValidatingYoutube] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleUpload = useCallback(async (videoFile: File) => {
        if (!videoFile.type.startsWith('video/')) {
            return;
        }

        setUploading(true);
        setProgress(0);

        try {
            // Simulate upload progress
            const uploadTimer = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 95) {
                        clearInterval(uploadTimer);
                        return 95;
                    }
                    return prev + 5;
                });
            }, 500);

            // Simulate successful upload after 3 seconds
            await new Promise(resolve => setTimeout(resolve, 3000));
            clearInterval(uploadTimer);
            setProgress(100);

            // Demo response
            const demoVideoId = 'demo-' + Math.random().toString(36).substring(7);
            setUploadedVideoId(demoVideoId);
            setUploadedVideoUrl(URL.createObjectURL(videoFile));
            return demoVideoId;
        } catch (error) {
            console.error('Upload error:', error);
            toast({
                title: "Upload failed",
                description: error instanceof Error ? error.message : "An error occurred",
                variant: "destructive",
            });
            return null;
        } finally {
            setUploading(false);
            setProgress(0);
        }
    }, [includeBroll]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const videoFile = acceptedFiles[0];
            setFile(videoFile);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'video/*': ['.mp4', '.webm', '.mkv']
        },
        maxSize: 2 * 1024 * 1024 * 1024, // 2GB
        multiple: false
    });

    const cancelUpload = () => {
        setFile(null);
        setProgress(0);
        setUploading(false);
        setUploadedVideoId(null);
        setUploadedVideoUrl(null);
    };

    const handleYoutubeSubmit = async () => {
        if (!youtubeUrl) return;

        setIsValidatingYoutube(true);
        try {
            // Simulate validation delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Demo response
            const demoVideoId = 'demo-' + Math.random().toString(36).substring(7);
            setUploadedVideoId(demoVideoId);
            setUploadedVideoUrl(youtubeUrl);
            toast({
                title: "YouTube video added",
                description: "Click Process to continue.",
            });
        } catch (error) {
            console.error('YouTube error:', error);
            toast({
                title: "Failed to add YouTube video",
                description: error instanceof Error ? error.message : "An error occurred",
                variant: "destructive",
            });
        } finally {
            setIsValidatingYoutube(false);
        }
    };

    const handleProcess = async () => {
        if (!file && !youtubeUrl) return;
        setIsProcessing(true);

        try {
            let videoId = uploadedVideoId;

            if (file && !uploadedVideoId) {
                const newVideoId = await handleUpload(file);
                if (!newVideoId) {
                    throw new Error('Upload failed');
                }
                videoId = newVideoId;
            }

            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast({
                title: "Processing started",
                description: "Your video is being processed to find viral moments. You can track the progress in My Projects.",
            });

            router.push('/MyProjects');
        } catch (error) {
            console.error('Processing error:', error);
            toast({
                title: "Processing failed",
                description: error instanceof Error ? error.message : "Failed to start processing",
                variant: "destructive",
            });
        } finally {
            setIsProcessing(false);
        }
    };

    // Update the file display in the dropzone
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <motion.div
            className="container mx-auto px-4 py-8"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
        >
            <div className="flex items-center mb-8 space-x-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push('/Home')}
                >
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <HeroxShortsIcon className="h-8 w-8" />
                <h1 className="text-2xl font-bold">Long to Long</h1>
            </div>

            <Card>
                <CardContent className="p-6">
                    <div className="w-full">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">Upload Your Long Video</h2>
                            <p className="text-zinc-400">We'll find upto 6 viral moments (3-10 minutes each)</p>
                        </div>

                        <div className="flex items-center space-x-2 mb-4">
                            <Checkbox
                                id="includeBroll"
                                checked={includeBroll}
                                onCheckedChange={(checked) => setIncludeBroll(checked as boolean)}
                                disabled
                                className="opacity-50 cursor-not-allowed"
                            />
                            <label
                                htmlFor="includeBroll"
                                className="text-sm text-zinc-400 cursor-not-allowed opacity-50"
                            >
                                Include AI-generated B-roll images
                            </label>
                            <div className="bg-gray-700 px-3 py-1 rounded-full text-xs font-bold text-white ml-2">
                                Soon
                            </div>
                        </div>

                        <Tabs defaultValue="upload" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-4">
                                <TabsTrigger value="upload">Upload Video</TabsTrigger>
                                <TabsTrigger value="YT">YouTube URL</TabsTrigger>
                            </TabsList>

                            <TabsContent value="upload">
                                <div className="relative">
                                    <div
                                        {...getRootProps()}
                                        className={`
                                            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                                            transition-colors duration-200
                                            ${isDragActive ? 'border-primary bg-primary/5' : 'border-zinc-700'}
                                            ${file ? 'border-success bg-success/5' : ''}
                                            hover:border-zinc-600
                                        `}
                                    >
                                        {uploadedVideoId && (
                                            <div className="absolute inset-0 bg-background/50 cursor-not-allowed" />
                                        )}
                                        <input {...getInputProps()} />
                                        {file ? (
                                            <div className="space-y-4">
                                                <div className="text-sm space-y-2">
                                                    <p className="font-medium">{file.name}</p>
                                                    <p className="text-zinc-400">{formatFileSize(file.size)}</p>
                                                </div>
                                                <AnimatePresence>
                                                    {(uploading || progress > 0) && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            className="space-y-2"
                                                        >
                                                            <Progress value={progress} className="w-full" />
                                                            <p className="text-sm text-center text-zinc-400">
                                                                Uploading... {progress}%
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                                {!uploading && !uploadedVideoId && (
                                                    <Button variant="destructive" onClick={cancelUpload}>
                                                        <X className="h-4 w-4 mr-2" />
                                                        Cancel
                                                    </Button>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <Upload className="mx-auto h-12 w-12 text-zinc-400" />
                                                <div>
                                                    <p className="text-lg font-semibold">
                                                        {isDragActive ? "Drop your video here" : "Drag & drop your video here"}
                                                    </p>
                                                    <p className="text-sm text-zinc-400 mt-1">
                                                        or click to select a file (MP4, WEBM, MKV up to 2GB)
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="YT">
                                <div className="space-y-4">
                                    <div className="flex space-x-2">
                                        <Input
                                            type="url"
                                            placeholder="Paste YouTube video URL"
                                            value={youtubeUrl}
                                            onChange={(e) => setYoutubeUrl(e.target.value)}
                                            disabled={isValidatingYoutube || !!uploadedVideoId}
                                        />
                                        <Button
                                            onClick={handleYoutubeSubmit}
                                            disabled={!youtubeUrl || isValidatingYoutube || !!uploadedVideoId}
                                        >
                                            {isValidatingYoutube ? "Validating..." : "Add"}
                                        </Button>
                                    </div>
                                    {uploadedVideoId && (
                                        <p className="text-sm text-green-500">
                                            YouTube video added successfully
                                        </p>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </CardContent>
            </Card>

            {(file || uploadedVideoId) && (
                <div className="flex justify-center space-x-4 mt-6">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div>
                                    <Button
                                        variant="default"
                                        size="lg"
                                        onClick={() => { }}
                                        disabled
                                        className="w-40"
                                    >
                                        Process Video
                                    </Button>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>This is a demo. Backend and database are not implemented, You can see examples in My Projects.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            )}
        </motion.div>
    );
} 