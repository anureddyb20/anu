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

      <div className={styles.actions}>
        <a href="/Anu_Reddy_CV.pdf" className={styles.downloadBtn} download>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download CV
        </a>
        <button className={styles.themeBtn} aria-label="Toggle theme">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
