'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Certificate, certificatesData } from '@/data/certificatesData';
import CertificateCard from './CertificateCard';
import CertificateModal from './CertificateModal';
import styles from './CertificateCarousel.module.css';

export default function CertificateCarousel() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const touchStartX = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);

  const totalCount = certificatesData.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalCount);
  }, [totalCount]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalCount) % totalCount);
  }, [totalCount]);

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      // Clicking center card opens detail modal
      setSelectedCert(certificatesData[index]);
    } else {
      // Clicking side card smoothly brings it to center
      setActiveIndex(index);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedCert) return; // ignore when modal is open
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, selectedCert]);

  // Touch / Drag Handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    touchStartX.current = clientX;
    isDragging.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging.current || touchStartX.current === null) return;
    const clientX =
      'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = clientX - touchStartX.current;

    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    isDragging.current = false;
  };

  return (
    <div className={styles.carouselSection}>
      {/* 3D Perspective Stage */}
      <div
        className={styles.stageWrapper}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
      >
        <div className={styles.cardsTrack}>
          {certificatesData.map((cert, index) => {
            // Calculate circular offset relative to activeIndex
            let offset = index - activeIndex;
            if (offset > totalCount / 2) offset -= totalCount;
            if (offset < -totalCount / 2) offset += totalCount;

            const absOffset = Math.abs(offset);
            const isActive = offset === 0;

            // Compute responsive 3D transforms
            let translateX = offset * 240;
            let translateZ = -absOffset * 140;
            let rotateY = -offset * 26;
            let scale = Math.max(0.65, 1.15 - absOffset * 0.25);
            let opacity = absOffset > 2 ? 0 : Math.max(0.35, 1 - absOffset * 0.3);
            let zIndex = 50 - absOffset * 10;

            if (offset === 0) {
              translateX = 0;
              translateZ = 60;
              rotateY = 0;
              scale = 1.15;
              opacity = 1;
              zIndex = 50;
            } else if (absOffset === 1) {
              translateX = offset * 250;
              translateZ = -130;
              rotateY = -offset * 26;
              scale = 0.86;
              opacity = 0.75;
              zIndex = 30;
            } else if (absOffset === 2) {
              translateX = offset * 440;
              translateZ = -280;
              rotateY = -offset * 38;
              scale = 0.68;
              opacity = 0.45;
              zIndex = 10;
            }

            const cardStyle: React.CSSProperties = {
              transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
              opacity,
              zIndex,
              pointerEvents: absOffset > 2 ? 'none' : 'auto',
            };

            return (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                isActive={isActive}
                offset={offset}
                onClick={() => handleCardClick(index)}
                style={cardStyle}
              />
            );
          })}
        </div>

        {/* Subtle Floor Reflection Effect */}
        <div className={styles.reflectionFloor} />
      </div>

      {/* Navigation Controls */}
      <div className={styles.controlsRow}>
        <button
          type="button"
          className={styles.navArrow}
          onClick={handlePrev}
          aria-label="Previous certificate"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <span className={styles.indicatorText}>
          {activeIndex + 1} / {totalCount}
        </span>

        <button
          type="button"
          className={styles.navArrow}
          onClick={handleNext}
          aria-label="Next certificate"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Interactive Detail Modal */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
}
