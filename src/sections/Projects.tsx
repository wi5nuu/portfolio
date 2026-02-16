import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { profile } from '../config';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  project: typeof profile.projects[0];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  // 3D tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });

    // Parallax effect on image
    gsap.to(imageRef.current, {
      x: (x - centerX) / 15,
      y: (y - centerY) / 15,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });

    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    });

    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="group relative"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-neon-cyan/50 transition-all duration-500">
        {/* Image container */}
        <div className="relative aspect-video overflow-hidden">
          <img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-void-black via-void-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          {/* Holographic sheen effect */}
          <div 
            className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: 'translateX(-100%)',
              animation: isHovered ? 'sheen 0.8s ease-out forwards' : 'none',
            }}
          />

          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-mono-custom uppercase tracking-wider rounded-full bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-sm">
              {project.status}
            </span>
          </div>

          {/* Hover actions */}
          <div className={`absolute top-4 right-4 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-neon-cyan hover:text-void-black transition-all duration-300"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl md:text-2xl font-display text-white group-hover:text-neon-cyan transition-colors">
              {project.title}
            </h3>
            <ArrowRight className={`w-5 h-5 text-white/50 transition-all duration-300 ${isHovered ? 'text-neon-cyan translate-x-1' : ''}`} />
          </div>

          <p className="text-sm text-neon-blue mb-3 font-mono-custom">{project.role}</p>
          
          <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-mono-custom bg-white/5 text-white/70 rounded border border-white/10 hover:border-neon-cyan/30 hover:text-neon-cyan transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 text-xs font-mono-custom bg-white/5 text-white/50 rounded border border-white/10">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Glow border effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 blur-xl" />
        </div>
      </div>

      <style>{`
        @keyframes sheen {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
      `}</style>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const marqueeTexts = [
    "FULL-STACK DEVELOPMENT",
    "REACT • NEXT.JS • TYPESCRIPT",
    "MODERN WEB SOLUTIONS",
    "SECURE • SCALABLE • FAST",
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full py-24 md:py-32 bg-void-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-neon-cyan/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-[100px]" />
      </div>

      {/* Marquee */}
      <div ref={marqueeRef} className="relative overflow-hidden py-8 mb-12 border-y border-white/10">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeTexts, ...marqueeTexts, ...marqueeTexts].map((text, index) => (
            <span
              key={index}
              className="mx-8 text-4xl md:text-6xl font-display text-white/10 uppercase tracking-wider"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section header */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="font-mono-custom text-sm text-neon-cyan uppercase tracking-[0.3em] mb-4">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            A selection of production-grade applications built with modern technologies
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {profile.projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href={profile.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 text-white font-display text-sm uppercase tracking-wider rounded-full border border-white/20 hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300 group"
          >
            <Github className="w-5 h-5" />
            <span>View More on GitHub</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
