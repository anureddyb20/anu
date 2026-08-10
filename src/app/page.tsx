import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';

import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <HeroSection />
      
      {/* Additional sections (Projects, Process, Testimonials, Contact) can be added here */}
      {/* Additional sections (Projects, Process, Testimonials, Contact) can be added here */}
      <div className={styles.spacer}></div>
    </main>
  );
}
