import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, Shield, Database, Globe, 
  Cpu, Lock, LineChart, Server,
  Users, MessageSquare, Lightbulb, Target
} from 'lucide-react';
import { profile } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  'Web Development': <Globe className="w-5 h-5" />,
  'Cloud Security': <Shield className="w-5 h-5" />,
  'Google Analytics': <LineChart className="w-5 h-5" />,
  'PostgreSQL': <Database className="w-5 h-5" />,
  'Full-Stack Development': <Code2 className="w-5 h-5" />,
  'Cybersecurity': <Lock className="w-5 h-5" />,
  'React & TypeScript': <Code2 className="w-5 h-5" />,
  'Next.js': <Server className="w-5 h-5" />,
  'Tailwind CSS': <Cpu className="w-5 h-5" />,
  'Supabase': <Database className="w-5 h-5" />,
  'SEO': <Globe className="w-5 h-5" />,
  'Node.js': <Server className="w-5 h-5" />,
  'Communication': <MessageSquare className="w-5 h-5" />,
  'Event Management': <Target className="w-5 h-5" />,
  'Teamwork': <Users className="w-5 h-5" />,
  'Leadership': <Target className="w-5 h-5" />,
  'Creativity': <Lightbulb className="w-5 h-5" />,
  'Problem-Solving': <Cpu className="w-5 h-5" />,
};

interface SkillNodeProps {
  skill: typeof profile.skills.technical[0];
  index: number;
  category: 'technical' | 'soft';
}

const SkillNode = ({ skill, index, category }: SkillNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Implosion animation
      gsap.fromTo(
        nodeRef.current,
        { scale: 3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: index * 0.05,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: nodeRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating animation
      gsap.to(nodeRef.current, {
        y: Math.sin(index * 0.5) * 10,
        duration: 2 + index * 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, nodeRef);

    return () => ctx.revert();
  }, [index]);

  const isTechnical = category === 'technical';

  return (
    <div
      ref={nodeRef}
      className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
        isTechnical
          ? 'bg-neon-cyan/10 border border-neon-cyan/30 hover:bg-neon-cyan/20 hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]'
          : 'bg-neon-blue/10 border border-neon-blue/30 hover:bg-neon-blue/20 hover:border-neon-blue/50 hover:shadow-[0_0_20px_rgba(77,159,255,0.3)]'
      } ${isHovered ? 'scale-110' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={isTechnical ? 'text-neon-cyan' : 'text-neon-blue'}>
        {iconMap[skill.name] || <Code2 className="w-5 h-5" />}
      </span>
      <span className="text-sm font-mono-custom text-white/80 group-hover:text-white transition-colors">
        {skill.name}
      </span>
      
      {/* Pulse effect when hovered */}
      {isHovered && (
        <span className={`absolute inset-0 rounded-full animate-ping ${
          isTechnical ? 'bg-neon-cyan/20' : 'bg-neon-blue/20'
        }`} />
      )}
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Animated connection lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1;

        // Draw connections
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full py-24 md:py-32 bg-void-black overflow-hidden"
    >
      {/* Background canvas for connection lines */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-cyan/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-blue/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section header */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="font-mono-custom text-sm text-neon-cyan uppercase tracking-[0.3em] mb-4">
            Expertise
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            A comprehensive toolkit built through years of hands-on development
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/30">
                <Code2 className="w-6 h-6 text-neon-cyan" />
              </div>
              <div>
                <h3 className="text-xl font-display text-white">Technical Skills</h3>
                <p className="text-sm text-white/50">Core technologies I work with</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {profile.skills.technical.map((skill, index) => (
                <SkillNode
                  key={skill.name}
                  skill={skill}
                  index={index}
                  category="technical"
                />
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center border border-neon-blue/30">
                <Users className="w-6 h-6 text-neon-blue" />
              </div>
              <div>
                <h3 className="text-xl font-display text-white">Soft Skills</h3>
                <p className="text-sm text-white/50">Professional competencies</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {profile.skills.soft.map((skill, index) => (
                <SkillNode
                  key={skill.name}
                  skill={skill}
                  index={index}
                  category="soft"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
