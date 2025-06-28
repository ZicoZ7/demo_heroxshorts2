"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HeroxShortsIcon } from "@/components/ui/custom-icon";
import { ArrowRight, Sparkles, Zap, Clock, Video, Award, Brush, CalendarClock, Aperture, Clapperboard, LayoutTemplate, Crown, PlayCircle, ChevronDown, Wand2, AudioLines, Hexagon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
};

const features = [
    {
        icon: Sparkles,
        title: "AI-Powered Creation",
        description: "Transform long videos into viral shorts with our advanced AI technology",
    },
    {
        icon: Clock,
        title: "Save Time",
        description: "Reduce editing time by 90% with automated video processing",
    },
    {
        icon: Video,
        title: "Multiple Formats",
        description: "Create shorts, long-form content, and engaging stories from a single video",
    },
    {
        icon: Award,
        title: "Quality Results",
        description: "Get professional-grade content that drives engagement and growth",
    },
];

const creators = [
    {
        name: "Linguamarina",
        followers: "3.52M",
        platform: "youtube",
        image: "./creators/linguamarina.jpg"
    },
    {
        name: "TwoSetViolin",
        followers: "4.3M",
        platform: "youtube",
        image: "./creators/twosetviolin.jpg"
    },
    {
        name: "Jon Youshaei",
        followers: "435K",
        platform: "youtube",
        image: "./creators/jonyoushaei.jpg"
    },
    {
        name: "Armchair Historian",
        followers: "2.2M",
        platform: "youtube",
        image: "./creators/armchairhistorian.jpg"
    },
    {
        name: "SaaStr",
        followers: "54.4K",
        platform: "youtube",
        image: "./creators/saastr.jpg"
    },
    {
        name: "Sebastien Jefferies",
        followers: "422K",
        platform: "tiktok",
        image: "./creators/sebastienjefferies.jpg"
    },
    {
        name: "FLAGRANT",
        followers: "1.5M",
        platform: "youtube",
        image: "./creators/flagrant.jpg"
    },
    {
        name: "Mai Pham",
        followers: "3.3M",
        platform: "youtube",
        image: "./creators/MaiPham.jpg"
    },
    {
        name: "ValueTainment",
        followers: "4.8M",
        platform: "youtube",
        image: "./creators/ValueTainment.jpg"
    },
    {
        name: "Brett Malinowski",
        followers: "478K",
        platform: "youtube",
        image: "./creators/BrettMalinowski.jpg"
    },
    {
        name: "Vinh Giang",
        followers: "2.4M",
        platform: "youtube",
        image: "./creators/VinhGiang.jpg"
    },
    {
        name: "Airrack",
        followers: "15.7M",
        platform: "youtube",
        image: "./creators/Airrack.jpg"
    },
    {
        name: "HellFrozen",
        followers: "5.2M",
        platform: "youtube",
        image: "./creators/HellFrozen.jpg"
    },
    {
        name: "yikes",
        followers: "1.2M",
        platform: "youtube",
        image: "./creators/yikes.jpg"
    },
];

const companies = [
    { name: "BMW", logo: "./companies/bmw.svg" },
    { name: "Apple", logo: "./companies/apple.svg" },
    { name: "NVIDIA", logo: "./companies/nvidia.svg" },
    { name: "GitHub", logo: "./companies/github.svg" },
    { name: "VISA", logo: "./companies/visa.svg" },
    { name: "Airbnb", logo: "./companies/airbnb.svg" },
    { name: "Mcdonald", logo: "./companies/mcdonald.svg" },
    { name: "Coca-Cola", logo: "./companies/coca-cola.svg" },
    { name: "Nike", logo: "./companies/nike.svg" },
    { name: "Sony", logo: "./companies/sony.svg" },
    { name: "Amazon", logo: "./companies/amazon.svg" },
];

const stats = [
    { value: "129hr", label: "Time Saved Monthly" },
    { value: "30+", label: "Languages supported" },
    { value: "56B+", label: "Total Views" },
    { value: "92%", label: "Success Rate" },
];

