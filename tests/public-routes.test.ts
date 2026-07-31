import { beforeEach, describe, expect, it, vi } from "vitest";

const { findUnique, notFound } = vi.hoisted(() => ({
  findUnique: vi.fn(),
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

vi.mock("@/lib/db", () => ({ db: { tour: { findUnique } } }));
vi.mock("next/navigation", () => ({ notFound }));

import PublicTourPage from "@/app/[slug]/page";
import EmbedTourPage from "@/app/embed/[slug]/page";

const tour = {
  title: "Falls",
  slug: "falls",
  kuulaUrl: "https://kuula.co/share/abc",
  published: true,
};

describe("public and embed routes", () => {
  beforeEach(() => {
    findUnique.mockReset();
    notFound.mockClear();
  });

  it.each([
    ["public", PublicTourPage],
    ["embed", EmbedTourPage],
  ])(
    "renders the tour viewer for a published tour on the %s route",
    async (_name, Page) => {
      findUnique.mockResolvedValue(tour);
      const result = await Page({ params: Promise.resolve({ slug: "falls" }) });
      expect(findUnique).toHaveBeenCalledWith({
        where: { slug: "falls" },
      });
      expect(JSON.stringify(result)).toContain("https://kuula.co/share/abc");
    },
  );

  it.each([
    ["public", PublicTourPage],
    ["embed", EmbedTourPage],
  ])("calls notFound for an unknown %s tour", async (_name, Page) => {
    findUnique.mockResolvedValue(null);
    await expect(
      Page({ params: Promise.resolve({ slug: "missing" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });

  it.each([
    ["public", PublicTourPage],
    ["embed", EmbedTourPage],
  ])(
    "renders an inaccessible state without an iframe for a draft %s tour",
    async (_name, Page) => {
      findUnique.mockResolvedValue({ ...tour, published: false });
      const result = await Page({ params: Promise.resolve({ slug: "draft" }) });
      const rendered = JSON.stringify(result);
      expect(rendered).toContain("unpublished");
      expect(rendered).not.toContain("https://kuula.co/share/abc");
      expect(notFound).not.toHaveBeenCalled();
    },
  );
});
