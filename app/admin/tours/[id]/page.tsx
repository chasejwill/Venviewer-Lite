import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/AdminHeader";
import { TourForm } from "@/components/TourForm";
import { TourSharing } from "@/components/TourSharing";
import { getCsrfToken, requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { getEnv } from "@/lib/env";

export default async function EditTourPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdmin();
  const [csrf, tour] = await Promise.all([
    getCsrfToken(),
    db.tour.findUnique({ where: { id: (await params).id } }),
  ]);
  if (!tour) notFound();

  return (
    <>
      <AdminHeader csrf={csrf} />
      <main className="shell stack">
        <div>
          <Link href="/admin/tours">← Tours</Link>
          <h1>Edit tour</h1>
          {(await searchParams).saved === "1" ? (
            <p className="success" role="status">
              Changes saved.
            </p>
          ) : null}
        </div>
        <TourForm csrf={csrf} tour={tour} />
        <TourSharing baseUrl={getEnv().VENVIEWER_LITE_BASE_URL} tour={tour} />
      </main>
    </>
  );
}
