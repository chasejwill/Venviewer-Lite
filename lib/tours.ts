import { z } from "zod";

export const RESERVED_SLUGS = new Set([
  "admin",
  "api",
  "embed",
  "login",
  "logout",
  "new",
  "_next",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
]);

export const slugSchema = z
  .string()
  .trim()
  .min(3, "Slug must contain at least 3 characters.")
  .max(80, "Slug must contain at most 80 characters.")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase letters, numbers, and single hyphens only.",
  )
  .refine((slug) => !RESERVED_SLUGS.has(slug), "This slug is reserved.");

export const kuulaUrlSchema = z
  .string()
  .trim()
  .url("Enter a valid URL.")
  .transform((value, context) => {
    const url = new URL(value);
    const approvedAuthority =
      /^https:\/\/(?:kuula\.co|www\.kuula\.co)(?=\/)/i.test(value);
    const valid =
      approvedAuthority &&
      url.protocol === "https:" &&
      ["kuula.co", "www.kuula.co"].includes(url.hostname) &&
      !url.username &&
      !url.password &&
      !url.port &&
      !url.hash &&
      /^\/share\/(?:collection\/)?[A-Za-z0-9_-]+\/?$/.test(url.pathname);
    if (!valid) {
      context.addIssue({
        code: "custom",
        message:
          "Use an HTTPS kuula.co share URL without credentials, ports, or fragments.",
      });
      return z.NEVER;
    }
    url.hostname = url.hostname.toLowerCase();
    url.pathname = url.pathname.replace(/\/$/, "");
    return url.toString();
  });

export const tourInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(120),
  slug: slugSchema,
  kuulaUrl: kuulaUrlSchema,
  published: z.boolean(),
});

export type TourInput = z.infer<typeof tourInputSchema>;

export function parseTourForm(formData: FormData) {
  return tourInputSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    kuulaUrl: formData.get("kuulaUrl"),
    published: formData.get("published") === "on",
  });
}

export function kuulaEmbedUrl(value: string): string {
  return kuulaUrlSchema.parse(value);
}
