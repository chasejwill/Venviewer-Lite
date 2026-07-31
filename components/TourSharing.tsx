import { CopyButton } from "@/components/CopyButton";
import { tourSharing } from "@/lib/sharing";

export function TourSharing({
  baseUrl,
  tour,
}: {
  baseUrl: string;
  tour: { slug: string; title: string };
}) {
  const sharing = tourSharing(baseUrl, tour);

  return (
    <section className="card stack" aria-labelledby="sharing-heading">
      <h2 id="sharing-heading">Share and preview</h2>
      <div>
        <strong>Public URL</strong>
        <p>
          <code>{sharing.publicUrl}</code>
        </p>
        <div className="actions">
          <CopyButton value={sharing.publicUrl} label="Copy public URL" />
          <a
            className="button secondary"
            href={sharing.publicUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open public
          </a>
        </div>
      </div>
      <div>
        <strong>Embed URL</strong>
        <p>
          <code>{sharing.embedUrl}</code>
        </p>
        <div className="actions">
          <CopyButton value={sharing.embedUrl} label="Copy embed URL" />
          <a
            className="button secondary"
            href={sharing.embedUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open embed
          </a>
        </div>
      </div>
      <div>
        <strong>Iframe code</strong>
        <pre className="code-block">
          <code>{sharing.iframeCode}</code>
        </pre>
        <CopyButton value={sharing.iframeCode} label="Copy iframe" />
      </div>
    </section>
  );
}
