'use client';

import React from 'react';
import { Certificate } from '@/data/certificatesData';
import CertificatePdfPreview from './CertificatePdfPreview';
import styles from './CertificateCard.module.css';

interface CertificateCardProps {
  certificate: Certificate;
  isActive: boolean;
  offset: number; // position relative to center: -2, -1, 0, 1, 2
  onClick: () => void;
  style?: React.CSSProperties;
}

export default function CertificateCard({
  certificate,
  isActive,
  offset,
  onClick,
  style,
}: CertificateCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Select ${certificate.title}`}
      style={style}
    >
      {/* Visual Image / Canvas Box */}
      <div className={styles.visualContainer}>
        <CertificatePdfPreview pdfUrl={certificate.fileUrl} title={certificate.title} />

        <div className={styles.topPillRow}>
          <span className={styles.orgPill}>{certificate.organization}</span>
          <span className={styles.pdfBadge}>PDF</span>
        </div>
      </div>

      {/* Card Info */}
      <div className={styles.infoContainer}>
        <h3 className={styles.title}>{certificate.title}</h3>
        <span className={styles.organization}>{certificate.organization}</span>
      </div>
    </div>
  );
}
