'use client';

import React, { useRef, useState } from 'react';
import { Certificate, certificatesData } from '@/data/certificatesData';
import CertificateCard from './CertificateCard';
import styles from './CertificateCarousel.module.css';

interface CertificateCarouselProps {
  onSelectCertificate?: (cert: Certificate) => void;
  isPausedExternal?: boolean;
}

export default function CertificateCarousel({
  onSelectCertificate,
  isPausedExternal = false,
}: CertificateCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate data array twice to guarantee a seamless 50% infinite translation loop
  const duplicatedCertificates = [...certificatesData, ...certificatesData];

  const handleScrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`${styles.carouselContainer} ${
        isPausedExternal || isHovered ? styles.paused : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-roledescription="carousel"
      aria-label="3D Certificates Carousel"
    >
      <div className={styles.controlsRow}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={handleScrollLeft}
          aria-label="Previous certificates"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <span className={styles.counter}>
          {certificatesData.length} ACTUAL CERTIFICATES
        </span>

        <button
          type="button"
          className={styles.navBtn}
          onClick={handleScrollRight}
          aria-label="Next certificates"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className={styles.trackWrapper} ref={trackRef}>
        <div className={styles.marqueeTrack}>
          {duplicatedCertificates.map((cert, index) => (
            <div key={`${cert.id}-${index}`} className={styles.cardItem}>
              <CertificateCard
                certificate={cert}
                onSelect={onSelectCertificate}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