const thumbnailShowcase = [
    {
        image: "./showcase/image-1.jpg",
        color: "from-green-500 to-emerald-500",
        prompt: "Hot air balloon floating above a valley, bold pastel text 'DREAM' at the top, soft focus on background, bright and cheerful tones."
    },
    {
        image: "./showcase/image-2.jpg",
        color: "from-orange-500 to-amber-500",
        prompt: "A lone astronaut on Mars, red rocky terrain, Earth visible in the sky, bold text 'Herox' in white behind, cinematic glow, soft shadows."
    },
    {
        image: "./showcase/image-3.jpg",
        color: "from-blue-500 to-cyan-500",
        prompt: "A futuristic cityscape, neon lights, flying cars, text 'WELCOME TO 2099' in bright blue with a glitch effect, moody cyberpunk vibe."
    },
    {
        image: "./showcase/image-7.jpg",
        color: "from-green-500 to-emerald-500",
        prompt: "Dense jungle, tattered clothes, wide eyes of fear, wild animals lurking in shadows, bold white text 'SURVIVING THE WILDERNESS' in lower third, cinematic depth, high detail."
    },
    {
        image: "./showcase/image-4.jpg",

        color: "from-purple-500 to-pink-500",
        prompt: "Desert with a single tree, bold black text 'SURVIVOR' in bottom corner, high contrast, cracked earth texture, orange glow on the horizon."
    },
    {
        image: "./showcase/image-5.jpg",
        color: "from-red-500 to-rose-500",
        prompt: "City skyline at sunrise, bold white text 'RISE ABOVE' centered, soft pink and orange tones, slight fog, glowing edges around text."
    },
    {
        image: "./showcase/image-6.jpg",
        color: "from-green-500 to-emerald-500",
        prompt: "Lone hiker on a snowy mountain, bold yellow text 'FEARLESS' at the top, snowstorm effect, dramatic lighting on hiker."
    },
];

const showcaseVideos = {
    shorts: { video: "./showcase/shorts-showcase.mp4", color: "from-purple-500 to-blue-500" },
    long: { video: "./showcase/long-showcase.mp4", color: "from-green-500 to-emerald-500" },
    broll: { video: "./showcase/broll-showcase.mp4", color: "from-orange-500 to-amber-500" }
};

const musicShowcase = [
    {
        prompt: "Epic orchestral buildup with dramatic drums",
        category: "Cinematic",
        audio: "./showcase/music/cinematic.mp3",
        color: "from-red-500 to-orange-500"
    },
    {
        prompt: "Upbeat electronic pop with energetic synths",
        category: "Upbeat",
        audio: "./showcase/music/upbeat.mp3",
        color: "from-blue-500 to-purple-500"
    },
    {
        prompt: "Emotional piano with ambient pads",
        category: "Emotional",
        audio: "./showcase/music/emotional.mp3",
        color: "from-indigo-500 to-blue-500"
    },
    {
        prompt: "Lo-fi beats with jazzy piano",
        category: "Chill",
        audio: "./showcase/music/lofi.mp3",
        color: "from-green-500 to-teal-500"
    },
    {
        prompt: "Corporate motivational with light percussion",
        category: "Corporate",
        audio: "./showcase/music/corporate.mp3",
        color: "from-yellow-500 to-orange-500"
    },
    {
        prompt: "Dark atmospheric tension builder",
        category: "Suspense",
        audio: "./showcase/music/suspense.mp3",
        color: "from-purple-500 to-pink-500"
    }
];

const tutorialShowcase = [
    {
        title: "Getting Started with HeroxShorts",
        youtubeUrl: "https://www.youtube.com/watch?v=getting-started",
        thumbnail: "https://img.youtube.com/vi/getting-started/maxresdefault.jpg",
        color: "from-blue-500 to-purple-500"
    },
    {
        title: "Create Viral Shorts in Minutes",
        youtubeUrl: "https://www.youtube.com/watch?v=viral-shorts",
        thumbnail: "https://img.youtube.com/vi/viral-shorts/maxresdefault.jpg",
        color: "from-green-500 to-emerald-500"
    },
    {
        title: "Advanced B-Roll Techniques",
        youtubeUrl: "https://www.youtube.com/watch?v=broll-guide",
        thumbnail: "https://img.youtube.com/vi/broll-guide/maxresdefault.jpg",
        color: "from-orange-500 to-amber-500"
    },
    {
        title: "Mastering Video Repurposing",
        youtubeUrl: "https://www.youtube.com/watch?v=broll-guide",
        thumbnail: "https://img.youtube.com/vi/broll-guide/maxresdefault.jpg",
        color: "from-red-500 to-pink-500"
    }
];

