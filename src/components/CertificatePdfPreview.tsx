'use client';

import React from 'react';
import Image from 'next/image';

interface CertificatePdfPreviewProps {
  previewImage: string;
  pdfUrl: string;
  title: string;
  className?: string;
}

export default function CertificatePdfPreview({
  previewImage,
  title,
  className = '',
}: CertificatePdfPreviewProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#050505',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      className={className}
    >
      <Image
        src={previewImage}
        alt={`Certificate preview of ${title}`}
        fill
        sizes="(max-width: 768px) 260px, 320px"
        style={{
          objectFit: 'contain',
          padding: '4px',
        }}
        priority={true}
        unoptimized
      />
    </div>
  );
}
