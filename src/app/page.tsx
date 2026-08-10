import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutCard from '@/components/AboutCard';
import ExpertiseCard from '@/components/ExpertiseCard';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <HeroSection />
      
      <section id="about" className={`container ${styles.aboutSection}`}>
        <div className={styles.aboutGrid}>
          <div className="animate-fade-in delay-200">
            <AboutCard />
          </div>
          <div className="animate-fade-in delay-400">
            <ExpertiseCard />
          </div>
        </div>
      </section>
      
      {/* Additional sections (Projects, Process, Testimonials, Contact) can be added here */}
      <div className={styles.spacer}></div>
    </main>
  );
}
