import { describe, expect, it } from "vitest";
import {
  kuulaEmbedUrl,
  kuulaUrlSchema,
  slugSchema,
  tourInputSchema,
} from "@/lib/tours";

describe("tour validation", () => {
  it.each(["falls-of-the-ohio", "tour123", "a-b"])(
    "accepts valid slug %s",
    (slug) => {
      expect(slugSchema.safeParse(slug).success).toBe(true);
    },
  );

  it.each([
    "Admin",
    "two words",
    "-leading",
    "double--dash",
    "embed",
    "admin",
    "login",
    "logout",
    "_next",
  ])("rejects invalid or reserved slug %s", (slug) => {
    expect(slugSchema.safeParse(slug).success).toBe(false);
  });

  it.each([
    "https://kuula.co/share/abc123",
    "https://kuula.co/share/collection/7qVRD?logo=0",
    "https://www.kuula.co/share/abc_DEF-1",
  ])("accepts supported Kuula URL %s", (url) => {
    expect(kuulaUrlSchema.safeParse(url).success).toBe(true);
  });

  it.each([
    "http://kuula.co/share/abc",
    "https://evil.example/share/abc",
    "https://kuula.co/",
    "https://kuula.co:443/share/abc",
    "https://user:password@kuula.co/share/abc",
    "https://kuula.co/share/abc#fragment",
    "https://kuula.co/post/abc",
    "not-a-url",
  ])("rejects unsafe Kuula URL %s", (url) => {
    expect(kuulaUrlSchema.safeParse(url).success).toBe(false);
  });

  it("normalizes safely without changing administrator query values", () => {
    const result = kuulaEmbedUrl(
      "HTTPS://WWW.KUULA.CO/share/abc/?logo=0&foo=one%20two&foo=three",
    );
    const normalized = new URL(result);
    expect(normalized.origin).toBe("https://www.kuula.co");
    expect(normalized.pathname).toBe("/share/abc");
    expect(normalized.searchParams.get("logo")).toBe("0");
    expect(normalized.searchParams.getAll("foo")).toEqual(["one two", "three"]);
    expect(normalized.searchParams.has("fs")).toBe(false);
  });

  it("requires the exact tour input shape", () => {
    expect(
      tourInputSchema.safeParse({
        title: "Tour",
        slug: "my-tour",
        kuulaUrl: "https://kuula.co/share/abc",
        published: false,
      }).success,
    ).toBe(true);
  });
});
