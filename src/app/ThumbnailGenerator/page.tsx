"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { HeroxShortsIcon } from "@/components/ui/custom-icon";
import { GeneratedThumbnails } from "./components/GeneratedThumbnails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

interface Thumbnail {
    path: string;
    style: string;
    bucket: string;
    aspectRatio?: string;
}

interface PromptCard {
    prompt: string;
}

interface HistoryThumbnail {
    id: string;
    path: string;
    style: string;
    bucket: string;
    aspectRatio: string;
    createdAt: string;
    prompt: string;
}

interface GeneratedThumbnailsProps {
    thumbnails: Thumbnail[];
    aspectRatio: string;
    onDownload: (path: string) => Promise<void>;
    onRegenerate: () => Promise<void>;
    isLoading: boolean;
}

// Function to copy text to clipboard
const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
        title: "Copied!",
        description: `${type} copied to clipboard`
    });
};

export default function ThumbnailGeneratorPage() {
    const router = useRouter();
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGeneratingPrompts, setIsGeneratingPrompts] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState('cinematic');
    const [selectedAspectRatio, setSelectedAspectRatio] = useState('16:9');
    const [prompt, setPrompt] = useState('');
    const [generatedThumbnails, setGeneratedThumbnails] = useState<Thumbnail[]>([]);
    const [promptCards, setPromptCards] = useState<PromptCard[]>([]);
    const [thumbnailHistory, setThumbnailHistory] = useState<HistoryThumbnail[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [jobId, setJobId] = useState<string | null>(null);
    const [numImages, setNumImages] = useState("1");
    const [model, setModel] = useState("flux");
    const [enhance, setEnhance] = useState(true);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);

    const fetchThumbnailHistory = async () => {
        try {
            // Demo response
            const demoHistory: HistoryThumbnail[] = [
                {
                    id: '1',
                    path: '/demo-thumbnail-1.jpg',
                    style: 'Cinematic',
                    bucket: 'thumbnails',
                    aspectRatio: '16:9',
                    createdAt: new Date().toISOString(),
                    prompt: 'A cinematic shot of a mountain landscape at sunset'
                },
                {
                    id: '2',
                    path: '/demo-thumbnail-2.jpg',
                    style: 'Minimalist',
                    bucket: 'thumbnails',
                    aspectRatio: '1:1',
                    createdAt: new Date().toISOString(),
                    prompt: 'A minimalist design with geometric shapes'
                }
            ];
            setThumbnailHistory(demoHistory);
        } catch (error) {
            console.error('Failed to fetch thumbnail history:', error);
        }
    };

    useEffect(() => {
        fetchThumbnailHistory();
    }, []);

    // Function to copy prompt
    const copyPrompt = (prompt: PromptCard) => {
        navigator.clipboard.writeText(prompt.prompt);
        setPrompt(prompt.prompt); // Set the prompt for generation
        toast({
            title: "Copied!",
            description: "Prompt copied to clipboard"
        });
    };

    const checkThumbnailStatus = async (jobId: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Return demo data
        return {
            status: 'completed',
            thumbnails: [
                {
                    path: 'demo1.jpg',
                    style: 'Cinematic',
                    bucket: 'thumbnails',
                    aspectRatio: '16:9'
                },
                {
                    path: 'demo2.jpg',
                    style: 'Vibrant',
                    bucket: 'thumbnails',
                    aspectRatio: '16:9'
                }
            ]
        };
    };

    const fetchThumbnailPrompts = async (jobId: string) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Return demo data
        return {
            prompts: [
                'A cinematic shot of a person in a dramatic pose',
                'A vibrant and colorful scene with dynamic lighting',
                'A minimalist composition with strong contrast',
                'An artistic interpretation with creative framing'
            ]
        };
    };

    // Remove API polling for job status
    useEffect(() => {
        if (!jobId || !isGenerating) return;

        const pollInterval = setInterval(async () => {
            try {
                // Use local demo function instead of API
                const data = await checkThumbnailStatus(jobId);

                if (data.status === 'completed' && data.thumbnails) {
                    setGeneratedThumbnails(data.thumbnails);
                    setIsGenerating(false);
                    setJobId(null);
                    clearInterval(pollInterval);
                    toast({
                        title: "Success",
                        description: "Thumbnails generated successfully!"
                    });
                }
            } catch (error) {
                setIsGenerating(false);
                setJobId(null);
                clearInterval(pollInterval);
                toast({
                    title: "Error",
                    description: error instanceof Error ? error.message : "Failed to check job status",
                    variant: "destructive"
                });
            }
        }, 2000);

        return () => clearInterval(pollInterval);
    }, [jobId, isGenerating]);

    // Remove API polling for prompt generation
    useEffect(() => {
        if (!jobId || !isGeneratingPrompts) return;

        const pollInterval = setInterval(async () => {
            try {
                // Use local demo function instead of API
                const data = await fetchThumbnailPrompts(jobId);

                if (Array.isArray(data.prompts) && data.prompts.length > 0) {
                    const formattedPrompts = data.prompts.map((p: string) => ({ prompt: p }));
                    setPromptCards(formattedPrompts);
                    setIsGeneratingPrompts(false);
                    setJobId(null);
                    clearInterval(pollInterval);
                    toast({
                        title: "Success",
                        description: "Generated creative prompts for your thumbnail!"
                    });
                }
            } catch (error) {
                setIsGeneratingPrompts(false);
                setJobId(null);
                clearInterval(pollInterval);
                toast({
                    title: "Error",
                    description: error instanceof Error ? error.message : "Failed to check prompt job status",
                    variant: "destructive"
                });
            }
        }, 2000);

        return () => clearInterval(pollInterval);
    }, [jobId, isGeneratingPrompts]);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            toast({
                title: "Error",
                description: "Please enter a prompt",
                variant: "destructive"
            });
            return;
        }

        setIsGenerating(true);
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Demo response
            const demoJobId = 'demo-' + Math.random().toString(36).substring(7);
            setJobId(demoJobId);
            toast({
                title: "Success",
                description: "Thumbnail generation started!"
            });
        } catch (error) {
            setIsGenerating(false);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to start generation",
                variant: "destructive"
            });
        }
    };

    const handleDownload = async (path: string) => {
        try {
            // Simulate download delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Demo response - create a blob URL for a demo image
            const response = await fetch('https://picsum.photos/800/600');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `thumbnail-${Date.now()}.jpg`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast({
                title: "Download started",
                description: "Your thumbnail is being downloaded",
            });
        } catch (error) {
            console.error('Download error:', error);
            toast({
                title: "Download failed",
                description: "Failed to download thumbnail",
                variant: "destructive",
            });
        }
    };

    const handleGeneratePrompts = async () => {
        if (!prompt.trim()) {
            toast({
                title: "Error",
                description: "Please enter a prompt",
                variant: "destructive"
            });
            return;
        }

        setIsGeneratingPrompts(true);
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Demo response
            const demoJobId = 'demo-' + Math.random().toString(36).substring(7);
            setJobId(demoJobId);
            toast({
                title: "Success",
                description: "Prompt generation started!"
            });
        } catch (error) {
            setIsGeneratingPrompts(false);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to start prompt generation",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#000000] text-zinc-50">
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

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold opacity-75">Generate Thumbnails & Images</h1>
                </div>

                <div className="max-w-3xl mx-auto">
                    <Tabs defaultValue="prompts" className="space-y-6">
                        <TabsList className="bg-zinc-900/50 p-1 rounded-lg h-10">
                            <TabsTrigger value="prompts" className="data-[state=active]:bg-zinc-800">
                                Generate Prompts
                            </TabsTrigger>
                            <TabsTrigger value="thumbnails" className="data-[state=active]:bg-zinc-800">
                                Generate Thumbnails & Images
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="prompts">
                            <Card className="bg-zinc-900/50 border-zinc-800/25 hover:border-zinc-700/25 transition-all duration-300">
                                <CardContent className="p-4">
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Enter your YouTube video title..."
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700/25 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600 text-base"
                                        />
                                        <Button
                                            onClick={handleGeneratePrompts}
                                            disabled={isGeneratingPrompts || !prompt.trim()}
                                            className="w-full"
                                        >
                                            {isGeneratingPrompts ? "Thinking..." : "Generate Prompts"}
                                        </Button>
                                    </div>

                                    {/* Prompt Cards */}
                                    <div className="grid gap-4 mt-6">
                                        {promptCards.map((prompt, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                            >
                                                <Card className="bg-zinc-800/50 border-zinc-700/25">
                                                    <CardContent className="p-4">
                                                        <div className="flex flex-col gap-3">
                                                            {/* Prompt Section */}
                                                            <div className="relative">
                                                                <pre className="whitespace-pre-wrap text-sm text-zinc-300 bg-zinc rounded-lg">
                                                                    {prompt.prompt}
                                                                </pre>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => copyPrompt(prompt)}
                                                                    className="absolute top-2 right-2"
                                                                >
                                                                    <Copy className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="thumbnails">
                            <Card className="bg-zinc-900/50 border-zinc-800/25 hover:border-zinc-700/25 transition-all duration-300">
                                <CardContent className="p-4">
                                    <div className="space-y-4">
                                        <textarea
                                            placeholder="Enter your prompt or select one from above (max 72 tokens)..."
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700/25 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-600 text-base resize-none"
                                        />

                                        {/* Aspect Ratio and Number of Images Selection */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-sm text-zinc-400">Aspect Ratio</Label>
                                                <RadioGroup
                                                    value={selectedAspectRatio}
                                                    onValueChange={setSelectedAspectRatio}
                                                    className="flex space-x-4"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="16:9" id="ratio-16-9" />
                                                        <Label htmlFor="ratio-16-9" className="text-sm">Landscape (16:9)</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="9:16" id="ratio-9-16" />
                                                        <Label htmlFor="ratio-9-16" className="text-sm">Portrait (9:16)</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="1:1" id="ratio-1-1" />
                                                        <Label htmlFor="ratio-1-1" className="text-sm">Square (1:1)</Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm text-zinc-400">Number of Images</Label>
                                                <Select value={numImages} onValueChange={setNumImages}>
                                                    <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700/25">
                                                        <SelectValue placeholder="Select number of images" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1">1 Image</SelectItem>
                                                        <SelectItem value="2">2 Images</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2 col-span-2">
                                                <Label className="text-sm text-zinc-400">Model</Label>
                                                <Select value={model} onValueChange={setModel}>
                                                    <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700/25">
                                                        <SelectValue placeholder="Select model" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="flux">Flux</SelectItem>
                                                        <SelectItem value="turbo">Turbo</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2 col-span-2">
                                                <Label className="text-sm text-zinc-400">Enhance Prompt</Label>
                                                <div className="flex items-center space-x-2">
                                                    <Switch checked={enhance} onCheckedChange={setEnhance} id="enhance-switch" />
                                                    <Label htmlFor="enhance-switch" className="text-xs text-zinc-400">Use AI to enhance your prompt for more detail</Label>
                                                </div>
                                            </div>
                                        </div>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="w-full">
                                                        <Button
                                                            className="w-full"
                                                            onClick={() => { }}
                                                            disabled
                                                        >
                                                            Generate
                                                        </Button>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>This is a demo. Backend and database are not implemented.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>

                                    {/* Generated Thumbnails */}
                                    {generatedThumbnails.length > 0 ? (
                                        <GeneratedThumbnails
                                            thumbnails={generatedThumbnails}
                                            aspectRatio={selectedAspectRatio}
                                            onDownload={handleDownload}
                                            onRegenerate={handleGenerate}
                                            isLoading={isGenerating}
                                        />
                                    ) : (
                                        <div className="text-center py-12 text-zinc-500">
                                            No Images generated yet
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Add Gallery Section */}
            <div className="container mx-auto px-4 py-8">
                <Separator className="my-8 bg-zinc-800" />

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold opacity-75">Your Generated Images</h2>

                    {isLoadingHistory ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                    ) : thumbnailHistory.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {thumbnailHistory.map((thumbnail) => (
                                <motion.div
                                    key={thumbnail.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="relative group"
                                >
                                    <div className={cn(
                                        "relative w-full",
                                        thumbnail.aspectRatio === '16:9' && "aspect-video",
                                        thumbnail.aspectRatio === '9:16' && "aspect-[9/16]",
                                        thumbnail.aspectRatio === '1:1' && "aspect-square",
                                        "overflow-hidden rounded-lg"
                                    )}>
                                        <Image
                                            src={`https://picsum.photos/800/600?random=${thumbnail.id}`}
                                            alt={`Generated thumbnail`}
                                            fill
                                            unoptimized
                                            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDownload(thumbnail.path)}
                                                className="bg-white/10 hover:bg-white/20"
                                            >
                                                <Download className="h-5 w-5" />
                                            </Button>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => copyToClipboard(thumbnail.prompt, 'Prompt')}
                                                            className="bg-white/10 hover:bg-white/20"
                                                        >
                                                            <Copy className="h-5 w-5" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Copy prompt</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-zinc-400 truncate">{thumbnail.style}</p>
                                        <p className="text-xs text-zinc-500">{new Date(thumbnail.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-zinc-500">
                            No Images generated yet
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}