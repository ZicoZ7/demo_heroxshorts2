"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

type PlanType = "FREE" | "STARTER" | "PRO" | "ENTERPRISE" | "LIFETIME";

export default function PricingPage() {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState<PlanType>("FREE");
    const [isLoading, setIsLoading] = useState(false);

    const handleUpgrade = async () => {
        setIsLoading(true);
        try {
            // Handle upgrade logic here
            router.push('/settings');
        } catch (error) {
            console.error('Failed to upgrade plan:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Choose Your Plan</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Plan cards */}
            </div>
        </div>
    );
} 