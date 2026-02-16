import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { profile } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

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

      // Path draw animation
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        });
      }

      // Experience cards animation
      const cards = timelineRef.current?.querySelectorAll('.experience-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            x: index % 2 === 0 ? -50 : 50, 
            opacity: 0 
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full py-24 md:py-32 bg-void-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section header */}
        <div ref={headingRef} className="text-center mb-20">
          <p className="font-mono-custom text-sm text-neon-cyan uppercase tracking-[0.3em] mb-4">
            Career Journey
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">
            Work Experience
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            A track record of delivering high-impact solutions across diverse industries
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* SVG Path */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-4 hidden lg:block"
            viewBox="0 0 4 100"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M2 0 L2 100"
              stroke="url(#gradient)"
              strokeWidth="0.5"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00D4FF" />
                <stop offset="100%" stopColor="#4D9FFF" />
              </linearGradient>
            </defs>
          </svg>

          {/* Experience cards */}
          <div className="space-y-12 lg:space-y-0">
            {profile.experience.map((exp, index) => (
              <div
                key={index}
                className={`experience-card relative lg:grid lg:grid-cols-2 lg:gap-8 ${
                  index % 2 === 0 ? '' : 'lg:direction-rtl'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-8 z-10">
                  <div className="w-4 h-4 rounded-full bg-neon-cyan shadow-[0_0_20px_rgba(0,212,255,0.5)]" />
                </div>

                {/* Card */}
                <div
                  className={`${
                    index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:col-start-2 lg:pl-16'
                  }`}
                >
                  <div className="group relative p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-neon-cyan/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,212,255,0.15)]">
                    {/* Status badge */}
                    <div className={`flex items-center gap-2 mb-4 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      <span className={`px-3 py-1 text-xs font-mono-custom uppercase tracking-wider rounded-full ${
                        exp.duration.includes('Present')
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-white/10 text-white/60 border border-white/20'
                      }`}>
                        {exp.duration.includes('Present') ? 'Current' : 'Past'}
                      </span>
                      <span className="px-3 py-1 text-xs font-mono-custom uppercase tracking-wider rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
                        {exp.type}
                      </span>
                    </div>

                    {/* Role & Company */}
                    <h3 className="text-xl md:text-2xl font-display text-white mb-2 group-hover:text-neon-cyan transition-colors">
                      {exp.role}
                    </h3>
                    <div className={`flex items-center gap-2 mb-4 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      <Briefcase className="w-4 h-4 text-neon-blue" />
                      <span className="text-neon-blue font-medium">{exp.company}</span>
                    </div>

                    {/* Meta info */}
                    <div className={`flex flex-wrap items-center gap-4 mb-4 text-sm text-white/50 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/60 leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Skills */}
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs font-mono-custom bg-white/5 text-white/70 rounded-full border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-cyan/10 to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                {index % 2 === 0 ? <div className="hidden lg:block" /> : null}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href={profile.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-white font-display text-sm uppercase tracking-wider rounded-full border border-white/20 hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300"
          >
            <span>View Full Resume</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
