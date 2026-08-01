"use client";

import { useState } from "react";

export function TourViewer({ src, title }: { src: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="viewer-container">
      {!loaded ? (
        <div className="viewer-loading" role="status" aria-live="polite">
          <span>Loading virtual tour…</span>
        </div>
      ) : null}
      <iframe
        className="viewer"
        src={src}
        title={title}
        width="100%"
        height="100%"
        allow="fullscreen; xr-spatial-tracking"
        allowFullScreen
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
