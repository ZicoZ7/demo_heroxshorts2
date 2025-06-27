"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/utils";

interface VoiceGeneratorFormProps {
    onGenerate: (text: string, voice: string, speed: number) => void;
}

interface CreditInfo {
    genvoiceCredits: number;
}

const VOICE_OPTIONS = [
    // American English Voices
    { value: "af_alloy", label: "🇺🇸 Female (Alloy)" },
    { value: "af_aoede", label: "🇺🇸 Female (Aoede)" },
    { value: "af_bella", label: "🇺🇸 Female (Bella)" },
    { value: "af_heart", label: "🇺🇸 Female (Heart)" },
    { value: "af_jessica", label: "🇺🇸 Female (Jessica)" },
    { value: "af_kore", label: "🇺🇸 Female (Kore)" },
    { value: "af_nicole", label: "🇺🇸 Female (Nicole)" },
    { value: "af_nova", label: "🇺🇸 Female (Nova)" },
    { value: "af_river", label: "🇺🇸 Female (River)" },
    { value: "af_sarah", label: "🇺🇸 Female (Sarah)" },
    { value: "af_sky", label: "🇺🇸 Female (Sky)" },
    { value: "am_adam", label: "🇺🇸 Male (Adam)" },
    { value: "am_echo", label: "🇺🇸 Male (Echo)" },
    { value: "am_eric", label: "🇺🇸 Male (Eric)" },
    { value: "am_fenrir", label: "🇺🇸 Male (Fenrir)" },
    { value: "am_liam", label: "🇺🇸 Male (Liam)" },
    { value: "am_michael", label: "🇺🇸 Male (Michael)" },
    { value: "am_onyx", label: "🇺🇸 Male (Onyx)" },
    { value: "am_puck", label: "🇺🇸 Male (Puck)" },
    { value: "am_santa", label: "🇺🇸 Male (Santa)" },

    // British English Voices
    { value: "bf_alice", label: "🇬🇧 Female (Alice)" },
    { value: "bf_emma", label: "🇬🇧 Female (Emma)" },
    { value: "bf_isabella", label: "🇬🇧 Female (Isabella)" },
    { value: "bf_lily", label: "🇬🇧 Female (Lily)" },
    { value: "bm_daniel", label: "🇬🇧 Male (Daniel)" },
    { value: "bm_fable", label: "🇬🇧 Male (Fable)" },
    { value: "bm_george", label: "🇬🇧 Male (George)" },
    { value: "bm_lewis", label: "🇬🇧 Male (Lewis)" },

    // Spanish Voices
    { value: "ef_dora", label: "🇪🇸 Female (Dora)" },
    { value: "em_alex", label: "🇪🇸 Male (Alex)" },
    { value: "em_santa", label: "🇪🇸 Male (Santa)" },

    // French Voice
    { value: "ff_siwis", label: "🇫🇷 Female (Siwis)" },

    // Hindi Voices
    { value: "hf_alpha", label: "🇮🇳 Female (Alpha)" },
    { value: "hf_beta", label: "🇮🇳 Female (Beta)" },
    { value: "hm_omega", label: "🇮🇳 Male (Omega)" },
    { value: "hm_psi", label: "🇮🇳 Male (Psi)" },

    // Italian Voices
    { value: "if_sara", label: "🇮🇹 Female (Sara)" },
    { value: "im_nicola", label: "🇮🇹 Male (Nicola)" },

    // Japanese Voices
    { value: "jf_alpha", label: "🇯🇵 Female (Alpha)" },
    { value: "jf_gongitsune", label: "🇯🇵 Female (Gongitsune)" },
    { value: "jf_nezumi", label: "🇯🇵 Female (Nezumi)" },
    { value: "jf_tebukuro", label: "🇯🇵 Female (Tebukuro)" },
    { value: "jm_kumo", label: "🇯🇵 Male (Kumo)" },

    // Brazilian Portuguese Voices
    { value: "pf_dora", label: "🇧🇷 Female (Dora)" },
    { value: "pm_alex", label: "🇧🇷 Male (Alex)" },
    { value: "pm_santa", label: "🇧🇷 Male (Santa)" },

    // Chinese Voices
    { value: "zf_xiaobei", label: "🇨🇳 Female (Xiaobei)" },
    { value: "zf_xiaoni", label: "🇨🇳 Female (Xiaoni)" },
    { value: "zf_xiaoxiao", label: "🇨🇳 Female (Xiaoxiao)" },
    { value: "zf_xiaoyi", label: "🇨🇳 Female (Xiaoyi)" },
    { value: "zm_yunjian", label: "🇨🇳 Male (Yunjian)" },
    { value: "zm_yunxi", label: "🇨🇳 Male (Yunxi)" },
    { value: "zm_yunxia", label: "🇨🇳 Male (Yunxia)" },
    { value: "zm_yunyang", label: "🇨🇳 Male (Yunyang)" }
];

export function VoiceGeneratorForm({ onGenerate }: VoiceGeneratorFormProps) {
    const [text, setText] = useState("");
    const [voice, setVoice] = useState(VOICE_OPTIONS[0].value);
    const [speed, setSpeed] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [credits, setCredits] = useState<CreditInfo | null>(null);
    const [settings, setSettings] = useState({ genvoiceCredits: 0, maxDuration: 0 });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                // Demo response
                const demoSettings = {
                    genvoiceCredits: 100,
                    maxDuration: 60
                };
                setSettings(demoSettings);
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            }
        };

        fetchSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;

        setIsGenerating(true);
        try {
            await onGenerate(text, voice, speed);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-4xl mx-auto">
            <div className="space-y-2">
                <Label htmlFor="text">Text to Convert</Label>
                <Textarea
                    id="text"
                    placeholder="Enter the text you want to convert to speech..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[128px] resize-y w-full bg-background border"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="voice">Voice Style</Label>
                <Select value={voice} onValueChange={setVoice}>
                    <SelectTrigger className="w-full bg-background">
                        <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                        {VOICE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label>Speed</Label>
                <div className="flex items-center space-x-4 py-2">
                    <Slider
                        value={[speed]}
                        onValueChange={([value]) => setSpeed(value)}
                        min={0.5}
                        max={2}
                        step={0.1}
                        className="flex-1"
                    />
                    <span className="text-sm text-gray-500 w-16 text-right">{speed}x</span>
                </div>
            </div>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="w-full">
                            <Button
                                type="submit"
                                disabled
                                className={cn(
                                    "w-full bg-primary hover:bg-primary/90"
                                )}
                            >
                                Generate Voice
                            </Button>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>This is a demo. Backend and database are not implemented.</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </form>
    );
} 