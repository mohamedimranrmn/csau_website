import { useRouter } from '@tanstack/react-location';
import React, { useState, useEffect } from 'react';
import { Users, Code, Trophy, BookOpen, Zap } from 'lucide-react';
import Footer from '../Footer/Footer';
import HeroSection from './HeroSection';

const Home = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting
            }));
          });
        },
        { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  if (router.pending) {
    return (
        <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
          <div className="relative">
            {/* Multi-layered loading animation */}
            <div className="w-32 h-32 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 w-28 h-28 border-2 border-transparent border-b-cyan-400 border-l-pink-400 rounded-full animate-spin animate-reverse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 text-slate-300 font-medium animate-pulse">
              Loading...
            </div>
          </div>
        </div>
    );
  }

  return (
      <main id="home" className="min-h-screen bg-slate-950 relative overflow-hidden">
        {/* Enhanced animated background with floating orbs */}
        <div className="fixed inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-cyan-900/10"></div>
          {/* Floating orbs with different sizes and speeds */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-cyan-500/3 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-pink-500/4 rounded-full blur-xl animate-pulse delay-1500"></div>
        </div>
        <HeroSection/>

        {/* About Section 1 - Mobile Optimized */}
        <section
            id="about1"
            className={`relative w-full py-12 md:py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 transition-all duration-1000 ${
                isVisible.about1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            {/* Compact mobile title */}
            <div className="text-center mb-8 md:mb-16">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Who we are
              </h1>
              <div className="relative mx-auto w-16 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full animate-pulse opacity-50"></div>
              </div>
            </div>

            {/* Mobile-first responsive container */}
            <div className="relative backdrop-blur-sm bg-slate-800/30 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-slate-700/50 shadow-2xl">
              {/* Subtle background elements - smaller on mobile */}
              <div className="absolute top-2 right-2 md:top-4 md:right-4 w-16 h-16 md:w-32 md:h-32 bg-blue-500/5 rounded-full blur-xl md:blur-2xl"></div>
              <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 w-12 h-12 md:w-24 md:h-24 bg-purple-500/5 rounded-full blur-lg md:blur-xl"></div>

              {/* Mobile-optimized layout */}
              <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 relative z-10">
                {/* Image container - full width on mobile */}
                <div className="relative group w-full lg:w-auto flex-shrink-0">
                  <div className="relative overflow-hidden rounded-xl md:rounded-2xl mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                    <img
                        src="/about1.jpeg"
                        alt="about1"
                        className="w-full h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 object-cover shadow-xl group-hover:scale-105 transition-all duration-500 filter group-hover:brightness-110"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>
                </div>

                {/* Content container - mobile optimized */}
                <div className="flex-1 w-full space-y-4 md:space-y-6">
                  <div className="relative backdrop-blur-sm bg-slate-900/40 rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-600/30">
                    <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-light tracking-wide">
                      Computer Society of Anna University (CSAU) is one of CEG's oldest technical clubs,
                      functioning under Ramanujan Computing Centre. We extend computer science knowledge
                      beyond CS and IT fields, helping students realize their technical interests through
                      peer knowledge sharing.
                      <br /><br />
                      Our team explores new technologies and spreads knowledge across our network.
                      We bring together peers, juniors, and alumni to create an informative community
                      that raises awareness about current technologies and assists in upskilling students.
                      Through industry events and workshops, we connect students with real-world tech experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section 2 - Mobile Optimized */}
        <section
            id="about2"
            className={`relative w-full py-12 md:py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 transition-all duration-1000 delay-200 ${
                isVisible.about2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            {/* Compact mobile title */}
            <div className="text-center mb-8 md:mb-16">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                What we do
              </h1>
              <div className="relative mx-auto w-16 md:w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full animate-pulse opacity-50"></div>
              </div>
            </div>

            {/* Mobile-first responsive container */}
            <div className="relative backdrop-blur-sm bg-slate-800/30 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-slate-700/50 shadow-2xl">
              {/* Subtle background elements */}
              <div className="absolute top-2 left-2 md:top-4 md:left-4 w-14 h-14 md:w-28 md:h-28 bg-purple-500/5 rounded-full blur-lg md:blur-2xl"></div>
              <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-18 h-18 md:w-36 md:h-36 bg-cyan-500/5 rounded-full blur-xl md:blur-2xl"></div>

              {/* Mobile-optimized layout - image first on mobile, reversed on desktop */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-6 md:gap-8 relative z-10">
                {/* Image container */}
                <div className="relative group w-full lg:w-auto flex-shrink-0">
                  <div className="relative overflow-hidden rounded-xl md:rounded-2xl mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                    <img
                        src="/about2.jpeg"
                        alt="about2"
                        className="w-full h-48 sm:h-56 md:h-64 lg:h-80 xl:h-96 object-cover shadow-xl group-hover:scale-105 transition-all duration-500 filter group-hover:saturate-110"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>
                </div>

                {/* Content container */}
                <div className="flex-1 w-full space-y-4 md:space-y-6">
                  <div className="relative backdrop-blur-sm bg-slate-900/40 rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-600/30 transform hover:scale-[1.02] transition-all duration-300">
                    <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-light tracking-wide">
                      The Computer Society of Anna University brings together students from across departments
                      to support each other's growth in various technical domains. We regularly conduct workshops
                      and engage our audience through technical articles, posts, and trivia on social media.
                      <br /><br />
                      CSAU prides itself on conducting industry-ready bootcamps like "Data Hack" for AI,
                      Web Development Bootcamps, and our famous "100 Days of Code" series where competitive
                      coding aspirants collaborated for 100 days, creating a conducive learning environment.
                      <br /><br />
                      We continuously upgrade ourselves with engaging content and events that benefit our
                      community, nurturing a growing network of tech enthusiasts within the college.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
  );
};

export default Home;