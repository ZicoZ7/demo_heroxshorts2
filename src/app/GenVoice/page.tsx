"use client";

import { useState } from "react";
import { VoiceGeneratorForm } from "./components/VoiceGeneratorForm";
import { GeneratedVoice } from "./components/GeneratedVoice";
import { Shell } from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { HeroxShortsIcon } from "@/components/ui/custom-icon";
import { toast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function VoiceGeneratorPage() {
    const [jobId, setJobId] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'processing' | 'completed' | 'error'>('idle');
    const router = useRouter();

    const handleGenerate = async () => {
        try {
            // Simulate generation delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Demo response
            const demoJobId = 'demo-' + Math.random().toString(36).substring(7);
            setJobId(demoJobId);
            setStatus('processing');

            toast({
                title: "Generation started",
                description: "Your voice is being generated",
            });
        } catch (error) {
            console.error('Generation error:', error);
            toast({
                title: "Generation failed",
                description: "Failed to generate voice",
                variant: "destructive",
            });
        }
    };

    return (
        <Shell>
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

                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold">AI Voice Generator</h1>
                    </div>
                    <div className="space-y-8">
                        <VoiceGeneratorForm onGenerate={handleGenerate} />
                        {jobId && (
                            <GeneratedVoice
                                key={jobId}
                                jobId={jobId}
                                onRegenerate={() => setJobId(null)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Shell>
    );
} 