import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { TourViewer } from "@/components/TourViewer";

describe("tour viewer", () => {
  it("renders accessible loading UI and a full-size fullscreen iframe", () => {
    const html = renderToStaticMarkup(
      createElement(TourViewer, {
        src: "https://kuula.co/share/abc",
        title: "Example tour",
      }),
    );

    expect(html).toContain("Loading virtual tour…");
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain('width="100%"');
    expect(html).toContain('height="100%"');
    expect(html).not.toContain('height="640"');
    expect(html).toContain('class="viewer"');
    expect(html).toContain('allow="fullscreen; xr-spatial-tracking"');
    expect(html).toContain('loading="lazy"');
    expect(html.toLowerCase()).toContain("allowfullscreen");
  });
});
