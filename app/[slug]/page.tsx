import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TourViewer } from "@/components/TourViewer";
import { db } from "@/lib/db";
import { kuulaEmbedUrl } from "@/lib/tours";

type Props = { params: Promise<{ slug: string }> };

async function findTour(slug: string) {
  return db.tour.findUnique({ where: { slug } });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = await findTour((await params).slug);
  return { title: tour?.title ?? "Tour not found" };
}

export default async function PublicTourPage({ params }: Props) {
  const tour = await findTour((await params).slug);
  if (!tour) notFound();
  if (!tour.published) {
    return (
      <main className="shell">
        <div className="card">
          <h1>{tour.title}</h1>
          <p>This tour is unpublished and currently inaccessible.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="viewer-page">
      <h1 className="viewer-title">{tour.title}</h1>
      <TourViewer src={kuulaEmbedUrl(tour.kuulaUrl)} title={tour.title} />
    </main>
  );
}
