"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Layout, ArrowLeft, Type, Youtube } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils/utils";
import { HeroxShortsIcon } from "@/components/ui/custom-icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
};

type VideoSource = 'upload';
type VideoFormat = 'short' | 'long';
type LayoutType = 'fill' | 'fit';

interface CreditInfo {
    clipCredits: number;
}

// Add formatFileSize helper function
const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function ClipAnyMomentPage() {
    const router = useRouter();
    const [currentStage, setCurrentStage] = useState<'source' | 'format' | 'prompt'>('source');
    const [videoSource, setVideoSource] = useState<VideoSource>('upload');
    const [videoFormat, setVideoFormat] = useState<VideoFormat>('short');
    const [layoutType, setLayoutType] = useState<LayoutType>('fill');
    const [prompt, setPrompt] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [videoId, setVideoId] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const stages = [
        { key: 'source', icon: Upload, label: 'Choose Source' },
        { key: 'format', icon: Layout, label: 'Select Format' },
        { key: 'prompt', icon: Type, label: 'Enter Prompt' },
    ];

    const handleFileUpload = async (file: File) => {
        if (!file) return null;

        // Validation checks
        const maxSize = 2 * 1024 * 1024 * 1024; // 2GB
        if (file.size > maxSize) {
            toast({
                title: "File too large",
                description: "Maximum file size is 2GB",
                variant: "destructive",
            });
            return null;
        }

        // Validate file type
        const allowedTypes = ['video/mp4', 'video/webm', 'video/x-matroska'];
        if (!allowedTypes.includes(file.type)) {
            toast({
                title: "Invalid file type",
                description: "Allowed types: MP4, WEBM, MKV",
                variant: "destructive",
            });
            return null;
        }

        setIsProcessing(true);
        setUploadProgress(0);

        try {
            // Simulate upload progress
            const uploadTimer = setInterval(() => {
                setUploadProgress(prev => {
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
            setUploadProgress(100);

            // Demo response
            const demoVideoId = 'demo-' + Math.random().toString(36).substring(7);
            setVideoId(demoVideoId);
            return demoVideoId;
        } catch (error) {
            console.error('Upload error:', error);
            toast({
                title: "Upload failed",
                description: error instanceof Error ? error.message : "Failed to upload video",
                variant: "destructive",
            });
            return null;
        } finally {
            setIsProcessing(false);
            setUploadProgress(0);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            setCurrentStage('format');
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setCurrentStage('format');
        }
    };

    const handleFormatSubmit = () => {
        setCurrentStage('prompt');
    };

    const handlePromptSubmit = async () => {
        if (!prompt.trim()) {
            toast({
                title: "Prompt Required",
                description: "Please enter what you want to clip from the video",
                variant: "destructive",
            });
            return;
        }

        setIsProcessing(true);
        try {
            // Upload the file first if not already uploaded
            let uploadedVideoId = videoId;
            if (selectedFile && !videoId) {
                const newVideoId = await handleFileUpload(selectedFile);
                if (!newVideoId) {
                    throw new Error('Upload failed');
                }
                uploadedVideoId = newVideoId;
                setVideoId(newVideoId);
            }

            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            toast({
                title: "Processing started",
                description: "Your video is being analyzed. You can track the progress in My Projects.",
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

    return (
        <div className="min-h-screen bg-[#000000] dark:bg-[#000000] text-zinc-50">
            {/* Header */}
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push('/Home')}
                        className="opacity-25 hover:opacity-100 transition-all duration-300"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <HeroxShortsIcon className="w-8 h-8 text-white opacity-25 hover:opacity-100 transition-all duration-300" />
                </div>
            </div>

            {/* Progress Steps */}
            <div className="container mx-auto px-4 mb-8">
                <div className="flex justify-between items-center max-w-2xl mx-auto">
                    {stages.map((stage, index) => (
                        <div key={stage.key} className="flex items-center">
                            <div
                                className={cn(
                                    "flex flex-col items-center",
                                    currentStage === stage.key ? "opacity-100" : "opacity-25 hover:opacity-75"
                                )}
                            >
                                <div
                                    className={cn(
                                        "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                                        currentStage === stage.key
                                            ? "bg-zinc-800/50 ring-2 ring-zinc-700/25"
                                            : "bg-zinc-800/25"
                                    )}
                                >
                                    <stage.icon className="h-6 w-6" />
                                </div>
                                <span className="text-sm">{stage.label}</span>
                            </div>
                            {index < stages.length - 1 && (
                                <Separator
                                    className={cn(
                                        "w-24 mx-4",
                                        index < stages.indexOf(stages.find(s => s.key === currentStage)!)
                                            ? "bg-zinc-700/25"
                                            : "bg-zinc-800/25"
                                    )}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <motion.div
                className="container mx-auto px-4"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <Card className="max-w-4xl mx-auto bg-zinc-900/50 border-zinc-800/25 hover:border-zinc-700/25 transition-all duration-300 backdrop-blur-xl">
                    <CardContent className="p-6">
                        {currentStage === 'source' && (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold">Upload Video</h2>
                                    <div
                                        className={`
                                            border-2 border-dashed border-zinc-800 rounded-lg p-8 text-center cursor-pointer
                                            ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:border-zinc-700'}
                                        `}
                                        onDrop={handleDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                        onClick={() => !isProcessing && document.getElementById('file-upload')?.click()}
                                    >
                                        <input
                                            id="file-upload"
                                            type="file"
                                            accept="video/mp4,video/webm,video/x-matroska"
                                            className="hidden"
                                            onChange={handleFileSelect}
                                            disabled={isProcessing}
                                        />
                                        {selectedFile ? (
                                            <div className="space-y-4">
                                                <div className="text-sm space-y-2">
                                                    <p className="font-medium">{selectedFile.name}</p>
                                                    <p className="text-zinc-400">{formatFileSize(selectedFile.size)}</p>
                                                </div>
                                                <AnimatePresence>
                                                    {(isProcessing || uploadProgress > 0) && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            className="mt-4 space-y-2"
                                                        >
                                                            <Progress value={uploadProgress} />
                                                            <p className="text-sm text-center text-zinc-400">
                                                                Uploading... {uploadProgress}%
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="mx-auto h-12 w-12 text-zinc-500 mb-4" />
                                                <p className="text-sm text-zinc-400">
                                                    Drag and drop your video here, or click to select
                                                </p>
                                                <p className="text-xs text-zinc-500 mt-2">
                                                    Supported formats: MP4, WEBM, MKV (max 2GB)
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStage === 'format' && (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold">Select Output Format</h2>
                                    <RadioGroup
                                        defaultValue={videoFormat}
                                        onValueChange={(value) => setVideoFormat(value as VideoFormat)}
                                        className="grid grid-cols-2 gap-4"
                                    >
                                        <div>
                                            <RadioGroupItem
                                                value="short"
                                                id="short"
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor="short"
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 p-4 hover:border-zinc-700 peer-data-[state=checked]:border-zinc-600 [&:has([data-state=checked])]:border-zinc-600"
                                            >
                                                <div className="w-16 h-24 bg-zinc-800 rounded-md mb-2" />
                                                <span>Short Format (9:16)</span>
                                            </Label>
                                        </div>
                                        <div>
                                            <RadioGroupItem
                                                value="long"
                                                id="long"
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor="long"
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 p-4 hover:border-zinc-700 peer-data-[state=checked]:border-zinc-600 [&:has([data-state=checked])]:border-zinc-600"
                                            >
                                                <div className="w-24 h-16 bg-zinc-800 rounded-md mb-2" />
                                                <span>Long Format (16:9)</span>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {videoFormat === 'short' && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Layout Style</h3>
                                        <RadioGroup
                                            defaultValue={layoutType}
                                            onValueChange={(value) => setLayoutType(value as LayoutType)}
                                            className="grid grid-cols-2 gap-4"
                                        >
                                            <div>
                                                <RadioGroupItem
                                                    value="fill"
                                                    id="fill"
                                                    className="peer sr-only"
                                                />
                                                <Label
                                                    htmlFor="fill"
                                                    className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 p-4 hover:border-zinc-700 peer-data-[state=checked]:border-zinc-600 [&:has([data-state=checked])]:border-zinc-600"
                                                >
                                                    <div className="w-16 h-24 bg-zinc-800 rounded-md mb-2 overflow-hidden">
                                                        <div className="w-full h-full bg-zinc-700 scale-150" />
                                                    </div>
                                                    <span>Fill</span>
                                                </Label>
                                            </div>
                                            <div>
                                                <RadioGroupItem
                                                    value="fit"
                                                    id="fit"
                                                    className="peer sr-only"
                                                />
                                                <Label
                                                    htmlFor="fit"
                                                    className="flex flex-col items-center justify-between rounded-md border-2 border-zinc-800 p-4 hover:border-zinc-700 peer-data-[state=checked]:border-zinc-600 [&:has([data-state=checked])]:border-zinc-600"
                                                >
                                                    <div className="w-16 h-24 bg-zinc-800 rounded-md mb-2 p-2">
                                                        <div className="w-full h-full bg-zinc-700 rounded" />
                                                    </div>
                                                    <span>Fit</span>
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setCurrentStage('source')}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        className="flex-1"
                                        onClick={handleFormatSubmit}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </div>
                        )}

                        {currentStage === 'prompt' && (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold">What do you want to clip?</h2>
                                    <Textarea
                                        placeholder="Describe what moments you want to find in the video..."
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        className="h-32 bg-zinc-800/50 border-zinc-700"
                                    />

                                    {/* Example Prompt Chips */}
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setPrompt("Find all Messi goals")}
                                        >
                                            Find all Messi goals
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setPrompt("Give me exciting moments")}
                                        >
                                            Give me exciting moments
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setPrompt("Clip product review sections")}
                                        >
                                            Clip product review sections
                                        </Button>
                                    </div>

                                    <div className="text-sm text-zinc-400">
                                        <p>Detection capabilities:</p>
                                        <ul className="list-disc list-inside space-y-1 mt-2">
                                            <li>Objects & People Detection</li>
                                            <li>Action Recognition</li>
                                            <li>Scene Analysis & Detection</li>
                                            <li>Audio Transcription & Analysis</li>
                                        </ul>
                                        <p className="mt-2 text-zinc-500">
                                            Just describe what you want to find in natural language. The AI will automatically detect objects, actions, text, and visual elements based on your prompt.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setCurrentStage('format')}
                                    >
                                        Back
                                    </Button>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="w-full">
                                                    <Button
                                                        className="w-full"
                                                        onClick={() => { }}
                                                        disabled
                                                    >
                                                        Start Processing
                                                    </Button>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>This is a demo. Backend and database are not implemented, You can see examples in My Projects.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
} 