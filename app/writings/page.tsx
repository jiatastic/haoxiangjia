import Link from "next/link";

type Post = {
  title: string;
  href: string;
  date: string;
};

const posts: Post[] = [
  {
    title: "the future I believe",
    href: "/writings/the-future-i-believe",
    date: "2025",
  },
];

export default function WritingsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-[color:var(--foreground)]">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-[color:var(--text-subtle)] underline underline-offset-2 hover:text-[color:var(--text-interactive-hover)] transition-colors"
      >
        ← back to home
      </Link>

      <h1 className="mb-2 text-2xl font-semibold">writings</h1>
      <p className="mb-8 text-sm text-[color:var(--text-subtle)]">
        Notes, essays, and longer thoughts.
      </p>

      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.href} className="flex items-baseline justify-between gap-4">
            <Link
              href={post.href}
              className="text-[color:var(--text-interactive)] underline underline-offset-2 hover:text-[color:var(--text-interactive-hover)] transition-colors"
            >
              {post.title}
            </Link>
            <span className="text-xs text-[color:var(--text-subtle)]">{post.date}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
