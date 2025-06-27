"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils/utils";
import { HeroxShortsIcon } from "@/components/ui/custom-icon";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { fugaz, silkscreen, shrikhand, anton } from '@/lib/fonts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useDropzone } from "react-dropzone";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { gifEffects } from '@/lib/styles/gif-library';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

export default function LongtoShortPage() {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState<'upload'>('upload');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoId, setVideoId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [layoutType, setLayoutType] = useState<"AUTO" | "FILL" | "FIT" | "FRAME" | "GAMIFY">("AUTO");
  const [captionStyle, setCaptionStyle] = useState<"STYLE1" | "STYLE2" | "STYLE3" | "STYLE4">("STYLE1");
  const [captionLanguage, setCaptionLanguage] = useState<"auto" | "en">("auto");
  const [showLayoutSelection, setShowLayoutSelection] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<{ id: string, url: string } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isValidatingYoutube, setIsValidatingYoutube] = useState(false);
  const [uploadedVideoId, setUploadedVideoId] = useState<string | null>(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
  const [selectedGif, setSelectedGif] = useState<string | null>(null);

  const stages = [
    { key: 'upload', icon: Upload, label: 'Upload Video' },
  ];

  const LANGUAGES = {
    "auto": "(Same as video language)",
    "en": "English (translate other languages to English)"
  };

  const handleVideoProcessing = async (videoId: string, layout: string, captionStyle: string) => {
    if (isProcessing) return;
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
      setUploadedVideo({ url: URL.createObjectURL(videoFile), id: demoVideoId });
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
  }, [layoutType, captionStyle, captionLanguage, selectedGif]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const videoFile = acceptedFiles[0];
      setFile(videoFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024 * 1024, // 2GB
    multiple: false,
  });

  const cancelUpload = () => {
    setFile(null);
    setProgress(0);
    setUploading(false);
    setUploadedVideoId(null);
    setUploadedVideoUrl(null);
    setUploadedVideo(null);
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
      setUploadedVideo({ url: youtubeUrl, id: demoVideoId });
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
        <div className="flex justify-center items-center max-w-2xl mx-auto">
          {stages.map((stage, index) => (
            <div key={stage.key} className="flex items-center">
              <div className="flex flex-col items-center opacity-100">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 bg-zinc-800/50 ring-2 ring-zinc-700/25">
                  <stage.icon className="h-6 w-6" />
                </div>
                <span className="text-sm">{stage.label}</span>
              </div>
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
            {/* Layout Selection - Styled like thumbnail generator's aspect ratio selection */}
            <div className="mb-6 space-y-3">
              <h3 className="text-lg font-medium">Layout Type</h3>
              <p className="text-sm text-zinc-400">Choose how your video will be converted to vertical format</p>

              <RadioGroup
                value={layoutType}
                onValueChange={(value) => {
                  console.log('Layout changed to:', value);
                  setLayoutType(value as "AUTO" | "FILL" | "FIT" | "FRAME" | "GAMIFY");
                }}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="AUTO" id="layout-auto" />
                  <Label htmlFor="layout-auto" className="text-sm">Auto (Recommended)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FILL" id="layout-fill" />
                  <Label htmlFor="layout-fill" className="text-sm">Fill</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FIT" id="layout-fit" />
                  <Label htmlFor="layout-fit" className="text-sm">Fit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FRAME" id="layout-frame" />
                  <Label htmlFor="layout-frame" className="text-sm">Frame</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="GAMIFY" id="layout-gamify" />
                  <Label htmlFor="layout-gamify" className="text-sm">Gamify</Label>
                </div>
              </RadioGroup>
            </div>

            {layoutType === "GAMIFY" && (
              <div className="mb-6 space-y-3">
                <h3 className="text-lg font-medium">Select GIF</h3>
                <p className="text-sm text-zinc-400">Choose a GIF to display below your video</p>

                <div className="grid grid-cols-4 gap-4">
                  <div
                    key="random"
                    className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${selectedGif === 'random' ? 'border-primary' : 'border-transparent'
                      }`}
                    onClick={() => setSelectedGif('random')}
                  >
                    <div className="h-full flex items-center justify-center bg-zinc-800">
                      <p className="text-sm text-white text-center">Random</p>
                    </div>
                  </div>
                  {gifEffects.map((gif) => (
                    <div
                      key={gif.id}
                      className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${selectedGif === gif.id.toString() ? 'border-primary' : 'border-transparent'
                        }`}
                      onClick={() => {
                        setSelectedGif(gif.id.toString());
                        console.log('GIF selected:', gif.id);
                      }}
                    >
                      <img
                        src={gif.preview}
                        alt={gif.name}
                        className="w-full h-auto"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                        <p className="text-xs text-white text-center">{gif.name}</p>
                        {gif.isNew && (
                          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">New</span>
                        )}
                        {gif.isPro && (
                          <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">Pro</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Caption Style Selection */}
            <div className="mb-6 space-y-3">
              <h3 className="text-lg font-medium">Caption Style</h3>
              <p className="text-sm text-zinc-400">Choose the style for your video captions</p>

              <RadioGroup
                value={captionStyle}
                onValueChange={(value) => {
                  console.log('Caption style changed to:', value);
                  setCaptionStyle(value as "STYLE1" | "STYLE2" | "STYLE3" | "STYLE4");
                }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 p-3 border border-zinc-800 rounded-lg">
                  <RadioGroupItem value="STYLE1" id="style1" />
                  <Label htmlFor="style1" className={`text-sm ${anton.className}`} style={{ color: '#FFFFFF' }}>White Anton</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border border-zinc-800 rounded-lg">
                  <RadioGroupItem value="STYLE2" id="style2" />
                  <Label htmlFor="style2" className={`text-sm ${fugaz.className}`} style={{ color: '#FFD700' }}>Gold Fugaz</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border border-zinc-800 rounded-lg">
                  <RadioGroupItem value="STYLE3" id="style3" />
                  <Label htmlFor="style3" className={`text-sm ${silkscreen.className}`} style={{ color: '#FF4081' }}>Pink Silkscreen</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border border-zinc-800 rounded-lg">
                  <RadioGroupItem value="STYLE4" id="style4" />
                  <Label htmlFor="style4" className={`text-sm ${shrikhand.className}`} style={{ color: '#00FF00' }}>Neon Shrikhand</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Caption Language Selection */}
            <div className="mb-6 space-y-3">
              <h3 className="text-lg font-medium">Caption Language</h3>
              <p className="text-sm text-zinc-400">Choose the language for your video captions we will automatically translate it to the desired language</p>

              <div className="bg-black border border-zinc-800 rounded-lg p-4 font-mono">
                <div className="flex items-center space-x-2 mb-2 border-b border-zinc-800 pb-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-zinc-400 text-sm">language_select.heroxshorts</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-green-400">
                    <span className="mr-2">$</span>
                    <span>echo "Available languages:"</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pl-4 text-sm">
                    {Object.entries(LANGUAGES).map(([code, name]) => (
                      <div
                        key={code}
                        className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${captionLanguage === code
                          ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                          : 'hover:bg-zinc-800'
                          }`}
                        onClick={() => {
                          console.log('Caption language changed to:', code);
                          setCaptionLanguage(code as "auto" | "en");
                        }}
                      >
                        <span className="text-zinc-400">{code}</span>
                        <span>{name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center text-green-400 pt-2">
                    <span className="mr-2">$</span>
                    <span>Selected:</span>
                    <span className="ml-2 text-white">{LANGUAGES[captionLanguage]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Zone */}
            <div className="w-full">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Upload Your Long Video</h2>
                <p className="text-zinc-400">We'll convert it into a vertical short format</p>
              </div>

              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="upload">Upload Video</TabsTrigger>
                  <TabsTrigger value="youtube">YouTube URL</TabsTrigger>
                </TabsList>

                <TabsContent value="upload">
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
                </TabsContent>

                <TabsContent value="youtube">
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        type="url"
                        placeholder="Paste YouTube video URL"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        disabled={isValidatingYoutube || !!uploadedVideoId}
                        className={uploadedVideoId ? "border-green-500" : ""}
                      />
                      <Button
                        onClick={handleYoutubeSubmit}
                        disabled={!youtubeUrl || isValidatingYoutube || !!uploadedVideoId}
                      >
                        {isValidatingYoutube ? "Validating..." : "Add"}
                      </Button>
                    </div>
                    {uploadedVideoId && (
                      <div className="flex items-center space-x-2 text-green-500">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <p className="text-sm">YouTube video added successfully</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Process Button */}
            {(file || uploadedVideo) && (
              <div className="flex justify-center mt-6">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Button
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
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
