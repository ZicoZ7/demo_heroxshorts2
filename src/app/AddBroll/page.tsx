"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Upload, Video, ArrowLeft, ImageIcon, Sparkles } from "lucide-react";
import { useDropzone } from "react-dropzone";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { HeroxShortsIcon } from "@/components/ui/custom-icon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/utils";

const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB in bytes

interface VideoStyle {
    id: string;
    name: string;
    description: string;
    aspectRatio: "fill";
}

const videoStyles: VideoStyle[] = [
    {
        id: "fill",
        name: "Full Screen B-Roll",
        description: "B-roll videos will cover the entire frame",
        aspectRatio: "fill"
    }
];

export default function AddBroll() {
    const { toast } = useToast();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedStyle, setSelectedStyle] = useState<string>("fill");
    const [selectedSource, setSelectedSource] = useState<"pexels" | "ai">("pexels");
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();
    const [settings, setSettings] = useState<{ brollCredits: number; maxDuration: number } | null>(null);
    const [uploadedVideoId, setUploadedVideoId] = useState<string | null>(null);
    const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);

    const fetchSettings = async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Return demo data
        return {
            brollCredits: 100,
            maxDuration: 60
        };
    };

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file.size > MAX_FILE_SIZE) {
            toast({
                title: "File too large",
                description: "Please upload a video file smaller than 200MB",
                variant: "destructive",
            });
            return;
        }
        setSelectedFile(file);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'video/*': ['.mp4', '.mov', '.avi']
        },
        maxSize: MAX_FILE_SIZE,
        multiple: false
    });

    const handleUpload = async (file: File) => {
        try {
            // Simulate upload delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Demo response
            const demoResponse = {
                id: Math.random().toString(36).substring(7),
                url: URL.createObjectURL(file)
            };
            setUploadedVideoId(demoResponse.id);
            setUploadedVideoUrl(demoResponse.url);
            toast({
                title: "Upload Complete",
                description: "Your video has been uploaded successfully",
            });
        } catch (error) {
            console.error('Upload error:', error);
            toast({
                title: "Upload Failed",
                description: "Failed to upload video",
                variant: "destructive",
            });
        }
    };

    const handleProcess = async () => {
        try {
            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Demo response
            toast({
                title: "Processing Started",
                description: "Your video is being processed",
            });
            router.push('/MyProjects');
        } catch (error) {
            console.error('Processing error:', error);
            toast({
                title: "Processing Failed",
                description: "Failed to process video",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8 space-x-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push('/Home')}
                >
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <HeroxShortsIcon className="h-8 w-8" />
                <h1 className="text-2xl font-bold">HeroxShorts</h1>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">Add B-Roll to Your Video</h1>
                    <p className="text-muted-foreground">
                        Upload your ShortFormat video and we'll automatically add relevant B-roll from your chosen source
                    </p>
                </div>

                {/* Source Selection */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Choose B-Roll Source</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant={selectedSource === "pexels" ? "default" : "outline"}
                            className="h-14"
                            onClick={() => setSelectedSource("pexels")}
                        >
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-lg">Pexels</span>
                                <span className="text-xs">Stock Videos</span>
                            </div>
                        </Button>
                        <Button
                            variant={selectedSource === "ai" ? "default" : "outline"}
                            className="h-14"
                            onClick={() => setSelectedSource("ai")}
                        >
                            <div className="flex flex-col items-center">
                                <span className="font-bold text-lg">AI Generated</span>
                                <span className="text-xs">AI Images</span>
                            </div>
                        </Button>
                    </div>
                </Card>

                {/* Style Selection */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">B-Roll Style</h2>
                    <div className="p-4 border rounded-md bg-gray-50">
                        <div className="flex items-center">
                            <div className="mr-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium">Full Screen B-Roll</p>
                                <p className="text-sm text-muted-foreground">B-roll videos will cover the entire frame</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Upload Zone */}
                <Card className="p-6">
                    <div
                        {...getRootProps()}
                        className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
              transition-colors duration-200
              ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted'}
              ${selectedFile ? 'border-success bg-success/5' : ''}
            `}
                    >
                        <input {...getInputProps()} />
                        <div className="space-y-4">
                            <div className="flex justify-center">
                                {selectedFile ? (
                                    <Video className="h-12 w-12 text-success" />
                                ) : (
                                    <Upload className="h-12 w-12 text-muted-foreground" />
                                )}
                            </div>
                            {selectedFile ? (
                                <div>
                                    <p className="text-lg font-medium">{selectedFile.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-lg font-medium">
                                        Drop your video here or click to browse
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        MP4, MOV or AVI up to 200MB
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Upload Progress */}
                    <AnimatePresence>
                        {(isUploading || uploadProgress > 0) && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-4 space-y-2"
                            >
                                <Progress value={uploadProgress} />
                                <p className="text-sm text-center text-muted-foreground">
                                    Uploading... {uploadProgress}%
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Button */}
                    <div className="mt-6">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="w-full">
                                        <Button
                                            onClick={() => handleUpload(selectedFile as File)}
                                            disabled={Boolean(
                                                !selectedFile ||
                                                isUploading ||
                                                isProcessing
                                            )}
                                        >
                                            {isUploading ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : null}
                                            {isProcessing ? "Processing..." : isUploading ? "Uploading..." : "Start Processing"}
                                        </Button>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>This is a demo. Backend and database are not implemented, You can see examples in My Projects.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </Card>
            </div>
        </div>
    );
} 