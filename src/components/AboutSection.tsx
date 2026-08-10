import Image from 'next/image';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section className={styles.about} id="about">
      <div className="container">
        <div className={styles.layout}>
          {/* ── Left Column: Biography text ── */}
          <div className={styles.textCol}>
            <h2 className={styles.heading}>
              ABOUT <span className={styles.highlight}>ME</span>
            </h2>
            
            <p className={styles.paragraph}>
              I’m Anu Reddy, an Electronics and Communication Engineering student with a strong interest in software development, embedded systems, IoT, electronics, and emerging technologies. With a first-year CGPA of 8.88, I’m driven by curiosity, continuous learning, and a passion for turning ideas into practical solutions.
            </p>
            
            <p className={styles.paragraph}>
              I enjoy exploring both software and hardware through projects, hackathons, and hands-on experimentation. I’m also an Associate of the Innovators and Visionaries Club and a member of IEEE, where I engage with technology, innovation, and collaborative learning. I’m always looking to learn, build, collaborate, and create technology that makes a meaningful impact.
            </p>
          </div>

          {/* ── Right Column: Cartoon Avatar image ── */}
          <div className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <Image
                src="/about.jpg"
                alt="Anu Reddy Cartoon Avatar"
                width={500}
                height={500}
                className={styles.avatarImg}
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