export function LandingPage() {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const [playingAudio, setPlayingAudio] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [selectedTutorial, setSelectedTutorial] = useState<typeof tutorialShowcase[0] | null>(null);
    const [showSolutions, setShowSolutions] = useState(false);

    const handlePlayAudio = (audioPath: string) => {
        if (playingAudio === audioPath) {
            audioRef.current?.pause();
            setPlayingAudio(null);
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = audioPath;
                audioRef.current.play();
                setPlayingAudio(audioPath);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#000000] text-zinc-50">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-zinc-800/25">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <HeroxShortsIcon className="w-8 h-8 text-white" />
                            <span className="text-xl font-bold">HeroxShorts</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <div className="relative group">
                                <button
                                    className="flex items-center space-x-1 text-zinc-400 hover:text-white transition-colors py-2"
                                    onClick={() => setShowSolutions(!showSolutions)}
                                >
                                    <span>Solutions</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                <div className="absolute top-full right-0 mt-1 w-[600px] bg-black/90 backdrop-blur-xl border border-zinc-800/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <div className="p-6 grid grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">BY INDUSTRY</h3>
                                            <div className="space-y-2">
                                                <button className="block w-full text-left text-zinc-400 hover:text-white text-sm">Media & Entertainment</button>
                                                <button className="block w-full text-left text-zinc-400 hover:text-white text-sm">Advertising Agencies</button>
                                                <button className="block w-full text-left text-zinc-400 hover:text-white text-sm">Podcasters</button>
                                                <button className="block w-full text-left text-zinc-400 hover:text-white text-sm">Creators</button>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">BY USE CASE</h3>
                                            <div className="space-y-2">
                                                <button className="block w-full text-left text-zinc-400 hover:text-white text-sm">AI Storyboard Generator</button>
                                                <button className="block w-full text-left text-zinc-400 hover:text-white text-sm">AI Image to Video</button>
                                                <button className="block w-full text-left text-zinc-400 hover:text-white text-sm">AI Text to Video</button>
                                                <button className="block w-full text-left text-zinc-400 hover:text-white text-sm">Script to Video</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="text-zinc-400 hover:text-white transition-colors"
                                onClick={() => router.push("/pricing")}
                            >
                                Pricing
                            </button>
                            <button
                                className="text-zinc-400 hover:text-white transition-colors"
                                onClick={() => router.push("/contact")}
                            >
                                Contact
                            </button>
                            <Button
                                variant="ghost"
                                onClick={() => router.push("/Home")}
                                className="text-zinc-400 hover:text-white"
                            >
                                Sign In
                            </Button>
                            <Button
                                onClick={() => router.push("/Home")}
                                className="bg-white text-black hover:bg-zinc-200"
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-16 relative">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center max-w-4xl mx-auto space-y-8"
                        initial="initial"
                        animate="animate"
                        variants={fadeIn}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
                            Transform Your Content with AI
                        </h1>
                        <div className="bg-amber-500 border border-amber-400 rounded-lg p-4 max-w-2xl mx-auto">
                            <p className="text-black text-sm font-medium">
                                ⚠️ Demo Showcase: This is a frontend demonstration with backend disconnected.
                                You can explore the examples and videos in the project pages.
                            </p>
                        </div>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                            Create viral shorts, engaging stories, and optimized long-form content in minutes, not hours.
                        </p>
                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                onClick={() => router.push("/Home")}
                                className="bg-white text-black hover:bg-zinc-200 px-8 py-6 text-lg rounded-full"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <span>Start Creating</span>
                                <ArrowRight className={`ml-2 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Feature Tabs */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <Tabs defaultValue="thumbnails" className="space-y-8">
                        <TabsList className="bg-zinc-900/50 p-1 rounded-lg inline-flex space-x-2">
                            <TabsTrigger value="thumbnails" className="data-[state=active]:bg-zinc-800">
                                <Hexagon className="w-4 h-4 mr-2" />
                                Viral Thumbnails & Images
                            </TabsTrigger>
                            <TabsTrigger value="shorts" className="data-[state=active]:bg-zinc-800">
                                <Wand2 className="w-4 h-4 mr-2" />
                                ShortFormat
                            </TabsTrigger>
                            <TabsTrigger value="long" className="data-[state=active]:bg-zinc-800">
                                <Aperture className="w-4 h-4 mr-2" />
                                LongFormat
                            </TabsTrigger>
                            <TabsTrigger value="broll" className="data-[state=active]:bg-zinc-800">
                                <LayoutTemplate className="w-4 h-4 mr-2" />
                                B-Roll
                            </TabsTrigger>
                            <TabsTrigger value="clipanymoment" className="data-[state=active]:bg-zinc-800">
                                <Clapperboard className="w-4 h-4 mr-2" />
                                Clip Any Moment
                            </TabsTrigger>
                            <TabsTrigger value="GenVoice" className="data-[state=active]:bg-zinc-800">
                                <AudioLines className="w-4 h-4 mr-2" />
                                GenVoice
                            </TabsTrigger>
                            <TabsTrigger value="Schedule" className="data-[state=active]:bg-zinc-800">
                                <CalendarClock className="w-4 h-4 mr-2" />
                                Schedule
                            </TabsTrigger>
                            <TabsTrigger value="ideas" className="data-[state=active]:bg-zinc-800">
                                <Crown className="w-4 h-4 mr-2" />
                                Turn Ideas To Video
                            </TabsTrigger>
                            <TabsTrigger value="smarteditor" className="data-[state=active]:bg-zinc-800">
                                <Brush className="w-4 h-4 mr-2" />
                                Smart Editor
                            </TabsTrigger>
                        </TabsList>

                        {/* Thumbnails Content */}
                        <TabsContent value="thumbnails" className="relative overflow-hidden py-8">
                            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>

                            <motion.div
                                className="flex space-x-6"
                                animate={{ x: [-1920, 0] }}
                                transition={{ x: { duration: 40, repeat: Infinity, ease: "linear" } }}
                            >
                                {[...thumbnailShowcase, ...thumbnailShowcase].map((thumb, index) => (
                                    <div key={index} className="relative flex-shrink-0 w-[300px] group">
                                        <div className="relative h-[169px] rounded-lg overflow-hidden">
                                            <img src={thumb.image} alt="Thumbnail" className="w-full h-full object-cover" />
                                            <div className={`absolute inset-0 bg-gradient-to-br ${thumb.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                                        </div>
                                        <div className="mt-3 px-1">
                                            <p className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300">
                                                <span className="font-mono text-zinc-400 group-hover:text-zinc-200">Prompt:</span> {thumb.prompt}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </TabsContent>

                        {/* ShortFormat Content */}
                        <TabsContent value="shorts" className="relative py-8">
                            <div className="max-w-6xl mx-auto rounded-lg overflow-hidden">
                                <div className="relative group">
                                    <video
                                        src={showcaseVideos.shorts.video}
                                        className="w-full rounded-lg"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${showcaseVideos.shorts.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg`}></div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* LongFormat Content */}
                        <TabsContent value="long" className="relative py-8">
                            <div className="max-w-6xl mx-auto rounded-lg overflow-hidden">
                                <div className="relative group">
                                    <video
                                        src={showcaseVideos.long.video}
                                        className="w-full rounded-lg"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${showcaseVideos.long.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg`}></div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* B-Roll Content */}
                        <TabsContent value="broll" className="relative py-8">
                            <div className="max-w-6xl mx-auto rounded-lg overflow-hidden">
                                <div className="relative group">
                                    <video
                                        src={showcaseVideos.broll.video}
                                        className="w-full rounded-lg"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${showcaseVideos.broll.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg`}></div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Music Content */}
                        <TabsContent value="GenMusic" className="relative py-8">
                            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {musicShowcase.map((music, index) => (
                                    <div
                                        key={index}
                                        className="relative rounded-lg overflow-hidden group cursor-pointer"
                                        onClick={() => handlePlayAudio(music.audio)}
                                    >
                                        <div className="p-6 bg-zinc-900/80 h-full">
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-white">
                                                        {music.category}
                                                    </span>
                                                    <PlayCircle
                                                        className={`w-8 h-8 ${playingAudio === music.audio ? 'text-white' : 'text-zinc-400'} group-hover:text-white transition-colors`}
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                                        {music.prompt}
                                                    </p>
                                                </div>
                                                <div className="h-12 bg-zinc-800/50 rounded-md overflow-hidden">
                                                    <div className="h-full w-full flex items-center justify-center">
                                                        <div className="flex items-center space-x-1">
                                                            {[...Array(8)].map((_, i) => (
                                                                <div
                                                                    key={i}
                                                                    className={`w-1 bg-gradient-to-t ${music.color} rounded-full transform transition-all duration-300`}
                                                                    style={{
                                                                        height: `${Math.random() * 24 + 8}px`,
                                                                        opacity: playingAudio === music.audio ? 1 : 0.5,
                                                                        animationName: playingAudio === music.audio ? 'bounce' : 'none',
                                                                        animationDuration: '0.5s',
                                                                        animationTimingFunction: 'ease',
                                                                        animationIterationCount: 'infinite',
                                                                        animationDelay: `${i * 0.1}s`
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${music.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                                    </div>
                                ))}
                            </div>

                            {/* Hidden audio element for playback */}
                            <audio ref={audioRef} className="hidden" />
                        </TabsContent>

                        {/* Ideas Content */}
                        <TabsContent value="ideas" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Add your ideas content */}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800/25 hover:border-zinc-700/25 transition-all duration-300"
                            >
                                <feature.icon className="w-10 h-10 text-white mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-zinc-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Remove the separate Creators Section and update Companies Section */}
            <section className="py-16 overflow-hidden">
                <div className="container mx-auto px-4 text-center mb-12">
                    <h2 className="text-2xl font-bold text-zinc-400">Used by 10M+ creators and businesses</h2>
                </div>
                <div className="relative">
                    {/* Add a gradient overlay on the sides */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>

                    {/* Creators row moving left */}
                    <div className="flex space-x-12 mb-8">
                        <motion.div
                            className="flex space-x-12"
                            animate={{
                                x: [0, -1920],
                            }}
                            transition={{
                                x: {
                                    duration: 30,
                                    repeat: Infinity,
                                    ease: "linear",
                                },
                            }}
                        >
                            {[...creators, ...creators].map((creator, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-4 bg-zinc-900/30 rounded-full px-6 py-3 opacity-50 hover:opacity-100 transition-all duration-300"
                                >
                                    <div className="w-8 h-8 rounded-full overflow-hidden">
                                        <img
                                            src={creator.image}
                                            alt={creator.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-white">{creator.name}</p>
                                        <p className="text-xs text-zinc-400">{creator.followers}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Companies row moving right */}
                    <div className="flex space-x-12">
                        <motion.div
                            className="flex space-x-12"
                            animate={{
                                x: [-1920, 0],
                            }}
                            transition={{
                                x: {
                                    duration: 30,
                                    repeat: Infinity,
                                    ease: "linear",
                                },
                            }}
                        >
                            {[...companies, ...companies].map((company, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-center w-32 h-12 opacity-50 hover:opacity-100 transition-opacity duration-300"
                                >
                                    <img
                                        src={company.logo}
                                        alt={company.name}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-zinc-900/50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                                <div className="text-zinc-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Master HeroxShorts Section */}
            <section className="py-16 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Master HeroxShorts</h2>
                        <p className="text-zinc-400 text-lg">Watch our comprehensive guides and tutorials to become a pro</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {tutorialShowcase.map((tutorial, index) => (
                            <div
                                key={index}
                                className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer"
                                onClick={() => setSelectedTutorial(tutorial)}
                            >
                                <img
                                    src={tutorial.thumbnail}
                                    alt={tutorial.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300">
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <h3 className="text-sm font-medium text-white line-clamp-2">
                                            {tutorial.title}
                                        </h3>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <PlayCircle className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                                <div className={`absolute inset-0 bg-gradient-to-br ${tutorial.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            {selectedTutorial && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-5xl">
                        <button
                            onClick={() => setSelectedTutorial(null)}
                            className="absolute -top-12 right-0 text-white hover:text-zinc-300"
                        >
                            Close
                        </button>
                        <div className="relative aspect-video">
                            <iframe
                                src={`${selectedTutorial.youtubeUrl.replace('watch?v=', 'embed/')}?autoplay=1`}
                                className="absolute inset-0 w-full h-full rounded-lg"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="max-w-3xl mx-auto text-center space-y-8"
                        initial="initial"
                        animate="animate"
                        variants={fadeIn}
                    >
                        <h2 className="text-4xl font-bold">Ready to Transform Your Content?</h2>
                        <p className="text-xl text-zinc-400">
                            Join thousands of creators who are already saving time and growing their audience with HeroxShorts.
                        </p>
                        <Button
                            onClick={() => router.push("/Home")}
                            className="bg-white text-black hover:bg-zinc-200 px-8 py-6 text-lg"
                        >
                            Get Started Now
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-zinc-800/25">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <HeroxShortsIcon className="w-6 h-6 text-white opacity-50" />
                            <span className="text-zinc-400">© 2024 HeroxShorts. All rights reserved.</span>
                        </div>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                                Terms
                            </a>
                            <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                                Privacy
                            </a>
                            <a href="/contact" className="text-zinc-400 hover:text-white transition-colors">
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
} 