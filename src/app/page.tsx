import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';

import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      
      {/* Additional sections (Projects, Process, Testimonials, Contact) can be added here */}
      <div className={styles.spacer}></div>
    </main>
  );
}
