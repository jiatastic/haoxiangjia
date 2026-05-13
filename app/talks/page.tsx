import Link from "next/link";

type Talk = {
  id: string;
  episodeTitle: string;
  showName: string;
  showUrl: string;
  releaseDate: string;
  durationMs: number;
  description: string;
  appleUrl: string;
  spotifyUrl: string;
};

const talks: Talk[] = [
  {
    id: "tech-talk-live-122",
    episodeTitle:
      "Unlocking Podcast Success with Henry Jia from PodPitch",
    showName: "Tech Talk Live",
    showUrl: "https://podcasts.apple.com/us/podcast/tech-talk-live/id1746804061",
    releaseDate: "2026-05-12",
    durationMs: 3006000,
    description:
      "Henry Jia, a Founding Engineer of PodPitch.com, discusses how PodPitch automates podcast outreach for PR agencies and entrepreneurs — identifying relevant podcasts, crafting pitches, and managing follow-ups to book guests. The conversation highlights the impact of podcast appearances on brand visibility and AI SEO, with transcriptions and AI-generated social media clips.",
    appleUrl:
      "https://podcasts.apple.com/us/podcast/unlocking-podcast-success-with-henry-jia-from-podpitch/id1746804061?i=1000767494187",
    spotifyUrl: "https://open.spotify.com/episode/0iwUE4m7d45iIaSJchMjam",
  },
];

const APPLE_FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", system-ui, sans-serif';

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

function formatDateLabel(iso: string, now: Date): string {
  const d = new Date(iso);
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays >= 0 && diffDays <= 6) {
    if (diffDays === 0) return "TODAY";
    if (diffDays === 1) return "1D AGO";
    return `${diffDays}D AGO`;
  }
  const month = MONTHS[d.getUTCMonth()];
  const day = d.getUTCDate();
  const sameYear = d.getUTCFullYear() === now.getUTCFullYear();
  return sameYear ? `${month} ${day}` : `${month} ${day}, ${d.getUTCFullYear()}`;
}

function formatDuration(ms: number): string {
  const mins = Math.round(ms / 60000);
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export default function TalksPage() {
  const now = new Date();

  return (
    <main
      className="mx-auto max-w-4xl px-6 py-10 text-[color:var(--foreground)]"
      style={{ fontFamily: APPLE_FONT_STACK }}
    >
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-[color:var(--text-subtle)] hover:text-[color:var(--text-interactive-hover)] transition-colors"
      >
        ← back to home
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Talks</h1>
        <p className="mt-1 text-sm text-[color:var(--text-subtle)]">
          On the other side of the mic, for once.
        </p>
      </header>

      <section>
        <ul>
          {talks.map((talk, index) => (
            <li
              key={talk.id}
              className={`border-t border-black/8 dark:border-white/8 ${
                index === talks.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="group -mx-3 flex w-full items-start gap-4 rounded-lg px-3 py-4 transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.04] sm:gap-5">
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[color:var(--text-subtle)]">
                    {formatDateLabel(talk.releaseDate, now)}
                  </p>
                  <h3 className="mt-1 text-base font-semibold leading-snug line-clamp-2 sm:text-[17px]">
                    {talk.episodeTitle}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-[color:var(--text-muted)] line-clamp-2 group-hover:line-clamp-none">
                    {talk.description}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-3 pt-1">
                  <div className="flex items-center gap-2.5">
                    <a
                      href={talk.appleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Listen on Apple Podcasts"
                      className="transition-transform hover:scale-110"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://icons.duckduckgo.com/ip3/podcasts.apple.com.ico"
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5 rounded"
                      />
                    </a>
                    <a
                      href={talk.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Listen on Spotify"
                      className="transition-transform hover:scale-110"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://icons.duckduckgo.com/ip3/open.spotify.com.ico"
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5 rounded"
                      />
                    </a>
                  </div>
                  <span className="text-sm text-[color:var(--text-subtle)]">
                    {formatDuration(talk.durationMs)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
