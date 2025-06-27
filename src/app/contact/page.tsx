"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HeroxShortsIcon } from "@/components/ui/custom-icon";
import { ArrowLeft, Mail, Linkedin, Instagram, MessageCircle, Phone, MapPin } from "lucide-react";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
};

const contactInfo = [
    {
        icon: Mail,
        title: "Email",
        value: "zicozafar@gmail.com",
        link: "mailto:zicozafar@gmail.com",
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: Linkedin,
        title: "LinkedIn",
        value: "Sharif Zafar",
        link: "https://www.linkedin.com/in/sharifzafar/",
        color: "from-blue-600 to-blue-700"
    },
    {
        icon: Instagram,
        title: "Instagram",
        value: "@sharifzafar79",
        link: "https://www.instagram.com/sharifzafar79/",
        color: "from-pink-500 to-purple-500"
    }
];

export default function ContactPage() {
    const router = useRouter();
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
                        <Button
                            variant="ghost"
                            onClick={() => router.push("/")}
                            className="text-zinc-400 hover:text-white"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
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
                            Get In Touch
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                            Ready to transform your content? Let's connect and discuss how HeroxShorts can help you create viral content.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {contactInfo.map((contact, index) => (
                                <motion.div
                                    key={contact.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onMouseEnter={() => setHoveredCard(index)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <a
                                        href={contact.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <motion.div
                                            className="p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800/25 hover:border-zinc-700/25 transition-all duration-300 h-full cursor-pointer group"
                                            whileHover={{ y: -8 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="text-center space-y-4">
                                                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${contact.color} group-hover:scale-110 transition-transform duration-300`}>
                                                    <contact.icon className="w-8 h-8 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-semibold mb-2">{contact.title}</h3>
                                                    <p className="text-zinc-400 group-hover:text-white transition-colors duration-300">
                                                        {contact.value}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                                        </motion.div>
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Info Section */}
            <section className="py-16 bg-zinc-900/50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-3xl font-bold mb-4">Let's Build Something Amazing Together</h2>
                            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                                Whether you're a content creator, business owner, or just curious about AI-powered video creation,
                                I'd love to hear from you. Let's discuss how we can take your content to the next level.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Button
                                onClick={() => router.push("/")}
                                className="bg-white text-black hover:bg-zinc-200 px-8 py-6 text-lg rounded-full"
                            >
                                Back to Home
                            </Button>
                            <Button
                                onClick={() => window.open("mailto:zicozafar@gmail.com", "_blank")}
                                className="bg-zinc-800 text-white hover:bg-zinc-700 px-8 py-6 text-lg rounded-full"
                            >
                                Send Email
                            </Button>
                        </motion.div>
                    </div>
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