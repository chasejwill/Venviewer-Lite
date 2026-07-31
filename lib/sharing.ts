type ShareableTour = {
  slug: string;
  title: string;
};

function escapeAttribute(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function tourSharing(baseUrl: string, tour: ShareableTour) {
  const publicUrl = new URL(`/${tour.slug}`, baseUrl).toString();
  const embedUrl = new URL(`/embed/${tour.slug}`, baseUrl).toString();
  const iframeCode = `<iframe src="${escapeAttribute(embedUrl)}" width="100%" height="640" title="${escapeAttribute(tour.title)}" allow="fullscreen; xr-spatial-tracking" allowfullscreen loading="lazy"></iframe>`;

  return { publicUrl, embedUrl, iframeCode };
}
