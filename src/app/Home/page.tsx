"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import {
  Settings,
  LogOut,
  Crown,
  Pyramid,
  CalendarClock,
  Brush,
  AudioLines,
  Clapperboard,
  Wand2,
  Aperture,
  FolderOpen,
  LayoutTemplate,
  Hexagon,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { motion } from "framer-motion";
import {
  TooltipProvider,
  Tooltip as RadixTooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { HeroxShortsIcon } from "@/components/ui/custom-icon";

const AnimatedText = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
      }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
        delay: delay / 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const GlowingBorder = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="relative"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <motion.div
      className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg blur opacity-75 group-hover:opacity-100"
      animate={{
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    {children}
  </motion.div>
);

interface MenuItem {
  name: string;
  icon: React.ElementType;
  description?: string;
  action: () => void;
  href?: string;
}

interface FeatureCard {
  icon: React.ElementType;
  title: string;
  description: string;
  action: string;
  color: string;
  onClick?: () => void;
}

const CustomTooltip = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) => {
  return (
    <TooltipProvider>
      <RadixTooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </RadixTooltip>
    </TooltipProvider>
  );
};

export default function HomeContent() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeMenuItem, setActiveMenuItem] = useState("Create");

  const handleProtectedNavigation = (path: string) => {
    router.push(path);
  };

  // Fixed menuItems implementation
  const menuItems: MenuItem[] = [
    {
      name: "Create",
      icon: Pyramid,
      description: "Create New Video",
      action: () => setActiveMenuItem("Create"),
    },
    {
      name: "Projects",
      icon: FolderOpen,
      description: "Your Projects",
      action: () => {
        setActiveMenuItem("Projects");
        handleProtectedNavigation("/MyProjects");
      },
    },
    {
      name: "Thumbnails",
      icon: Hexagon,
      description: "Generate Thumbnails & Images",
      action: () => {
        setActiveMenuItem("Thumbnails");
        handleProtectedNavigation("/ThumbnailGenerator");
      },
    },
    {
      name: "Schedule",
      icon: CalendarClock,
      description: "Schedule Coming Soon",
      action: () => {
        setActiveMenuItem("Schedule");
      },
    },
    {
      name: "GenVoice",
      icon: AudioLines,
      description: "GenVoice for video & Podcasts",
      action: () => {
        setActiveMenuItem("GenVoice");
        handleProtectedNavigation("/GenVoice");
      },
    },
    {
      name: "SmartEditor",
      icon: Brush,
      description: "SmartEditor Coming Soon",
      action: () => {
        setActiveMenuItem("SmartEditor");
      },
    },
  ];

  const featureCards: FeatureCard[] = [
    {
      icon: Crown,
      title: "Turn Ideas To Video",
      description:
        "Transform your ideas into engaging videos with AI. Just describe your vision, and we'll bring it to life.",
      action: "TURN IDEAS TO VIDEO",
      color: "from-orange-500 to-amber-500",
      onClick: () => handleProtectedNavigation("/TurnIdeasToVideo"),
    },
    {
      icon: Wand2,
      title: "AI Long To Shorts",
      description:
        "Generate viral shorts in a few seconds. Level up your content game! upto 12 shorts",
      action: "YOUR VIRAL SHORTS",
      color: "from-purple-500 to-blue-500",
      onClick: () => handleProtectedNavigation("/LongtoShort"),
    },
    {
      icon: Clapperboard,
      title: "Clip Any Moment",
      description:
        "Clip any moment from any video, Just type your prompt and we will clip the right moments.",
      action: "CLIP ANYTHING",
      color: "from-green-500 to-emerald-500",
      onClick: () => handleProtectedNavigation("/ClipAnyMoment"),
    },
    {
      icon: Aperture,
      title: "Long To Long",
      description: "Turn long videos into impactful and engaging videos. 1 video upto 6 videos",
      action: "TRANSFORM IT",
      color: "from-fuchsia-500 to-purple-800",
      onClick: () => handleProtectedNavigation("/LongtoLong"),
    },
    {
      icon: LayoutTemplate,
      title: "Add Style & B-Roll",
      description:
        "Add Style & Ai images to your video to make it more engaging and dynamic.",
      action: "ADD MAGIC",
      color: "from-blue-500 to-cyan-500",
      onClick: () => handleProtectedNavigation("/AddBroll"),
    },
  ];

  // No need for complex reordering since cards are already in correct order
  const orderedFeatureCards = featureCards;

  const stats = [
    { label: "Time Save", value: "129 hr/Month" },
    { label: "Monthly Money Earn", value: "$8K-$12K" },
    { label: "Monthly Views", value: "4M-10M" },
    { label: "Monotize", value: "YES" },
  ];

  const handleLogout = async () => {
    router.push('/');
    router.refresh();
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  return (
    <div className="flex min-h-screen bg-[#000000] dark:bg-[#000000] relative isolate">
      {/* Background with subtle gradient for depth */}
      <motion.div
        className="fixed inset-0 bg-[#000000] bg-opacity-90 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <aside className="fixed left-0 top-0 bottom-0 w-20 bg-[#000000] backdrop-blur-xl flex flex-col items-stretch z-50 border-r border-zinc-800/25 hover:border-zinc-700/25 transition-all duration-300">
        <motion.div
          className="p-4 mb-8 flex justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <HeroxShortsIcon className="w-8 h-8 text-white opacity-25 hover:opacity-100 transition-all duration-300" />
        </motion.div>

        <nav className="flex-1">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <AnimatedText key={item.name} delay={index * 50}>
                <motion.li className="px-2">
                  <CustomTooltip content={item.description || item.name}>
                    <motion.button
                      onClick={() => item.action()}
                      className={cn(
                        "w-full p-2 flex items-center justify-center transition-all duration-300",
                        activeMenuItem === item.name
                          ? "opacity-100"
                          : "opacity-25 hover:opacity-100"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon
                        className="w-5 h-5 text-white transition-all duration-300"
                      />
                    </motion.button>
                  </CustomTooltip>
                </motion.li>
              </AnimatedText>
            ))}
          </ul>
        </nav>

        <div className="p-2 space-y-2">
          <AnimatedText delay={300}>
            <motion.button
              onClick={handleSettings}
              className="w-full p-2 flex items-center justify-center transition-all duration-300 opacity-25 hover:opacity-100"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Settings className="w-5 h-5 text-white transition-all duration-300" />
            </motion.button>
          </AnimatedText>
          <AnimatedText delay={400}>
            <CustomTooltip content="Logout">
              <motion.button
                onClick={handleLogout}
                className="w-full p-2 flex items-center justify-center transition-all duration-300 opacity-25 hover:opacity-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut className="w-5 h-5 text-white transition-all duration-300" />
              </motion.button>
            </CustomTooltip>
          </AnimatedText>
        </div>
      </aside>

      <main className="flex-1 min-h-screen p-8 md:p-12 ml-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-medium text-white opacity-90">
              HeroxShorts
            </h1>
            <p className="text-xl text-yellow-400 opacity-75 max-w-2xl mx-auto">
              ⚠️ Demo Showcase: This is a frontend demonstration with backend disconnected.
              You can explore the examples and videos in the project pages.
            </p>
            <p className="text-xl text-white opacity-75 max-w-2xl mx-auto">
              Create content that matters. Fast, efficient, and powered by AI in 1 click.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className="px-8 py-6 bg-zinc-100 text-zinc-900 rounded-2xl text-lg hover:bg-zinc-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300"
                  onClick={() => router.push("/pricing")}
                >
                  Step Into Premium
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <div className="flex flex-col space-y-16">
            {/* Main Feature Cards Grid */}
            <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
              {/* Main Feature Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                {orderedFeatureCards.slice(1).map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <motion.div
                      className="group h-full"
                      whileHover={{
                        y: -8,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 15
                        }
                      }}
                      whileTap={{
                        scale: 0.98,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 10
                        }
                      }}
                    >
                      <Card
                        className="h-full bg-transparent border-transparent cursor-pointer"
                        onClick={card.onClick}
                      >
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <div className="p-2">
                              {React.createElement(card.icon, {
                                className: "w-6 h-6 text-white opacity-25 group-hover:opacity-100 transition-all duration-300"
                              })}
                            </div>
                            <CardTitle className="text-xl text-white opacity-25 group-hover:opacity-100 transition-all duration-300">
                              {card.title}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white opacity-25 group-hover:opacity-100 transition-all duration-300">
                            {card.description}
                          </p>
                          <div className="mt-6">
                            <Button
                              className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300"
                              onClick={card.onClick}
                            >
                              {card.action}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Coming Soon Feature Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <motion.div
                  className="group h-full"
                  whileHover={{
                    y: -8,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 15
                    }
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }
                  }}
                >
                  <Card
                    className="h-full bg-transparent border-transparent cursor-pointer"
                    onClick={featureCards[0].onClick}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-2">
                          {React.createElement(featureCards[0].icon, {
                            className: "w-6 h-6 text-white opacity-25 group-hover:opacity-100 transition-all duration-300"
                          })}
                        </div>
                        <CardTitle className="text-xl text-white opacity-25 group-hover:opacity-100 transition-all duration-300">
                          {featureCards[0].title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white opacity-25 group-hover:opacity-100 transition-all duration-300">
                        {featureCards[0].description}
                      </p>
                      <div className="mt-6">
                        <Button
                          className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300"
                          onClick={featureCards[0].onClick}
                        >
                          {featureCards[0].action}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <motion.div
                    whileHover={{
                      y: -8,
                      scale: 1.02,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                      }
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }
                    }}
                  >
                    <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer backdrop-blur-sm">
                      <CardContent className="p-6 text-center">
                        <motion.p
                          className="text-2xl font-medium text-zinc-100"
                          initial={{ scale: 0.95 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                            delay: index * 0.1 + 0.2
                          }}
                        >
                          {stat.value}
                        </motion.p>
                        <p className="text-sm text-zinc-400 mt-1">
                          {stat.label}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
