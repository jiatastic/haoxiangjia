import Link from "next/link";

export default function TheFutureIBelievePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-[color:var(--foreground)]">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-[color:var(--text-subtle)] underline underline-offset-2 hover:text-[color:var(--text-interactive-hover)] transition-colors"
      >
        ← back to home
      </Link>

      <article className="rounded-xl bg-[color:var(--accordion-bg)] p-6">
        <h1 className="mb-4 text-2xl font-semibold">the future I believe</h1>
        <p className="leading-relaxed text-[color:var(--text-muted)]">
          I believe technology can change the world, cypto, tesla, and AI.
        </p>
      </article>
    </main>
  );
}
