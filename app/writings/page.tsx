"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function WritingsPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  const wordCount = useMemo(() => {
    const trimmed = content.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }, [content]);

  const copyMarkdown = async () => {
    const markdown = `# ${title || "Untitled"}\n\n${content}`;
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-[color:var(--foreground)]">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm text-[color:var(--text-subtle)] underline underline-offset-2 hover:text-[color:var(--text-interactive-hover)] transition-colors"
        >
          ← back to home
        </Link>
        <button
          onClick={copyMarkdown}
          className="rounded-md bg-[color:var(--accordion-bg)] px-3 py-1.5 text-xs text-[color:var(--text-interactive)] hover:text-[color:var(--text-interactive-hover)] transition-colors"
        >
          {copied ? "copied" : "copy markdown"}
        </button>
      </div>

      <h1 className="mb-2 text-2xl font-semibold">writings</h1>
      <p className="mb-6 text-sm text-[color:var(--text-subtle)]">
        Draft your blog post here, then copy markdown when you are ready to publish.
      </p>

      <section className="mb-6 rounded-xl bg-[color:var(--accordion-bg)] p-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="mb-3 w-full rounded-md border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-base font-medium outline-none focus:border-[color:var(--text-interactive)]"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog post here..."
          className="min-h-72 w-full resize-y rounded-md border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm leading-relaxed outline-none focus:border-[color:var(--text-interactive)]"
        />
        <p className="mt-2 text-xs text-[color:var(--text-subtle)]">{wordCount} words</p>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-[color:var(--text-subtle)]">preview</h2>
        <article className="rounded-xl bg-[color:var(--accordion-bg)] p-4">
          <h3 className="mb-3 text-xl font-semibold">{title || "Untitled post"}</h3>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-[color:var(--text-muted)]">
            {content || "Your content preview will appear here."}
          </p>
        </article>
      </section>
    </main>
  );
}
