"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Settings, CreditCard, Clock, Pyramid } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type PlanType = "FREE" | "STARTER" | "PRO" | "ENTERPRISE" | "LIFETIME";

interface UserSettings {
  email: string;
  planType: PlanType;
  videoProcessCredits: number;
  genvoiceCredits: number;
  brollCredits: number;
  aiImageCredits: number;
  aiVideoCredits: number;
  clipCredits: number;
  genmusicCredits: number;
  gendubbingCredits: number;
  lastCreditReset: string;
  lastPlanUpdate: string;
}

const getPlanCredits = (planType: PlanType) => {
  const plans = {
    FREE: {
      videoProcess: 10,
      genvoice: 5,
      broll: 3,
      aiImage: 5,
      aiVideo: 2,
      clip: 5,
      genmusic: 3,
      gendubbing: 2
    },
    STARTER: {
      videoProcess: 50,
      genvoice: 25,
      broll: 15,
      aiImage: 25,
      aiVideo: 10,
      clip: 25,
      genmusic: 15,
      gendubbing: 10
    },
    PRO: {
      videoProcess: 200,
      genvoice: 100,
      broll: 60,
      aiImage: 100,
      aiVideo: 40,
      clip: 100,
      genmusic: 60,
      gendubbing: 40
    },
    ENTERPRISE: {
      videoProcess: 1000,
      genvoice: 500,
      broll: 300,
      aiImage: 500,
      aiVideo: 200,
      clip: 500,
      genmusic: 300,
      gendubbing: 200
    },
    LIFETIME: {
      videoProcess: 999999,
      genvoice: 999999,
      broll: 999999,
      aiImage: 999999,
      aiVideo: 999999,
      clip: 999999,
      genmusic: 999999,
      gendubbing: 999999
    }
  };
  return plans[planType];
};

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<UserSettings>({
    email: '',
    planType: 'FREE',
    videoProcessCredits: 0,
    genvoiceCredits: 0,
    brollCredits: 0,
    aiImageCredits: 0,
    aiVideoCredits: 0,
    clipCredits: 0,
    genmusicCredits: 0,
    gendubbingCredits: 0,
    lastCreditReset: '',
    lastPlanUpdate: ''
  });
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("FREE");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Demo response
        const demoSettings: UserSettings = {
          email: 'demo@example.com',
          planType: 'FREE',
          videoProcessCredits: 10,
          genvoiceCredits: 5,
          brollCredits: 3,
          aiImageCredits: 5,
          aiVideoCredits: 2,
          clipCredits: 5,
          genmusicCredits: 3,
          gendubbingCredits: 2,
          lastCreditReset: new Date().toISOString(),
          lastPlanUpdate: new Date().toISOString()
        };
        setSettings(demoSettings);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const updatePlan = async () => {
    try {
      // Simulate update delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Demo response
      const updatedSettings: UserSettings = {
        ...settings,
        planType: selectedPlan,
        videoProcessCredits: getPlanCredits(selectedPlan).videoProcess,
        genvoiceCredits: getPlanCredits(selectedPlan).genvoice,
        brollCredits: getPlanCredits(selectedPlan).broll,
        aiImageCredits: getPlanCredits(selectedPlan).aiImage,
        aiVideoCredits: getPlanCredits(selectedPlan).aiVideo,
        clipCredits: getPlanCredits(selectedPlan).clip,
        genmusicCredits: getPlanCredits(selectedPlan).genmusic,
        gendubbingCredits: getPlanCredits(selectedPlan).gendubbing,
        lastPlanUpdate: new Date().toISOString()
      };
      setSettings(updatedSettings);

      toast({
        title: "Plan Updated",
        description: `Your plan has been updated to ${selectedPlan}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update plan",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!settings) {
    return <div>Error loading settings</div>;
  }

  const nextResetDate = new Date(
    Math.max(
      new Date(settings.lastCreditReset).getTime(),
      new Date(settings.lastPlanUpdate).getTime()
    )
  );
  nextResetDate.setMonth(nextResetDate.getMonth() + 1);

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Settings className="w-8 h-8" />
        Account Settings
      </h1>

      <div className="grid gap-6">
        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="text-lg">{settings.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Current Plan</label>
                <Badge variant="secondary" className="ml-2">
                  {settings.planType}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium">Change Plan</label>
                <div className="flex items-center gap-2 mt-2">
                  <Select
                    defaultValue={settings.planType}
                    onValueChange={(value: PlanType) => setSelectedPlan(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FREE">Free</SelectItem>
                      <SelectItem value="STARTER">Starter</SelectItem>
                      <SelectItem value="PRO">Pro</SelectItem>
                      <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                      <SelectItem value="LIFETIME">Lifetime</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={updatePlan}
                    disabled={selectedPlan === settings.planType}
                  >
                    Update Plan
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Usage */}
        <Card>
          <CardHeader>
            <CardTitle><div className="flex items-center gap-2 bg-zinc-900/50 hover:bg-zinc-800/50 px-4 py-2 rounded-md border border-zinc-800 hover:border-zinc-700 group transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <div className="relative">
                <Pyramid className="w-6 h-6 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,1)] filter brightness-125 group-hover:text-purple-300 group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,1)] group-hover:brightness-150 transition-all duration-300" />
              </div>
              <span className="text-xs md:text-lg text-white opacity-90 font-medium whitespace-nowrap">
                Credit Usage
              </span>
            </div></CardTitle>
            <p className="text-sm text-muted-foreground">
              only apply if process is completed successfully
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Video Processing */}
              <div>
                <div className={`text-sm font-medium mb-2 ${settings.videoProcessCredits <= 0 ? 'text-red-500' : ''}`}>
                  Video Processing: {Math.max(0, settings.videoProcessCredits)}/{getPlanCredits(settings.planType).videoProcess} credits : 1 minute of video processing = 1 credit
                  <span className="float-right">
                    {Math.max(0, ((settings.videoProcessCredits / getPlanCredits(settings.planType).videoProcess) * 100)).toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={Math.max(0, (settings.videoProcessCredits / getPlanCredits(settings.planType).videoProcess) * 100)}
                  className="h-2"
                />
              </div>

              {/* Genvoice */}
              <div>
                <div className={`text-sm font-medium mb-2 ${settings.genvoiceCredits <= 0 ? 'text-red-500' : ''}`}>
                  Genvoice: {Math.max(0, settings.genvoiceCredits)}/{getPlanCredits(settings.planType).genvoice} credits : 1 minute of audio generation = 1 credit
                  <span className="float-right">
                    {Math.max(0, ((settings.genvoiceCredits / getPlanCredits(settings.planType).genvoice) * 100)).toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={Math.max(0, (settings.genvoiceCredits / getPlanCredits(settings.planType).genvoice) * 100)}
                  className="h-2"
                />
              </div>

              {/* B-roll */}
              <div>
                <div className={`text-sm font-medium mb-2 ${settings.brollCredits <= 0 ? 'text-red-500' : ''}`}>
                  B-roll: {Math.max(0, settings.brollCredits)}/{getPlanCredits(settings.planType).broll} credits : per process = 1 credit
                  <span className="float-right">
                    {Math.max(0, ((settings.brollCredits / getPlanCredits(settings.planType).broll) * 100)).toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={Math.max(0, (settings.brollCredits / getPlanCredits(settings.planType).broll) * 100)}
                  className="h-2"
                />
              </div>

              {/* AI Image */}
              <div>
                <div className={`text-sm font-medium mb-2 ${settings.aiImageCredits <= 0 ? 'text-red-500' : ''}`}>
                  AI Image: {Math.max(0, settings.aiImageCredits)}/{getPlanCredits(settings.planType).aiImage} credits : per Image = 1 credit
                  <span className="float-right">
                    {Math.max(0, ((settings.aiImageCredits / getPlanCredits(settings.planType).aiImage) * 100)).toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={Math.max(0, (settings.aiImageCredits / getPlanCredits(settings.planType).aiImage) * 100)}
                  className="h-2"
                />
              </div>

              {/* AI Video (IdeasToVideo) */}
              <div>
                <div className={`text-sm font-medium mb-2 ${settings.aiVideoCredits <= 0 ? 'text-red-500' : ''}`}>
                  IdeasToVideo: {Math.max(0, settings.aiVideoCredits)}/{getPlanCredits(settings.planType).aiVideo} credits : per video creation = 1 credit
                  <span className="float-right">
                    {Math.max(0, ((settings.aiVideoCredits / getPlanCredits(settings.planType).aiVideo) * 100)).toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={Math.max(0, (settings.aiVideoCredits / getPlanCredits(settings.planType).aiVideo) * 100)}
                  className="h-2"
                />
              </div>

              {/* Clip */}
              <div>
                <div className={`text-sm font-medium mb-2 ${settings.clipCredits <= 0 ? 'text-red-500' : ''}`}>
                  Clip: {Math.max(0, settings.clipCredits)}/{getPlanCredits(settings.planType).clip} credits : 1 minute of Clip processing = 1 credit
                  <span className="float-right">
                    {Math.max(0, ((settings.clipCredits / getPlanCredits(settings.planType).clip) * 100)).toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={Math.max(0, (settings.clipCredits / getPlanCredits(settings.planType).clip) * 100)}
                  className="h-2"
                />
              </div>

              <div className="text-sm text-muted-foreground">
                <Clock className="inline-block w-4 h-4 mr-1" />
                Next credits reset on {nextResetDate.toLocaleDateString()}
                {settings.lastPlanUpdate > settings.lastCreditReset && (
                  <span className="ml-2">(Based on plan update date)</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 