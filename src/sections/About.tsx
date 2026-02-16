import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, Code, Shield, Zap } from 'lucide-react';
import { profile } from '../config';

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
}

const StatCard = ({ value, label, icon, delay }: StatCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ''));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { rotateX: 90, opacity: 0 },
        {
          rotateX: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [delay]);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <div
      ref={cardRef}
      className="group relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-neon-cyan/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.2)]"
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center text-neon-cyan group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div>
          <div className="text-3xl md:text-4xl font-display text-white">
            {count}{value.includes('+') ? '+' : value.includes('%') ? '%' : ''}
          </div>
          <div className="text-sm text-white/50 font-mono-custom uppercase tracking-wider">{label}</div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 0.8,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image parallax
      gsap.fromTo(
        imageRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image zoom on scroll
      const imgElement = imageRef.current?.querySelector('img');
      if (imgElement) {
        gsap.to(imgElement, {
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '5+', label: 'Years Experience', icon: <Code className="w-6 h-6" /> },
    { value: '50+', label: 'Projects Delivered', icon: <Zap className="w-6 h-6" /> },
    { value: '100%', label: 'Client Satisfaction', icon: <Shield className="w-6 h-6" /> },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-24 md:py-32 bg-void-black overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-cyan/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono-custom text-sm text-neon-cyan uppercase tracking-[0.3em] mb-4">
            About Me
          </p>
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-display text-white"
          >
            Behind the Code
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <img
                src="/about-portrait.jpg"
                alt="Wisnu Alfian"
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-void-black/80 via-void-black/20 to-transparent" />
              
              {/* Floating info card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{profile.personalInfo.location}</p>
                    <p className="text-white/50 text-sm">Based in Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-neon-cyan/30" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-neon-cyan/30" />
          </div>

          {/* Right - Content */}
          <div ref={contentRef}>
            <h3 className="text-2xl md:text-3xl font-display text-white mb-6">
              {profile.personalInfo.role}
            </h3>
            
            <p className="text-white/70 leading-relaxed mb-8 text-lg">
              {profile.personalInfo.summary}
            </p>

            {/* Contact info */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href={`mailto:${profile.personalInfo.email}`}
                className="flex items-center gap-2 text-white/60 hover:text-neon-cyan transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">{profile.personalInfo.email}</span>
              </a>
              <a
                href={`tel:${profile.personalInfo.phone}`}
                className="flex items-center gap-2 text-white/60 hover:text-neon-cyan transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">{profile.personalInfo.phone}</span>
              </a>
            </div>

            {/* Stats grid */}
            <div className="grid sm:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                  delay={0.1 * index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
