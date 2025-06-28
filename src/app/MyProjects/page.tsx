"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, Clapperboard, Aperture, Scissors, LayoutTemplate, Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { HeroxShortsIcon } from "@/components/ui/custom-icon";
import { VideoStatus } from "@/types/video";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Clip {
    path: string;
    confidence: number;
    viral_title?: string;
    title?: string;
    layout: string;
    description?: string;
    highlights?: string[];
    is_combined?: boolean;
    is_part_of_compilation?: boolean;
    compilation_title?: string;
    content?: string;
    segments?: { content: string; highlights?: string[] }[];
    search_term?: string;
    timestamp?: number;
}

interface Project {
    id: string;
    title: string;
    status: VideoStatus;
    processingProgress?: number;
    clips?: Clip[];
    outputUrl?: string;
    url?: string;
    transcript?: string;
    script?: string;
    displayScript?: string;
    imagePrompts?: string[];
    processingJob?: {
        results: {
            type?: 'LONG_FORM' | 'SHORT_FORM' | 'CLIP_ANY_MOMENT' | 'BROLL' | 'IDEAS_TO_VIDEO';
            metadata?: any;
        };
    };
    error?: string;
}

export default function MyProjectsPage() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        fetchProjects();
        // Poll for updates every 5 seconds
        const interval = setInterval(fetchProjects, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchProjects = async () => {
        try {
            // Demo response with actual videos
            const demoProjects: Project[] = [
                {
                    id: '1',
                    title: 'Ronaldo\'s First Shot Hits the Post!',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'SHORT_FORM'
                        }
                    },
                    clips: [
                        {
                            path: './projects/longtoshort/Ronaldo\'s First Shot Hits the Post!.mp4',
                            confidence: 0.94,
                            viral_title: 'Ronaldo\'s First Shot Hits the Post!',
                            layout: 'fill'
                        }
                    ]
                },
                {
                    id: '2',
                    title: 'Why Ignorance Is Used To Control Populations',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'SHORT_FORM'
                        }
                    },
                    clips: [
                        {
                            path: './projects/longtoshort/Why Ignorance Is Used To Control Populations.mp4',
                            confidence: 0.91,
                            viral_title: 'Why Ignorance Is Used To Control Populations',
                            layout: 'fill'
                        }
                    ]
                },
                {
                    id: '3',
                    title: 'Jamie\'s Frightening Ride On Backwards Roller Coaster',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'SHORT_FORM'
                        }
                    },
                    clips: [
                        {
                            path: './projects/longtoshort/Jamie\'s Frightening Ride On Backwards Roller Coaster.mp4',
                            confidence: 0.89,
                            viral_title: 'Jamie\'s Frightening Ride On Backwards Roller Coaster',
                            layout: 'fill'
                        }
                    ]
                },
                {
                    id: '4',
                    title: 'Dominic Salanki Completes Tottenham\'s Dominance With Crucial Goal',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'SHORT_FORM'
                        }
                    },
                    clips: [
                        {
                            path: './projects/longtoshort/Dominic Salanki Completes Tottenham\'s Dominance With Crucial Goal.mp4',
                            confidence: 0.96,
                            viral_title: 'Dominic Salanki Completes Tottenham\'s Dominance With Crucial Goal',
                            layout: 'fill'
                        }
                    ]
                },
                {
                    id: '5',
                    title: 'El Vijo Scores! Arnazar Team Pushes Hard',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'SHORT_FORM'
                        }
                    },
                    clips: [
                        {
                            path: './projects/longtoshort/El Vijo Scores! Arnazar Team Pushes Hard.mp4',
                            confidence: 0.93,
                            viral_title: 'El Vijo Scores! Arnazar Team Pushes Hard',
                            layout: 'fill'
                        }
                    ]
                },
                {
                    id: '6',
                    title: 'Miraculous Recovery as Wind Changes Direction',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'SHORT_FORM'
                        }
                    },
                    clips: [
                        {
                            path: './projects/longtoshort/Miraculous Recovery as Wind Changes Direction.mp4',
                            confidence: 0.87,
                            viral_title: 'Miraculous Recovery as Wind Changes Direction',
                            layout: 'fill'
                        }
                    ]
                },
                {
                    id: '7',
                    title: 'Harry Wins the Jet!',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'SHORT_FORM'
                        }
                    },
                    clips: [
                        {
                            path: './projects/longtoshort/Harry Wins the Jet!.mp4',
                            confidence: 0.92,
                            viral_title: 'Harry Wins the Jet!',
                            layout: 'fill'
                        }
                    ]
                },
                {
                    id: '8',
                    title: 'Watch the Thrilling Moment They Take Off in Style',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'SHORT_FORM'
                        }
                    },
                    clips: [
                        {
                            path: './projects/longtoshort/Watch the Thrilling Moment They Take Off in Style.mp4',
                            confidence: 0.88,
                            viral_title: 'Watch the Thrilling Moment They Take Off in Style',
                            layout: 'fill'
                        }
                    ]
                },
                {
                    id: '9',
                    title: 'Ronaldo broking hand',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'SHORT_FORM'
                        }
                    },
                    clips: [
                        {
                            path: './projects/longtoshort/Ronaldo broking hand.mp4',
                            confidence: 0.95,
                            viral_title: 'Ronaldo broking hand',
                            layout: 'fill'
                        }
                    ]
                },
                {
                    id: '10',
                    title: 'Bet Big, Win Big The High-Stakes Arena',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'SHORT_FORM'
                        }
                    },
                    clips: [
                        {
                            path: './projects/longtoshort/Bet Big, Win Big The High-Stakes Arena.mp4',
                            confidence: 0.90,
                            viral_title: 'Bet Big, Win Big The High-Stakes Arena',
                            layout: 'fill'
                        }
                    ]
                },
                {
                    id: '11',
                    title: 'The Journey of a Lifetime',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'SHORT_FORM'
                        }
                    },
                    clips: [
                        {
                            path: './projects/longtoshort/The Journey of a Lifetime.mp4',
                            confidence: 0.86,
                            viral_title: 'The Journey of a Lifetime',
                            layout: 'fill'
                        }
                    ]
                },
                {
                    id: '12',
                    title: 'Hypercar Enthusiast Finds Ultimate Luxury',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'LONG_FORM'
                        }
                    },
                    clips: [
                        {
                            path: './projects/longtolong/Hypercar Enthusiast Finds Ultimate Luxury.mp4',
                            confidence: 0.93,
                            title: 'Hypercar Enthusiast Finds Ultimate Luxury',
                            layout: 'fill'
                        }
                    ]
                },
                {
                    id: '13',
                    title: 'The Hypercar Shopping Experience Is Unbelievably Complicated',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'LONG_FORM'
                        }
                    },
                    clips: [
                        {
                            path: './projects/longtolong/The Hypercar Shopping Experience Is Unbelievably Complicated.mp4',
                            confidence: 0.91,
                            title: 'The Hypercar Shopping Experience Is Unbelievably Complicated',
                            layout: 'fill'
                        }
                    ]
                },
                {
                    id: '14',
                    title: 'Haunted Cave Strip Mining Horror',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'LONG_FORM'
                        }
                    },
                    clips: [
                        {
                            path: './projects/longtolong/Haunted Cave Strip Mining Horror.mp4',
                            confidence: 0.89,
                            title: 'Haunted Cave Strip Mining Horror',
                            layout: 'fill'
                        }
                    ]
                },
                {
                    id: '15',
                    title: 'Exciting Moments from the Race!',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'CLIP_ANY_MOMENT'
                        }
                    },
                    clips: [
                        {
                            path: './projects/clipanymoment/exciting moments from the race!_combined.mp4',
                            confidence: 0.96,
                            title: 'Exciting Moments from the Race! - Combined',
                            layout: 'fit',
                            is_combined: true,
                            description: 'Complete compilation of all exciting race moments',
                            content: 'Mac attempts to complete the race before running out of time, struggles with umbrella shape, and flies through easier shapes with strategic time management.',
                            segments: [
                                {
                                    content: 'Mac attempts to complete the race before running out of time, with only 29 minutes remaining',
                                    highlights: ['time pressure', 'race completion', 'strategic planning']
                                },
                                {
                                    content: 'Mac struggles to open the umbrella shape and breaks the set, causing frustration among the participants',
                                    highlights: ['technical difficulty', 'frustration', 'set breaking']
                                },
                                {
                                    content: 'Mac is flying through the easier shapes while mac\'s strategy makes sense, focusing on saving time for difficult challenges',
                                    highlights: ['efficiency', 'strategy', 'time management']
                                }
                            ]
                        },
                        {
                            path: './projects/clipanymoment/exciting moments from the race!_tension builds as mac attempts to complete the race before running out of time, with only 29 minutes.mp4',
                            confidence: 0.92,
                            title: 'Tension Builds as Mac Attempts to Complete the Race',
                            layout: 'fit',
                            is_part_of_compilation: true,
                            compilation_title: 'Exciting Moments from the Race!',
                            description: 'High-stakes race completion attempt with time pressure',
                            content: 'Mac faces the ultimate challenge of completing the race before the 29-minute time limit expires, creating intense tension and excitement.',
                            highlights: ['time pressure', 'race completion', 'tension', 'countdown']
                        },
                        {
                            path: './projects/clipanymoment/exciting moments from the race!_mac struggles to open the umbrella shape and breaks the set, causing frustration among the participa.mp4',
                            confidence: 0.89,
                            title: 'Mac Struggles with Umbrella Shape',
                            layout: 'fit',
                            is_part_of_compilation: true,
                            compilation_title: 'Exciting Moments from the Race!',
                            description: 'Technical difficulty with umbrella shape causing frustration',
                            content: 'Mac encounters a challenging obstacle with the umbrella shape, leading to set damage and visible frustration among all participants.',
                            highlights: ['technical difficulty', 'frustration', 'set damage', 'obstacle']
                        },
                        {
                            path: './projects/clipanymoment/exciting moments from the race!_mac is flying through the easier shapes while mac\'s strategy makes sense, focusing on saving time fo.mp4',
                            confidence: 0.94,
                            title: 'Mac\'s Strategic Approach to Easier Shapes',
                            layout: 'fit',
                            is_part_of_compilation: true,
                            compilation_title: 'Exciting Moments from the Race!',
                            description: 'Efficient strategy execution on easier challenges',
                            content: 'Mac demonstrates excellent strategy by quickly navigating through easier shapes to conserve time for more difficult challenges ahead.',
                            highlights: ['strategy', 'efficiency', 'time management', 'skill']
                        }
                    ]
                },
                {
                    id: '16',
                    title: 'Bet Big, Win Big The High-Stakes Arena',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'BROLL'
                        }
                    },
                    clips: [
                        {
                            path: './projects/broll/Bet Big, Win Big The High-Stakes Arena.mp4',
                            confidence: 0.94,
                            search_term: 'High-Stakes Arena',
                            layout: 'fill'
                        }
                    ]
                },
                {
                    id: '17',
                    title: 'Creating Delicious Coconut Treats That Anyone Can Make At Home',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'IDEAS_TO_VIDEO'
                        }
                    },
                    outputUrl: './projects/ideastovideo/creating delicious coconut treats that anyone can make at home.mp4',
                    script: 'Create delicious coconut treats that anyone can make at home. This easy recipe will show you how to make mouthwatering coconut-based desserts that are perfect for any occasion.'
                },
                {
                    id: '18',
                    title: 'Bet Big, Win Big The High-Stakes Arena',
                    status: VideoStatus.COMPLETED,
                    processingJob: {
                        results: {
                            type: 'IDEAS_TO_VIDEO'
                        }
                    },
                    outputUrl: './projects/ideastovideo/Bet Big, Win Big The High-Stakes Arena.mp4',
                    script: 'Experience the thrill of high-stakes betting in this exciting arena where fortunes are made and lost. Watch as players bet big and win even bigger in this intense gambling environment.'
                }
            ];
            setProjects(demoProjects);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
            setLoading(false);
        }
    };

    const filterProjects = (type: 'LONG_FORM' | 'SHORT_FORM' | 'CLIP_ANY_MOMENT' | 'BROLL' | 'IDEAS_TO_VIDEO') => {
        return projects.filter(project =>
            project.processingJob?.results?.type === type
        );
    };

    const renderVideoPreview = (video: Project) => {
        if (!video.url) return null;
        return (
            <video
                src={video.url}
                controls
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                    console.error('Video loading error:', e);
                    toast({
                        title: "Error",
                        description: "Failed to load video preview",
                        variant: "destructive",
                    });
                }}
            />
        );
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

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-2 mb-8">
                    <h1 className="text-3xl font-bold opacity-75">My Projects</h1>
                    <p className="text-sm text-zinc-500">
                        Note: You can safely close this page - videos will continue processing in the background
                        <br />
                        (every project will be auto deleted after 6 days of creation date)
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zinc-50"></div>
                    </div>
                ) : (
                    <Tabs defaultValue="longtoshort" className="space-y-8">
                        <TabsList className="bg-zinc-900/50 p-1 rounded-lg">
                            <TabsTrigger value="longtoshort" className="data-[state=active]:bg-zinc-800">
                                <Wand2 className="w-4 h-4 mr-2" />
                                LongtoShort
                            </TabsTrigger>
                            <TabsTrigger value="longtolong" className="data-[state=active]:bg-zinc-800">
                                <Aperture className="w-4 h-4 mr-2" />
                                LongtoLong
                            </TabsTrigger>
                            <TabsTrigger value="clipanymoment" className="data-[state=active]:bg-zinc-800">
                                <Clapperboard className="w-4 h-4 mr-2" />
                                ClipAnyMoment
                            </TabsTrigger>
                            <TabsTrigger value="broll" className="data-[state=active]:bg-zinc-800">
                                <LayoutTemplate className="w-4 h-4 mr-2" />
                                B-Roll
                            </TabsTrigger>
                            <TabsTrigger value="ideastovideo" className="data-[state=active]:bg-zinc-800">
                                <Scissors className="w-4 h-4 mr-2" />
                                Ideas To Video
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="longtoshort" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filterProjects('SHORT_FORM').map((project) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => project.status === VideoStatus.COMPLETED && setSelectedProject(project)}
                                        className={project.status === VideoStatus.COMPLETED ? "cursor-pointer" : ""}
                                    >
                                        <Card className="bg-zinc-900/50 border-zinc-800/25 hover:border-zinc-700/25 transition-all duration-300 backdrop-blur-xl">
                                            <CardContent className="p-6">
                                                <h2 className="text-xl font-semibold mb-4 text-white opacity-75">{project.title}</h2>

                                                {project.status === VideoStatus.PROCESSING && (
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-sm opacity-25">
                                                            <span>
                                                                {project.processingProgress === 0
                                                                    ? "Pending - Estimate: 5-30 min to start..."
                                                                    : "Processing"}
                                                            </span>
                                                            <span>{project.processingProgress}%</span>
                                                        </div>
                                                        <div className="w-full bg-zinc-800/25 rounded-full h-2">
                                                            <div
                                                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                                                                style={{ width: `${project.processingProgress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {project.status === VideoStatus.COMPLETED && project.clips && (
                                                    <div className="space-y-4 opacity-75">
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {project.clips.slice(0, 2).map((clip, index) => (
                                                                <div key={index} className="relative group">
                                                                    <video
                                                                        className="w-full h-24 object-cover rounded-lg"
                                                                        src={clip.path}
                                                                        controls
                                                                    />
                                                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 rounded-b-lg">
                                                                        <div className="text-xs font-medium truncate">{clip.viral_title}</div>
                                                                        <div className="text-xs opacity-100">Score: <span className="text-[#FF00FF] font-bold [text-shadow:_0_0_10px_#FF00FF]">{Math.round(clip.confidence * 100)}%</span></div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {project.clips.length > 2 && (
                                                            <div className="text-center text-sm opacity-25">
                                                                +{project.clips.length - 2} more clips
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {project.status === VideoStatus.FAILED && (
                                                    <div className="text-red-400 opacity-75">Processing failed</div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="longtolong" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filterProjects('LONG_FORM').map((project) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => project.status === VideoStatus.COMPLETED && setSelectedProject(project)}
                                        className={project.status === VideoStatus.COMPLETED ? "cursor-pointer" : ""}
                                    >
                                        <Card className="bg-zinc-900/50 border-zinc-800/25 hover:border-zinc-700/25 transition-all duration-300 backdrop-blur-xl">
                                            <CardContent className="p-6">
                                                <h2 className="text-xl font-semibold mb-4 text-white opacity-75">{project.title}</h2>

                                                {project.status === VideoStatus.PROCESSING && (
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-sm opacity-25">
                                                            <span>
                                                                {project.processingProgress === 0
                                                                    ? "Pending - Estimate: 5-30 min to start..."
                                                                    : "Processing"}
                                                            </span>
                                                            <span>{project.processingProgress}%</span>
                                                        </div>
                                                        <div className="w-full bg-zinc-800/25 rounded-full h-2">
                                                            <div
                                                                className="bg-gradient-to-r from-fuchsia-500 to-purple-800 h-2 rounded-full transition-all duration-300"
                                                                style={{ width: `${project.processingProgress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {project.status === VideoStatus.COMPLETED && project.clips && (
                                                    <div className="space-y-4 opacity-75">
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {project.clips.slice(0, 2).map((clip, index) => (
                                                                <div key={index} className="relative group">
                                                                    <video
                                                                        className="w-full aspect-video object-cover rounded-lg"
                                                                        src={clip.path}
                                                                        controls
                                                                    />
                                                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 rounded-b-lg">
                                                                        <div className="text-xs font-medium truncate">{clip.title}</div>
                                                                        <div className="text-xs opacity-100">Score: <span className="text-[#FF00FF] font-bold [text-shadow:_0_0_10px_#FF00FF]">{Math.round(clip.confidence * 100)}%</span></div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {project.clips.length > 2 && (
                                                            <div className="text-center text-sm opacity-25">
                                                                +{project.clips.length - 2} more clips
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {project.status === VideoStatus.FAILED && (
                                                    <div className="text-red-400 opacity-75">Processing failed</div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="clipanymoment" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filterProjects('CLIP_ANY_MOMENT').map((project) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => project.status === VideoStatus.COMPLETED && setSelectedProject(project)}
                                        className={project.status === VideoStatus.COMPLETED ? "cursor-pointer" : ""}
                                    >
                                        <Card className="bg-zinc-900/50 border-zinc-800/25 hover:border-zinc-700/25 transition-all duration-300 backdrop-blur-xl">
                                            <CardContent className="p-6">
                                                <h2 className="text-xl font-semibold mb-4 text-white opacity-75">{project.title}</h2>

                                                {project.status === VideoStatus.PROCESSING && (
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-sm opacity-25">
                                                            <span>
                                                                {project.processingProgress === 0
                                                                    ? "Pending - Estimate: 5-30 min to start..."
                                                                    : "Processing"}
                                                            </span>
                                                            <span>{project.processingProgress}%</span>
                                                        </div>
                                                        <div className="w-full bg-zinc-800/25 rounded-full h-2">
                                                            <div
                                                                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                                                                style={{ width: `${project.processingProgress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {project.status === VideoStatus.COMPLETED && project.clips && (
                                                    <div className="space-y-4 opacity-75">
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {project.clips.slice(0, 2).map((clip, index) => (
                                                                <div key={index} className="relative group">
                                                                    <video
                                                                        className="w-full h-24 object-cover rounded-lg"
                                                                        src={clip.path}
                                                                        controls
                                                                    />
                                                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 rounded-b-lg">
                                                                        <div className="text-xs font-medium truncate">{clip.title}</div>
                                                                        <div className="text-xs opacity-100">Score: <span className="text-[#00FFFF] font-bold [text-shadow:_0_0_10px_#00FFFF]">{Math.round(clip.confidence * 100)}%</span></div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {project.clips.length > 2 && (
                                                            <div className="text-center text-sm opacity-25">
                                                                +{project.clips.length - 2} more clips
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {project.status === VideoStatus.FAILED && (
                                                    <div className="text-red-400 opacity-75">Processing failed</div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="broll" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filterProjects('BROLL').map((project) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => project.status === VideoStatus.COMPLETED && setSelectedProject(project)}
                                        className={project.status === VideoStatus.COMPLETED ? "cursor-pointer" : ""}
                                    >
                                        <Card className="bg-zinc-900/50 border-zinc-800/25 hover:border-zinc-700/25 transition-all duration-300 backdrop-blur-xl">
                                            <CardContent className="p-6">
                                                <h2 className="text-xl font-semibold mb-4 text-white opacity-75">{project.title}</h2>

                                                {project.status === VideoStatus.PROCESSING && (
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-sm opacity-25">
                                                            <span>
                                                                {project.processingProgress === 0
                                                                    ? "Pending - Estimate: 5-30 min to start..."
                                                                    : "Processing"}
                                                            </span>
                                                            <span>{project.processingProgress}%</span>
                                                        </div>
                                                        <div className="w-full bg-zinc-800/25 rounded-full h-2">
                                                            <div
                                                                className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-300"
                                                                style={{ width: `${project.processingProgress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {project.status === VideoStatus.COMPLETED && project.clips && (
                                                    <div className="space-y-4 opacity-75">
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {project.clips.slice(0, 2).map((clip, index) => (
                                                                <div key={index} className="relative group">
                                                                    <video
                                                                        className="w-full h-24 object-cover rounded-lg"
                                                                        src={clip.path}
                                                                        controls
                                                                    />
                                                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 rounded-b-lg">
                                                                        <div className="text-xs font-medium truncate">{clip.search_term}</div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {project.clips.length > 2 && (
                                                            <div className="text-center text-sm opacity-25">
                                                                +{project.clips.length - 2} more clips
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {project.status === VideoStatus.FAILED && (
                                                    <div className="text-red-400 opacity-75">Processing failed</div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="ideastovideo" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filterProjects('IDEAS_TO_VIDEO').map((project) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => project.status === VideoStatus.COMPLETED && setSelectedProject(project)}
                                        className={project.status === VideoStatus.COMPLETED ? "cursor-pointer" : ""}
                                    >
                                        <Card className="bg-zinc-900/50 border-zinc-800/25 hover:border-zinc-700/25 transition-all duration-300 backdrop-blur-xl">
                                            <CardContent className="p-6">
                                                <h2 className="text-xl font-semibold mb-4 text-white opacity-75">{project.title}</h2>

                                                {project.status === VideoStatus.PROCESSING && (
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-sm opacity-25">
                                                            <span>
                                                                {project.processingProgress === 0
                                                                    ? "Pending - Estimate: 5-30 min to start..."
                                                                    : "Processing"}
                                                            </span>
                                                            <span>{project.processingProgress}%</span>
                                                        </div>
                                                        <div className="w-full bg-zinc-800/25 rounded-full h-2">
                                                            <div
                                                                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                                                                style={{ width: `${project.processingProgress}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {project.status === VideoStatus.COMPLETED && (
                                                    <div className="space-y-4 opacity-75">
                                                        <div className="relative group">
                                                            <video
                                                                className="w-full aspect-[9/16] object-cover rounded-lg"
                                                                src={project.outputUrl || project.url || ""}
                                                                controls
                                                            />
                                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 rounded-b-lg">
                                                                <div className="text-xs font-medium truncate">{project.title}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {project.status === VideoStatus.FAILED && (
                                                    <div className="text-red-400 opacity-75">Processing failed</div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                )}
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-zinc-900/50 backdrop-blur-xl rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto border border-zinc-800/25"
                        >
                            <div className="sticky top-0 bg-zinc-900/50 backdrop-blur-xl p-6 border-b border-zinc-800/25 flex justify-between items-center">
                                <h2 className="text-2xl font-bold opacity-75">{selectedProject.title}</h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSelectedProject(null)}
                                    className="opacity-25 hover:opacity-100 transition-all duration-300"
                                >
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>
                            <div className="p-6">
                                {/* Special handling for IdeasToVideo projects */}
                                {selectedProject.processingJob?.results?.type === 'IDEAS_TO_VIDEO' && (selectedProject.outputUrl || selectedProject.url) ? (
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-full max-w-md mx-auto">
                                            <video
                                                className="w-full aspect-[9/16] object-cover rounded-lg"
                                                src={selectedProject.outputUrl || selectedProject.url || ""}
                                                controls
                                            />
                                        </div>
                                        {(selectedProject.displayScript || selectedProject.script) && (
                                            <div className="mt-6 p-4 bg-zinc-800/30 rounded-lg w-full">
                                                <h3 className="text-lg font-medium mb-2">Generated Script</h3>
                                                <p className="text-sm text-zinc-400 whitespace-pre-wrap">{selectedProject.displayScript || selectedProject.script}</p>
                                            </div>
                                        )}
                                    </div>
                                ) : selectedProject.clips && selectedProject.clips.length > 0 ? (
                                    <>
                                        <div className="mb-4 text-sm opacity-25">
                                            Found {selectedProject.clips.length} clips
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {selectedProject.clips.map((clip, index) => (
                                                <div key={index} className="relative">
                                                    <div className="relative">
                                                        {clip.is_combined && (
                                                            <div className="absolute top-2 right-2 z-10">
                                                                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                                                                    Combined
                                                                </span>
                                                            </div>
                                                        )}
                                                        {clip.is_part_of_compilation && !clip.is_combined && (
                                                            <div className="absolute top-2 right-2 z-10">
                                                                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                                                                    Part of
                                                                </span>
                                                            </div>
                                                        )}
                                                        <video
                                                            className={`w-full ${selectedProject.processingJob?.results?.type === 'CLIP_ANY_MOMENT'
                                                                ? `object-${clip.layout} ${clip.layout === 'fill' || clip.layout === 'fit' ? 'aspect-[9/16]' : 'aspect-[16/9]'}`
                                                                : ''} rounded-lg`}
                                                            src={clip.path}
                                                            controls
                                                        />
                                                    </div>
                                                    <div className="mt-2 space-y-2">
                                                        {/* Title */}
                                                        <div className="font-medium opacity-75 text-base">
                                                            {clip.viral_title || clip.title}
                                                        </div>

                                                        {/* Score */}
                                                        {clip.confidence && (
                                                            <div className="mt-1">
                                                                <span className="text-xs text-zinc-500">Score: </span>
                                                                <span className={`text-xs font-bold ${selectedProject.processingJob?.results?.type === 'SHORT_FORM'
                                                                    ? 'text-[#FF00FF] [text-shadow:_0_0_10px_#FF00FF]'
                                                                    : selectedProject.processingJob?.results?.type === 'LONG_FORM'
                                                                        ? 'text-[#FF00FF] [text-shadow:_0_0_10px_#FF00FF]'
                                                                        : 'text-[#00FFFF] [text-shadow:_0_0_10px_#00FFFF]'
                                                                    }`}>
                                                                    {Math.round(clip.confidence * 100)}%
                                                                </span>
                                                            </div>
                                                        )}

                                                        {/* Description */}
                                                        {clip.description && (
                                                            <div className="mt-3 px-1">
                                                                <p className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">
                                                                    <span className="font-mono text-zinc-400 group-hover:text-zinc-200">Description:</span> {clip.description}
                                                                </p>
                                                            </div>
                                                        )}

                                                        {/* Content */}
                                                        {clip.content && (
                                                            <div className="mt-3 px-1">
                                                                <p className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">
                                                                    <span className="font-mono text-zinc-400 group-hover:text-zinc-200">Content:</span> {clip.content}
                                                                </p>
                                                            </div>
                                                        )}

                                                        {/* Highlight Tags */}
                                                        {clip.highlights && clip.highlights.length > 0 && (
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {clip.highlights.map((tag, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 text-xs rounded-full"
                                                                    >
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {/* Segments for combined clips */}
                                                        {clip.is_combined && clip.segments && (
                                                            <div className="mt-3 space-y-2">
                                                                <p className="text-xs font-medium text-zinc-400">Segments:</p>
                                                                {clip.segments.map((segment, idx) => (
                                                                    <div key={idx} className="pl-2 border-l-2 border-zinc-800">
                                                                        <p className="text-xs text-zinc-500">{segment.content}</p>
                                                                        {segment.highlights && segment.highlights.length > 0 && (
                                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                                {segment.highlights.map((tag, tagIdx) => (
                                                                                    <span
                                                                                        key={tagIdx}
                                                                                        className="px-1.5 py-0.5 bg-cyan-500/10 text-cyan-300 text-[10px] rounded-full"
                                                                                    >
                                                                                        {tag}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center text-sm opacity-25">
                                        {selectedProject.processingJob?.results?.type === 'IDEAS_TO_VIDEO' ?
                                            "Video processing may still be in progress" :
                                            "No clips available"}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 