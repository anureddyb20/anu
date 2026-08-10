import Image from 'next/image';
import styles from './HeroSection.module.css';
import FloatingStatCard from '@/components/FloatingStatCard';
import FloatingCodeCard from '@/components/FloatingCodeCard';

export default function HeroSection() {
  return (
    <section className={styles.hero} id="home">

      <div className="container">
        <div className={styles.layout}>

          {/* ── ZONE 1: Left text ── */}
          <div className={styles.textCol}>
            <div className={styles.statusPill}>
              <span className={styles.statusDot}></span>
              Aspiring Developer
            </div>

            <h1 className={styles.heading}>
              I build digital <br />
              <span className={styles.highlight}>experiences</span><br />
              that matter.
            </h1>

            <p className={styles.description}>
              I'm Anu, an engineering student passionate about
              building innovative solutions with code, electronics
              and emerging technologies.
            </p>

            <div className={styles.ctaGroup}>
              <a href="#projects" className={styles.primaryBtn}>
                View My Work
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
              <a href="#contact" className={styles.secondaryBtn}>
                Let's Connect
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
            </div>

            <div className={styles.socialLinks}>
              <a href="https://github.com/anureddyb20" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
              <a href="mailto:anureddyb@example.com" className={styles.socialBtn} aria-label="Email">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </div>

          {/* ── ZONE 2: Center portrait + globe ── */}
          <div className={styles.portraitCol}>
            {/* Glowing sphere */}
            <div className={styles.globe}></div>

            {/* Transparent portrait */}
            <div className={styles.personWrap}>
              {/* Use unoptimized to prevent Next.js adding background wrapper */}
              <Image
                src="/hero.png"
                alt="Anu Reddy B"
                width={576}
                height={1024}
                className={styles.personImg}
                priority
                unoptimized
              />
            </div>

            {/* Code card at bottom */}
            <div className={`${styles.codeCard} animate-float-delayed`}>
              <FloatingCodeCard />
            </div>
          </div>

          {/* ── ZONE 3: Right stat cards ── */}
          <div className={styles.cardsCol}>
            <div className={`animate-float`}>
              <FloatingStatCard icon="briefcase" title="3+" subtitle="Projects Completed" />
            </div>
            <div className={`animate-float-delayed`}>
              <FloatingStatCard icon="layers" title="5+" subtitle="Technologies Learning" />
            </div>
            <div className={`animate-float`}>
              <FloatingStatCard icon="star" title="Passionate" subtitle="Problem Solver Innovator" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
