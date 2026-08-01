import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell">
      <div className="card">
        <h1>Tour not found</h1>
        <p>The requested tour does not exist.</p>
        <Link href="/">Return home</Link>
      </div>
    </main>
  );
}
