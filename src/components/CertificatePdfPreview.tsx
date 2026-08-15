'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CertificatePdfPreviewProps {
  pdfUrl: string;
  title: string;
  className?: string;
}

export default function CertificatePdfPreview({
  pdfUrl,
  title,
  className = '',
}: CertificatePdfPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    async function loadPdf() {
      try {
        setLoading(true);
        setError(false);

        // Dynamically import pdfjs-dist for client-side execution
        const pdfjsLib = await import('pdfjs-dist');

        // Set worker URL if not set
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;
        }

        const encodedUrl = encodeURI(pdfUrl);
        const loadingTask = pdfjsLib.getDocument({ url: encodedUrl });
        const pdf = await loadingTask.promise;

        if (isCancelled) return;

        const page = await pdf.getPage(1);
        if (isCancelled) return;

        const viewport = page.getViewport({ scale: 1.2 });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        };

        await page.render(renderContext).promise;
        if (!isCancelled) {
          setLoading(false);
        }
      } catch (err) {
        console.warn(`PDF.js preview render notice for ${pdfUrl}:`, err);
        if (!isCancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }

    loadPdf();

    return () => {
      isCancelled = true;
    };
  }, [pdfUrl]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      className={className}
    >
      {/* Canvas for rendering PDF Page 1 */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: loading || error ? 'none' : 'block',
          borderRadius: '12px',
        }}
      />

      {/* Loading Skeleton */}
      {loading && !error && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #121212 25%, #1f1f1f 50%, #121212 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: '#666', letterSpacing: '0.05em' }}>
            LOADING CERTIFICATE...
          </span>
        </div>
      )}

      {/* Fallback Viewport if PDF preview worker is blocked */}
      {error && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '24px',
            background: '#111111',
            border: '1px solid #222222',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#1e1e1e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #333',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>{title}</span>
          <span
            style={{
              fontSize: '0.7rem',
              color: '#888888',
              padding: '3px 8px',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '4px',
            }}
          >
            OFFICIAL PDF DOCUMENT
          </span>
        </div>
      )}
    </div>
  );
}
