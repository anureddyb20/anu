import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={`${styles.navbar} animate-fade-in`}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoAccent}>AR</span> Anu Reddy B
        </Link>
      </div>

      <ul className={styles.navLinks}>
        <li>
          <Link href="#home" className={`${styles.navLink} ${styles.active}`}>
            Home
          </Link>
        </li>
        <li>
          <Link href="#about" className={styles.navLink}>
            About
          </Link>
        </li>
        <li>
          <Link href="#skills" className={styles.navLink}>
            Skills
          </Link>
        </li>
        <li>
          <Link href="#projects" className={styles.navLink}>
            Projects
          </Link>
        </li>
        <li>
          <Link href="#process" className={styles.navLink}>
            Process
          </Link>
        </li>
        <li>
          <Link href="#testimonials" className={styles.navLink}>
            Testimonials
          </Link>
        </li>
        <li>
          <Link href="#contact" className={styles.navLink}>
            Contact
          </Link>
        </li>
      </ul>

    </nav>
  );
}
