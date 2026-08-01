import Link from "next/link";
import { AdminHeader } from "@/components/AdminHeader";
import { TourForm } from "@/components/TourForm";
import { getCsrfToken, requireAdmin } from "@/lib/auth";

export default async function NewTourPage() {
  await requireAdmin();
  const csrf = await getCsrfToken();
  return (
    <>
      <AdminHeader csrf={csrf} />
      <main className="shell stack">
        <div>
          <Link href="/admin/tours">← Tours</Link>
          <h1>New tour</h1>
        </div>
        <TourForm csrf={csrf} />
      </main>
    </>
  );
}
