import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const EnhancedHeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [textIndex, setTextIndex] = useState(0);

    const rotatingTexts = [
        "Where Innovation Meets Excellence",
        "Building Tomorrow's Technology Today",
        "Empowering Digital Transformation",
        "Creating Future Tech Leaders",
        "Bridging Ideas and Technology",
        "Innovate, Collaborate, Elevate"
    ];

    useEffect(() => {
        setIsVisible(true);

        // Text rotation effect
        const textInterval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
        }, 3000);

        return () => clearInterval(textInterval);
    }, []);

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-32">
            {/* Static gradient background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-slate-900"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50"></div>
            </div>

            {/* Subtle geometric pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
                <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-1500"></div>

                {/* Subtle grid lines */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            {/* Main content */}
            <div className={`relative z-10 text-center max-w-6xl mx-auto px-6 transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>

                {/* Enhanced CSAU Typography */}
                <div className="mb-16">
                    {/* Main CSAU title with enhanced styling */}
                    <div className="relative mb-8">
                        <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-4 relative">
                            <span className="relative z-10 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                CSAU
                            </span>

                            {/* Subtle glow effect */}
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 bg-clip-text text-transparent blur-xl">
                                CSAU
                            </span>
                        </h1>

                        {/* Decorative elements around CSAU */}
                        <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-blue-400/30 rounded-full animate-pulse"></div>
                        <div className="absolute -top-2 -right-6 w-4 h-4 bg-purple-400/30 rounded-full animate-pulse delay-500"></div>
                        <div className="absolute -bottom-4 left-1/4 w-6 h-6 border border-cyan-400/30 rotate-45 animate-pulse delay-1000"></div>
                        <div className="absolute -bottom-2 right-1/3 w-3 h-3 bg-pink-400/30 rounded-full animate-pulse delay-1500"></div>
                    </div>

                    {/* Full name with enhanced styling */}
                    <div className="relative mb-8">
                        <div className="inline-block px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50">
                            <h2 className="text-lg md:text-xl lg:text-2xl text-slate-300 font-light tracking-[0.2em] uppercase">
                                Computer Society of Anna University
                            </h2>
                        </div>
                    </div>

                    {/* Rotating tagline */}
                    <div className="relative h-16 flex items-center justify-center mb-8">
                        <div className="relative overflow-hidden">
                            <p className="text-2xl md:text-3xl lg:text-4xl font-medium bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent transition-all duration-500">
                                {rotatingTexts[textIndex]}
                            </p>
                        </div>
                        <Sparkles className="ml-4 w-6 h-6 text-yellow-400 animate-pulse" />
                    </div>

                    {/* Mission statement */}
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-light">
                            Fostering innovation, building community, and shaping the future of technology
                            through collaboration, learning, and excellence in computer science.
                        </p>
                    </div>
                </div>

                {/* Enhanced statistics or highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
                    <div className="relative group">
                        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                500+
                            </div>
                            <div className="text-slate-300 font-medium">Active Followers</div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
                            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                                50+
                            </div>
                            <div className="text-slate-300 font-medium">Events Conducted</div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300">
                            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                                100+
                            </div>
                            <div className="text-slate-300 font-medium">Years of Excellence</div>
                        </div>
                    </div>
                </div>


            </div>

            {/* Bottom gradient for smooth transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
        </section>
    );
};

export default EnhancedHeroSection;