import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, MapPin, Award, ExternalLink, CheckCircle } from 'lucide-react';
import { profile } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

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

      // Education card animation
      gsap.fromTo(
        educationRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: educationRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Certification cards animation
      const certCards = certsRef.current?.querySelectorAll('.cert-card');
      certCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.1 * index,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
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
      id="education"
      className="relative w-full py-24 md:py-32 bg-void-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-blue/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section header */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="font-mono-custom text-sm text-neon-cyan uppercase tracking-[0.3em] mb-4">
            Background
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">
            Education & Certifications
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Continuous learning and professional development
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div ref={educationRef}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/30">
                <GraduationCap className="w-6 h-6 text-neon-cyan" />
              </div>
              <h3 className="text-xl font-display text-white">Education</h3>
            </div>

            <div className="relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-neon-cyan/30 transition-all duration-500">
              {/* Institution */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-display text-neon-cyan">PU</span>
                </div>
                <div>
                  <h4 className="text-xl font-display text-white mb-1">
                    {profile.education.institution}
                  </h4>
                  <p className="text-neon-blue font-medium">{profile.education.degree}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-white/60">
                  <Calendar className="w-4 h-4 text-neon-cyan" />
                  <span className="text-sm">{profile.education.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <MapPin className="w-4 h-4 text-neon-cyan" />
                  <span className="text-sm">{profile.education.location}</span>
                </div>
              </div>

              {/* Focus areas */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-sm text-white/50 mb-3">Focus Areas:</p>
                <p className="text-white/70">{profile.education.focus}</p>
              </div>

              {/* Education history */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-white/50 mb-3">Education Journey:</p>
                <div className="flex flex-wrap gap-2">
                  {profile.educationHistory.slice(-3).map((edu, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-mono-custom bg-white/5 text-white/60 rounded-full border border-white/10"
                    >
                      {edu}
                    </span>
                  ))}
                </div>
              </div>

              {/* Organizations */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-white/50 mb-3">Organizations:</p>
                <div className="flex flex-wrap gap-2">
                  {profile.organization.map((org, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-mono-custom bg-neon-cyan/10 text-neon-cyan rounded-full border border-neon-cyan/30"
                    >
                      {org}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div ref={certsRef}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-neon-blue/10 flex items-center justify-center border border-neon-blue/30">
                <Award className="w-6 h-6 text-neon-blue" />
              </div>
              <h3 className="text-xl font-display text-white">Certifications</h3>
            </div>

            <div className="grid gap-4">
              {profile.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="cert-card group relative flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-neon-cyan/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]"
                >
                  {/* Cert image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Cert info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white group-hover:text-neon-cyan transition-colors truncate">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-neon-blue mb-1">{cert.issuer}</p>
                    <div className="flex items-center gap-3 text-xs text-white/50">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {cert.date}
                      </span>
                      {cert.expiry && (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          Expires {cert.expiry}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Verify link */}
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-neon-cyan/20 hover:text-neon-cyan transition-all duration-300"
                    title="Verify Certificate"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
