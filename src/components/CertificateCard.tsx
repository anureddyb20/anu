'use client';

import React from 'react';
import { Certificate } from '@/data/certificatesData';
import styles from './CertificateCard.module.css';

interface CertificateCardProps {
  certificate: Certificate;
  onSelect?: (cert: Certificate) => void;
}

export default function CertificateCard({ certificate, onSelect }: CertificateCardProps) {
  const handleOpenPdf = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(certificate);
    }
    window.open(certificate.fileUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(certificate);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      className={styles.card}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View certificate for ${certificate.title}`}
    >
      {/* Visual PDF Preview Box */}
      <div className={styles.previewContainer}>
        {/* Render actual PDF using iframe / object tag */}
        <iframe
          src={`${certificate.fileUrl}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
          title={`PDF Preview of ${certificate.title}`}
          className={styles.pdfFrame}
          loading="lazy"
        />

        <div className={styles.previewOverlay} />

        <div className={styles.topBadgeRow}>
          <span className={styles.orgBadge}>{certificate.organization}</span>
          <span className={styles.pdfTag}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            PDF
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        <div className={styles.metaHeader}>
          <h3 className={styles.title}>{certificate.title}</h3>
          
          <div className={styles.detailsRow}>
            <span className={styles.detailItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {certificate.date}
            </span>

            {certificate.location && (
              <span className={styles.detailItem}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {certificate.location}
              </span>
            )}
          </div>

          <p className={styles.description}>{certificate.description}</p>
        </div>

        {/* Action Row with VIEW CERTIFICATE button */}
        <div className={styles.actionRow}>
          <button
            type="button"
            className={styles.viewBtn}
            onClick={handleOpenPdf}
            aria-label={`Open original PDF for ${certificate.title}`}
          >
            <span>VIEW CERTIFICATE</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
