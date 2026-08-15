'use client';

import React, { useEffect } from 'react';
import { Certificate } from '@/data/certificatesData';
import CertificatePdfPreview from './CertificatePdfPreview';
import styles from './CertificateModal.module.css';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export default function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (certificate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const handleOpenPdf = () => {
    window.open(certificate.fileUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close details modal"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Top Preview Canvas */}
        <div className={styles.previewBox}>
          <CertificatePdfPreview pdfUrl={certificate.fileUrl} title={certificate.title} />
        </div>

        {/* Information Body */}
        <div className={styles.infoContent}>
          <span className={styles.categoryTag}>{certificate.category}</span>

          <h2 className={styles.title}>{certificate.title}</h2>
          <div className={styles.orgName}>{certificate.organization}</div>

          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Date: {certificate.date}</span>
            </div>

            <div className={styles.metaItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Location: {certificate.location}</span>
            </div>
          </div>

          <p className={styles.description}>{certificate.description}</p>

          {/* Action Row */}
          <div className={styles.actionRow}>
            <button type="button" className={styles.viewBtn} onClick={handleOpenPdf}>
              <span>VIEW CERTIFICATE</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>

            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
