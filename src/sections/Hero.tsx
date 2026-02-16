import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Play, Music, Disc, Calendar, User, Briefcase, Code, Mail, Award } from 'lucide-react';
import { heroConfig, profile } from '../config';

const ICON_MAP = {
  disc: Disc,
  play: Play,
  calendar: Calendar,
  music: Music,
  user: User,
  briefcase: Briefcase,
  code: Code,
  mail: Mail,
  award: Award,
};

const Hero = () => {
  // Null check: if config is empty, do not render
  if (!heroConfig.decodeText && !heroConfig.brandName && heroConfig.navItems.length === 0) {
    return null;
  }

  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const TARGET_TEXT = heroConfig.decodeText;
  const CHARS = heroConfig.decodeChars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  const [displayText, setDisplayText] = useState(' '.repeat(TARGET_TEXT.length));
  const [isDecoding, setIsDecoding] = useState(true);

  // Decode text effect
  useEffect(() => {
    let iteration = 0;
    const maxIterations = TARGET_TEXT.length * 8;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return TARGET_TEXT.split('')
          .map((_, index) => {
            if (index < iteration / 8) {
              return TARGET_TEXT[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(TARGET_TEXT);
        setIsDecoding(false);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav slide in
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );

      // Avatar 3D spin in
      gsap.fromTo(
        avatarRef.current,
        { rotateY: 180, scale: 0.8, opacity: 0 },
        { rotateY: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)', delay: 0.4 }
      );

      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.5 }
      );

      // CTA buttons pop in
      gsap.fromTo(
        ctaRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 1.8 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect for avatar
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!avatarRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      gsap.to(avatarRef.current, {
        rotateY: xPercent * 15,
        rotateX: -yPercent * 10,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden bg-void-black"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-void-black via-[#0a0a1a] to-void-black" />
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon-blue/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Navigation pill */}
      <nav
        ref={navRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 nav-pill rounded-full px-2 py-2"
      >
        <div className="flex items-center gap-1">
          {heroConfig.navItems.map((item) => {
            const IconComponent = ICON_MAP[item.icon];
            return (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-mono-custom uppercase tracking-wider text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 sm:px-8 lg:px-16 py-20 gap-8 lg:gap-16">
        {/* Left side - Text content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/30">
              <Code className="w-5 h-5 text-neon-cyan" />
            </div>
            <span className="font-display text-xl text-white">{heroConfig.brandName}</span>
          </div>

          {/* Greeting */}
          <p className="font-mono-custom text-sm text-neon-cyan uppercase tracking-[0.3em] mb-2">
            Hello, I&apos;m
          </p>

          {/* Main title with decode effect */}
          <h1
            ref={titleRef}
            className="decode-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tighter mb-4"
          >
            <span className={`${isDecoding ? 'text-glow-cyan' : ''} transition-all duration-300`}>
              {displayText}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-mono-custom text-sm md:text-base text-white/60 uppercase tracking-[0.2em] mb-4"
          >
            {heroConfig.subtitle}
          </p>

          {/* Tagline */}
          <p className="text-white/50 text-sm md:text-base max-w-md mb-8 leading-relaxed">
            {profile.personalInfo.tagline}
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollToSection(heroConfig.ctaPrimaryTarget)}
              className="group relative px-8 py-3 bg-white text-void-black font-display text-sm uppercase tracking-wider rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]"
            >
              <span className="relative z-10">{heroConfig.ctaPrimary}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button
              onClick={() => scrollToSection(heroConfig.ctaSecondaryTarget)}
              className="px-8 py-3 border border-white/30 text-white font-display text-sm uppercase tracking-wider rounded-full hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
            >
              {heroConfig.ctaSecondary}
            </button>
          </div>
        </div>

        {/* Right side - Avatar */}
        <div 
          ref={avatarRef}
          className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan/30 to-neon-blue/30 blur-xl animate-pulse" />
          
          {/* Avatar container */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-neon-cyan/30 shadow-[0_0_60px_rgba(0,212,255,0.2)]">
            <img
              src={heroConfig.backgroundImage}
              alt="Wisnu Alfian Nur Ashar"
              className="w-full h-full object-cover object-top"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-void-black/50 via-transparent to-transparent" />
          </div>

          {/* Floating badges */}
          <div className="absolute -top-2 -right-2 px-3 py-1 bg-neon-cyan/20 backdrop-blur-sm rounded-full border border-neon-cyan/30">
            <span className="text-xs font-mono-custom text-neon-cyan">5+ Years</span>
          </div>
          <div className="absolute -bottom-2 -left-2 px-3 py-1 bg-neon-blue/20 backdrop-blur-sm rounded-full border border-neon-blue/30">
            <span className="text-xs font-mono-custom text-neon-blue">50+ Projects</span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />

      {/* Corner accents */}
      <div className="absolute top-24 right-8 text-right hidden lg:block">
        <p className="font-mono-custom text-xs text-white/40 uppercase tracking-wider">{heroConfig.cornerLabel}</p>
        <p className="font-mono-custom text-xs text-neon-soft/60">{heroConfig.cornerDetail}</p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-mono-custom text-white/40 uppercase tracking-wider">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-neon-cyan/50 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;