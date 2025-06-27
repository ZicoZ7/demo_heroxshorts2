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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
};

const VOICE_OPTIONS = [
    { value: "alloy", label: "Alloy" },
    { value: "echo", label: "Echo" },
    { value: "fable", label: "Fable" },
    { value: "onyx", label: "Onyx" },
    { value: "nova", label: "Nova" },
    { value: "shimmer", label: "Shimmer" }
];

const IMAGE_MODEL_OPTIONS = [
    { value: "flux", label: "Flux" },
    { value: "turbo", label: "Turbo" }
];

export default function TurnIdeasToVideoPage() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadedVideoId, setUploadedVideoId] = useState<string | null>(null);
    const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
    const [socialVideoUrl, setSocialVideoUrl] = useState('');
    const [isValidatingVideo, setIsValidatingVideo] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [selectedVoice, setSelectedVoice] = useState('alloy');
    const [selectedImageModel, setSelectedImageModel] = useState('flux');
    const [enhanceImages, setEnhanceImages] = useState(true);
    const [numImages, setNumImages] = useState('1');

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
            toast({
                title: "Upload complete",
                description: "Click Process to continue.",
            });
            return demoVideoId;
        } catch (error) {
            console.error('Upload error:', error);
            toast({
                title: "Upload failed",
                description: error instanceof Error ? error.message : "An error occurred",
                variant: "destructive",
            });
        } finally {
            setUploading(false);
            setProgress(0);
        }
    }, [selectedVoice, selectedImageModel]);

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

    const handleSocialVideoSubmit = async () => {
        if (!socialVideoUrl) {
            toast({
                title: "URL Required",
                description: "Please enter a social media video URL",
                variant: "destructive",
            });
            return;
        }

        setIsValidatingVideo(true);
        try {
            // Simulate validation delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Demo response
            const demoVideoId = 'demo-' + Math.random().toString(36).substring(7);
            setUploadedVideoId(demoVideoId);
            setUploadedVideoUrl(socialVideoUrl);
            toast({
                title: "Video added",
                description: "Click Process to continue.",
            });
        } catch (error) {
            console.error('Validation error:', error);
            toast({
                title: "Failed to add video",
                description: error instanceof Error ? error.message : "An error occurred",
                variant: "destructive",
            });
        } finally {
            setIsValidatingVideo(false);
        }
    };

    const handleProcess = async () => {
        if (!prompt.trim()) {
            toast({
                title: "Prompt Required",
                description: "Please enter what you want to create",
                variant: "destructive",
            });
            return;
        }

        setIsProcessing(true);
        try {
            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast({
                title: "Processing started",
                description: "Your video is being processed. You can track the progress in My Projects.",
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
                <h1 className="text-2xl font-bold">Turn Ideas To Video</h1>
            </div>

            <Card>
                <CardContent className="p-6">
                    <div className="w-full">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">Upload Your Video</h2>
                            <p className="text-zinc-400">We'll transcribe, generate images, and create a vertical video with AI-generated audio</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="space-y-2">
                                <Label htmlFor="voice">Voice</Label>
                                <Select
                                    defaultValue={selectedVoice}
                                    onValueChange={setSelectedVoice}
                                    disabled={!!uploadedVideoId}
                                >
                                    <SelectTrigger id="voice">
                                        <SelectValue placeholder="Select voice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {VOICE_OPTIONS.map(option => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="imageModel">Image Model</Label>
                                <Select
                                    defaultValue={selectedImageModel}
                                    onValueChange={setSelectedImageModel}
                                    disabled={!!uploadedVideoId}
                                >
                                    <SelectTrigger id="imageModel">
                                        <SelectValue placeholder="Select image model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {IMAGE_MODEL_OPTIONS.map(option => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Tabs defaultValue="upload" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-4">
                                <TabsTrigger value="upload">Upload Video</TabsTrigger>
                                <TabsTrigger value="YT2">Social Video URL</TabsTrigger>
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

                            <TabsContent value="YT2">
                                <div className="space-y-4">
                                    <div className="mb-2">
                                        <p className="text-sm text-zinc-400 mb-2">
                                            Paste a social media video URL from any of these platforms:
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="bg-zinc-800 px-2 py-1 text-xs rounded-md">YouTube</span>
                                            <span className="bg-zinc-800 px-2 py-1 text-xs rounded-md">YouTube Shorts</span>
                                            <span className="bg-zinc-800 px-2 py-1 text-xs rounded-md">Instagram Reels/Posts</span>
                                            <span className="bg-zinc-800 px-2 py-1 text-xs rounded-md">TikTok</span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Input
                                            type="url"
                                            placeholder="Paste social media video URL"
                                            value={socialVideoUrl}
                                            onChange={(e) => setSocialVideoUrl(e.target.value)}
                                            disabled={isValidatingVideo || !!uploadedVideoId}
                                        />
                                        <Button
                                            onClick={handleSocialVideoSubmit}
                                            disabled={!socialVideoUrl || isValidatingVideo || !!uploadedVideoId}
                                        >
                                            {isValidatingVideo ? "Validating..." : "Add"}
                                        </Button>
                                    </div>
                                    {uploadedVideoId && (
                                        <p className="text-sm text-green-500">
                                            Video added successfully
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