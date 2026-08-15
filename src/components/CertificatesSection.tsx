'use client';

import React from 'react';
import CertificateCarousel from './CertificateCarousel';
import styles from './CertificatesSection.module.css';

export default function CertificatesSection() {
  return (
    <section className={styles.certificates} id="certificates">
      {/* Subtle ambient background glow */}
      <div className={styles.ambientGlow} />

      {/* Header Container */}
      <div className={styles.headerContainer}>
        <div className={styles.sectionBadge}>
          <span className={styles.badgeDot} />
          VERIFIED CREDENTIALS
        </div>

        <h2 className={styles.heading}>
          CERTIFICATES & <span className={styles.highlight}>EVENTS</span>
        </h2>

        <p className={styles.subtitle}>
          Interactive 3D gallery showcasing actual certificates and event achievements.
        </p>
      </div>

      {/* 3D Perspective Coverflow Carousel */}
      <CertificateCarousel />
    </section>
  );
}
