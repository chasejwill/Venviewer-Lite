import { notFound } from "next/navigation";
import { TourViewer } from "@/components/TourViewer";
import { db } from "@/lib/db";
import { kuulaEmbedUrl } from "@/lib/tours";

export default async function EmbedTourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const tour = await db.tour.findUnique({
    where: { slug: (await params).slug },
  });
  if (!tour) notFound();
  if (!tour.published) {
    return (
      <main className="embed-unavailable">
        <div className="card">
          <h1>Tour unavailable</h1>
          <p>This tour is unpublished and currently inaccessible.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="embed-page">
      <TourViewer src={kuulaEmbedUrl(tour.kuulaUrl)} title={tour.title} />
    </main>
  );
}
