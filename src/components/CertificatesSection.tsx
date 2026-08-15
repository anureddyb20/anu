'use client';

import React from 'react';
import CertificateCarousel from './CertificateCarousel';
import styles from './CertificatesSection.module.css';

export default function CertificatesSection() {
  return (
    <section className={styles.certificates} id="certificates">
      {/* Ambient background glow */}
      <div className={styles.ambientGlow} />

      {/* Header Container */}
      <div className={styles.headerContainer}>
        <div className={styles.sectionBadge}>
          <span className={styles.badgeDot} />
          Verified Credentials
        </div>

        <h2 className={styles.heading}>
          Certificates & <span className={styles.highlight}>Achievements</span>
        </h2>

        <p className={styles.subtitle}>
          Interactive 3D showcase of my actual certificates and verified credentials.
        </p>
      </div>

      {/* 3D Infinite Certificate Carousel */}
      <CertificateCarousel />
    </section>
  );
}
