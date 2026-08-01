import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { getCsrfToken, getSession } from "@/lib/auth";

export const metadata: Metadata = { title: "Admin login" };

export default async function LoginPage() {
  if (await getSession()) redirect("/admin/tours");
  const csrf = await getCsrfToken();
  return (
    <main className="shell">
      <h1>Admin login</h1>
      <LoginForm csrf={csrf} />
    </main>
  );
}
