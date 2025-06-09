import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-location';
import { Menu, X, Sparkles, Code, BookOpen, Users, Home, Calendar } from 'lucide-react';
import JoinUs from '../JoinUs/JoinUs';

const Navbar = () => {
  const [navView, setNavView] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const navRef = useRef(null);
  const timeoutRef = useRef(null);

  const navItems = [
    { to: ".", label: "Home", icon: <Home size={18} /> },
    { to: "events", label: "Events", icon: <Calendar size={18} /> },
    { to: "blogs", label: "Blog", icon: <BookOpen size={18} /> },
    { to: "team", label: "Team", icon: <Users size={18} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      if (navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const isOverNav = (
            e.clientX >= navRect.left &&
            e.clientX <= navRect.right &&
            e.clientY >= navRect.top &&
            e.clientY <= navRect.bottom
        );

        if (!isOverNav) {
          setHoveredItem(null);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleItemHover = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredItem(index);
  };

  const handleItemLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 200);
  };

  const calculateGlowPosition = (index) => {
    if (hoveredItem === index) {
      const item = document.querySelector(`.nav-item-${index}`);
      if (item) {
        const rect = item.getBoundingClientRect();
        return {
          left: `${cursorPosition.x - rect.left - 50}px`,
          top: `${cursorPosition.y - rect.top - 50}px`,
        };
      }
    }
    return {};
  };

  return (
      <nav
          ref={navRef}
          className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
              scrolled
                  ? 'bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'
                  : 'bg-gradient-to-b from-slate-900/95 to-slate-900/80 backdrop-blur-md'
          }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
              <div
                  key={i}
                  className="absolute rounded-full bg-blue-500/10 animate-float"
                  style={{
                    width: `${Math.random() * 6 + 2}px`,
                    height: `${Math.random() * 6 + 2}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 20 + 10}s`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
              />
          ))}
        </div>

        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">

            <div className="flex items-center space-x-3 group perspective-1000">
              <a href="/" className="flex items-center space-x-3 transition-all duration-500 group-hover:[transform:rotateY(10deg)]">
                <div className="relative transition-transform duration-300 group-hover:scale-110">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg overflow-hidden border border-white/10">
                    <img className="w-full h-full" src="/logo.png" alt="CSAU Logo" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                    CSAU
                  </h1>
                  <p className="text-xs text-slate-400 -mt-1 font-mono tracking-wider">
                    Anna University
                  </p>
                </div>
              </a>
            </div>

            <div className="hidden lg:flex items-center space-x-1 relative">
              {navItems.map(({ to, label, icon }, index) => (
                  <Link
                      key={to}
                      to={to}
                      getActiveProps={() => ({
                        className: 'text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-blue-400/50'
                      })}
                      activeOptions={{ exact: to === "." }}
                      className={`relative px-5 py-2.5 rounded-xl text-slate-300 hover:text-white transition-all duration-300 border border-transparent nav-item-${index} ${
                          hoveredItem === index ? 'bg-white/5 border-white/20' : ''
                      }`}
                      onMouseEnter={() => handleItemHover(index)}
                      onMouseLeave={handleItemLeave}
                  >
                <span className="flex items-center space-x-2.5 relative z-10">
                  <span className={`transition-all duration-300 ${hoveredItem === index ? 'text-blue-300 scale-110' : ''}`}>
                    {icon}
                  </span>
                  <span className="font-medium tracking-wide">{label}</span>
                </span>

                    {hoveredItem === index && (
                        <>
                          <div
                              className="absolute w-32 h-32 bg-blue-500/20 rounded-full pointer-events-none filter blur-xl -z-10 transition-opacity duration-300"
                              style={calculateGlowPosition(index)}
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
                        </>
                    )}
                  </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <Link to="JoinUs">
                <button className="relative overflow-hidden px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 group">
                <span className="flex items-center space-x-2.5 relative z-10">
                  <Sparkles className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                  <span>Join Us</span>
                </span>
                  <span className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <span className="absolute -inset-y-full -left-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-full transition-all duration-1000" />
                </span>
                </button>
              </Link>
            </div>

            <button
                onClick={() => setNavView(!navView)}
                className="lg:hidden relative p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 group"
                aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col items-center justify-center space-y-1.5">
                {navView ? (
                    <X className="w-5 h-5 text-white transition-all duration-300 rotate-180 scale-110" />
                ) : (
                    <>
                      <span className="w-5 h-0.5 bg-white transition-all duration-300" />
                      <span className="w-5 h-0.5 bg-white transition-all duration-300" />
                      <span className="w-5 h-0.5 bg-white transition-all duration-300" />
                    </>
                )}
              </div>
            </button>
          </div>

          <div className={`lg:hidden transition-all duration-700 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] overflow-hidden ${
              navView ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}>
            <div className="pt-4 pb-2 space-y-2">
              {navItems.map(({ to, label, icon }, index) => (
                  <Link
                      key={to}
                      to={to}
                      getActiveProps={() => ({
                        className: 'text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-blue-400/50'
                      })}
                      activeOptions={{ exact: to === "." }}
                      className={`flex items-center space-x-4 px-5 py-3 rounded-xl text-slate-300 hover:text-white transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-white/20 mx-2 ${
                          navView ? 'translate-x-0' : '-translate-x-full'
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                      onClick={() => setNavView(false)}
                  >
                <span className={`transition-transform duration-300 ${navView ? 'scale-100' : 'scale-0'}`}>
                  {icon}
                </span>
                    <span className="font-medium">{label}</span>
                  </Link>
              ))}

              <div className="px-2 pt-4 transition-all duration-500" style={{ transitionDelay: `${navItems.length * 50}ms` }}>
                <Link to="JoinUs">
                  <button
                      className="w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 relative overflow-hidden group"
                      onClick={() => setNavView(false)}
                  >
                  <span className="flex items-center justify-center space-x-3 relative z-10">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span>Join CSAU</span>
                  </span>
                    <span className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <span className="absolute -inset-y-full -left-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:left-full transition-all duration-1000" />
                  </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-70" />
            <div
                className="absolute bottom-0 h-px bg-blue-400 transition-all duration-300"
                style={{
                  left: hoveredItem !== null ? `${(hoveredItem + 0.5) * (100 / navItems.length)}%` : '50%',
                  width: hoveredItem !== null ? '10%' : '0%',
                  transform: 'translateX(-50%)',
                  opacity: hoveredItem !== null ? 1 : 0
                }}
            />
          </div>
        </div>
      </nav>
  );
};

export default Navbar;