"use client";

import Link from "next/link";
import { type CSSProperties, useState } from "react";

type Locale = "en" | "zh" | "ja";

type HomeProps = {
  locale?: Locale;
};

const copy: Record<
  Locale,
  {
    name: string;
    based: string;
    currentlyPrefix: string;
    currentlySuffix: string;
    friends: string;
    bio: string;
    experience: string;
    tools: string;
    writings: string;
    articleTitle: string;
  }
> = {
  en: {
    name: "Haoxiang Jia",
    based: "based in NYC / Beijing",
    currentlyPrefix: "currently building",
    currentlySuffix: "& Father of two lovely doggies",
    friends: "My friends call me Henry or you can call me jiatastic",
    bio: "I'm the founding engineer @ PodPitch, where where we're building the #1 AI tool sets for the public relations industry to help everyone gain exposure through podcasts, newsletters, news outlets, and more. Joined right after graudate in 2024 and helped build the platform from groundup to a couple miliions ARR till today. We're powering the marketing groups behind Feastables, Beehiiv, Lockheed Martin, MyFitnessPal, Jack Links, Penguin Random House, and thousands of others.",
    experience: "experience",
    tools: "tools i use",
    writings: "writings",
    articleTitle: "the future I believe",
  },
  zh: {
    name: "贾皓翔",
    based: "常驻 纽约 / 北京",
    currentlyPrefix: "目前在",
    currentlySuffix: "打造产品，也是两只可爱狗狗的爸爸",
    friends: "朋友们叫我 Henry，你也可以叫我 jiatastic。",
    bio: "我是 PodPitch 的 founding engineer。我们正在打造面向公关行业的 AI 工具组合，帮助更多人通过播客、新闻通讯、媒体报道等方式获得曝光。我在 2024 年毕业后不久加入团队，参与从零到一搭建整个平台，并把业务一路做到今天数百万 ARR。我们正在为 Feastables、Beehiiv、Lockheed Martin、MyFitnessPal、Jack Links、Penguin Random House 以及数千家团队背后的市场部门提供支持。",
    experience: "经历",
    tools: "常用工具",
    writings: "文章",
    articleTitle: "the future I believe",
  },
  ja: {
    name: "贾皓翔",
    based: "拠点: ニューヨーク / 北京",
    currentlyPrefix: "現在は",
    currentlySuffix: "でプロダクトを作っています。二匹の愛犬の父でもあります。",
    friends: "友達には Henry と呼ばれます。jiatastic と呼んでくれても大丈夫です。",
    bio: "私は PodPitch の founding engineer です。私たちはPR業界向けのAIツール群を作り、ポッドキャスト、ニュースレター、メディア露出などを通じて、より多くの人が認知を獲得できるようにしています。私は 2024 年に卒業してすぐに参画し、プラットフォームの立ち上げから成長までを担い、現在は ARR 数百万規模まで拡大してきました。Feastables、Beehiiv、Lockheed Martin、MyFitnessPal、Jack Links、Penguin Random House、そして数千のチームのマーケティング部門を支えています。",
    experience: "経歴",
    tools: "ツール",
    writings: "記事",
    articleTitle: "the future I believe",
  },
};

export default function Home({ locale = "en" }: HomeProps) {
  const [pastOpen, setPastOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [writingsOpen, setWritingsOpen] = useState(false);
  const photoCards = [
    { src: "/doggies/justin-saiban-1.jpeg", tilt: -11 },
    { src: "/doggies/justin-saiban-2.jpeg", tilt: -6 },
    { src: "/doggies/justin-saiban-3.jpeg", tilt: -1 },
    { src: "/doggies/justin-saiban-4.jpeg", tilt: 5 },
    { src: "/doggies/justin-saiban-5.jpeg", tilt: 10 },
  ];

  const setTheme = (nextDark: boolean) => {
    const root = document.documentElement;
    root.classList.toggle("dark", nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  };

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const transitionApi = (
      document as Document & {
        startViewTransition?: (updateCallback: () => void) => {
          ready: Promise<void>;
          finished: Promise<void>;
        };
      }
    ).startViewTransition;

    if (!transitionApi || reducedMotion) {
      root.classList.add("theme-switching");
      setTheme(next);
      window.setTimeout(() => {
        root.classList.remove("theme-switching");
      }, 320);
      return;
    }

    const button = document.getElementById("theme-toggle");
    const rect = button?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 32;
    const y = rect ? rect.top + rect.height / 2 : 32;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    root.dataset.themeTransition = next ? "dark" : "light";
    const transition = transitionApi.call(document, () => {
      setTheme(next);
    });

    void transition.ready.then(() => {
      const start = `circle(0px at ${x}px ${y}px)`;
      const end = `circle(${endRadius}px at ${x}px ${y}px)`;
      document.documentElement.animate(
        { clipPath: next ? [start, end] : [end, start] },
        {
          duration: 1100,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: next
            ? "::view-transition-new(root)"
            : "::view-transition-old(root)",
        },
      );
    });

    void transition.finished.finally(() => {
      delete root.dataset.themeTransition;
    });
  };

  const t = copy[locale];
  const localeHref = (target: Locale) => (target === "en" ? "/" : `/${target}`);
  const localeClass = (target: Locale) =>
    target === locale
      ? "font-semibold"
      : "hover:text-[color:var(--text-interactive-hover)] transition-colors";

  return (
    <main className="px-6 py-20 text-sm leading-relaxed text-[color:var(--foreground)]">
      <section className="mx-auto max-w-lg">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-[color:var(--text-subtle)]">
            <Link href={localeHref("en")} className={localeClass("en")}>
              EN
            </Link>
            <Link href={localeHref("zh")} className={localeClass("zh")}>
              中文
            </Link>
            <Link href={localeHref("ja")} className={localeClass("ja")}>
              日本語
            </Link>
          </div>
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative cursor-pointer select-none rounded border border-black/10 dark:border-white/15 p-2 text-[color:var(--text-subtle)] hover:text-[color:var(--text-interactive-hover)] hover:scale-105 active:scale-95 transition-all"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current transition-all duration-300 ease-out opacity-100 rotate-0 scale-100 dark:opacity-0 dark:-rotate-90 dark:scale-50"
              aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3c.15 0 .3.01.45.02A7 7 0 0 0 21 12.79z" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              className="absolute inset-0 m-auto h-5 w-5 fill-current transition-all duration-300 ease-out opacity-0 rotate-90 scale-50 dark:opacity-100 dark:rotate-0 dark:scale-100"
              aria-hidden="true"
            >
              <path d="M12 4a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1zm0 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm7-5a1 1 0 0 1 0 2h-1.5a1 1 0 1 1 0-2H19zM7.5 11a1 1 0 1 1 0 2H6a1 1 0 1 1 0-2h1.5zm7.95-4.54a1 1 0 0 1 1.42 0l1.06 1.06a1 1 0 1 1-1.42 1.42l-1.06-1.06a1 1 0 0 1 0-1.42zm-8.9 8.9a1 1 0 0 1 1.42 0l1.06 1.06a1 1 0 1 1-1.42 1.42L6.55 16.8a1 1 0 0 1 0-1.42zm10.32 1.06a1 1 0 0 1 1.42 1.42l-1.06 1.06a1 1 0 1 1-1.42-1.42l1.06-1.06zM8.03 6.46a1 1 0 0 1 0 1.42L6.97 8.94a1 1 0 1 1-1.42-1.42l1.06-1.06a1 1 0 0 1 1.42 0z" />
            </svg>
          </button>
        </div>
        <h1 className="text-base font-semibold mb-1">{t.name}</h1>
        <p className="mb-2 text-xs text-[color:var(--text-subtle)]">{t.based}</p>
        <div className="mb-4 flex items-center gap-4 text-[color:var(--text-subtle)]">
          <a
            href="https://x.com/jiatastic520"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="text-[color:var(--text-interactive)] hover:text-[color:var(--text-interactive-hover)] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M4 3h4.2l4 5.4L16.9 3H20l-6.3 7.2L20.4 21h-4.2l-4.5-6-5.2 6H3.4l6.8-7.9L4 3z" />
            </svg>
          </a>
          <a
            href="https://github.com/jiatastic"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#4b5563] dark:text-[#94a3b8] hover:text-[#181717] dark:hover:text-[#f8fafc] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.6 2 12.27c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.15-4.56-5.11 0-1.13.39-2.05 1.03-2.78-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.06A9.33 9.33 0 0 1 12 6.84c.85 0 1.7.12 2.5.36 1.9-1.34 2.74-1.06 2.74-1.06.55 1.41.2 2.46.1 2.72.64.73 1.03 1.65 1.03 2.78 0 3.97-2.35 4.85-4.59 5.11.36.32.69.95.69 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.24 10.24 0 0 0 22 12.27C22 6.6 17.52 2 12 2z" />
            </svg>
          </a>
          <a
            href="mailto:jiahaoxiangpersonal@gmail.com"
            aria-label="Email"
            className="text-[#6b7280] dark:text-[#94a3b8] hover:text-[#d44638] dark:hover:text-[#f87171] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2v.5l9 5.63 9-5.63V7l-9 5.63L3 7z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/haoxiang-jia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#6b7280] dark:text-[#94a3b8] hover:text-[#0a66c2] dark:hover:text-[#60a5fa] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M6.94 8.5a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44zM5.5 9.75h2.88V19H5.5V9.75zm4.53 0h2.76v1.26h.04c.38-.73 1.33-1.5 2.75-1.5 2.94 0 3.48 1.94 3.48 4.46V19h-2.88v-4.45c0-1.06-.02-2.42-1.47-2.42-1.48 0-1.7 1.16-1.7 2.35V19h-2.98V9.75z" />
            </svg>
          </a>
        </div>
        <p className="mb-2 text-[color:var(--text-muted)]">
          {t.currentlyPrefix}{" "}
          <a
            href="https://podpitch.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[color:var(--text-interactive-hover)] transition-colors"
          >
            PodPitch
          </a>{" "}
          {t.currentlySuffix}
        </p>
        <p className="mb-5 text-[color:var(--text-muted)]">{t.friends}</p>

        <p className="mb-4 text-[color:var(--text-muted)]">{t.bio}</p>

        <div className="mb-2 rounded-lg bg-[color:var(--accordion-bg)] p-2.5">
          <button
            onClick={() => setPastOpen((o) => !o)}
            className="cursor-pointer select-none text-[color:var(--text-subtle)] hover:text-[color:var(--text-interactive-hover)] transition-colors"
          >
            {t.experience} {pastOpen ? "▾" : "▸"}
          </button>
          {pastOpen && (
            <ul className="mt-2 space-y-1 pl-2 text-[color:var(--text-muted)]">
              <li className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 rounded-sm bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('https://icons.duckduckgo.com/ip3/podpitch.com.ico')" }}
                />
                — founding engineer @ PodPitch
              </li>
              <li className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 rounded-sm bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('https://icons.duckduckgo.com/ip3/fordhamcdt.org.ico')" }}
                />
                — technical member @{" "}
                <a
                  href="https://www.fordhamcdt.org/research/design-lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-[color:var(--text-interactive-hover)] transition-colors"
                >
                  fordham university designLAB
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 rounded-sm bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('https://icons.duckduckgo.com/ip3/fantuan.ca.ico')" }}
                />
                — operation @{" "}
                <a
                  href="https://fantuan.ca/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-[color:var(--text-interactive-hover)] transition-colors"
                >
                  FanTuan
                </a>
              </li>
              {/* Add more past roles/projects here */}
            </ul>
          )}
        </div>

        <div className="mb-2 rounded-lg bg-[color:var(--accordion-bg)] p-2.5">
          <button
            onClick={() => setToolsOpen((o) => !o)}
            className="cursor-pointer select-none text-[color:var(--text-subtle)] hover:text-[color:var(--text-interactive-hover)] transition-colors"
          >
            {t.tools} {toolsOpen ? "▾" : "▸"}
          </button>
          {toolsOpen && (
            <ul className="mt-2 space-y-1 pl-2 text-[color:var(--text-muted)]">
              <li className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 rounded-sm bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('https://icons.duckduckgo.com/ip3/opencode.ai.ico')" }}
                />
                — opencode
              </li>
              <li className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 rounded-sm bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('https://icons.duckduckgo.com/ip3/cursor.com.ico')" }}
                />
                — cursor
              </li>
              <li className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 rounded-sm bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('https://icons.duckduckgo.com/ip3/openai.com.ico')" }}
                />
                — codex
              </li>
              <li className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 rounded-sm bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('https://icons.duckduckgo.com/ip3/warp.dev.ico')" }}
                />
                — warp
              </li>
              <li className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 rounded-sm bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('https://icons.duckduckgo.com/ip3/convex.dev.ico')" }}
                />
                — convex
              </li>
              <li className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 rounded-sm bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('https://icons.duckduckgo.com/ip3/react.dev.ico')" }}
                />
                — react-grab
              </li>
              <li className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 rounded-sm bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('https://icons.duckduckgo.com/ip3/diabrowser.com.ico')" }}
                />
                — dia browser
              </li>
              <li className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 rounded-sm bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('https://icons.duckduckgo.com/ip3/raycast.com.ico')" }}
                />
                — raycast
              </li>
            </ul>
          )}
        </div>

        <div className="mb-3 rounded-lg bg-[color:var(--accordion-bg)] p-2.5">
          <button
            onClick={() => setWritingsOpen((o) => !o)}
            className="cursor-pointer select-none text-[color:var(--text-subtle)] hover:text-[color:var(--text-interactive-hover)] transition-colors"
          >
            {t.writings} {writingsOpen ? "▾" : "▸"}
          </button>
          {writingsOpen && (
            <ul className="mt-2 space-y-1 pl-2 text-[color:var(--text-muted)]">
              <li>
                —{" "}
                <Link
                  href="/writings/the-future-i-believe"
                  className="underline underline-offset-2 hover:text-[color:var(--text-interactive-hover)] transition-colors"
                >
                  {t.articleTitle}
                </Link>
              </li>
            </ul>
          )}
        </div>

        <section className="mb-10 mt-10 overflow-visible">
          <div className="mb-3 pl-2">
            <div
              role="img"
              aria-label="Haoxiang Jia signature"
              className="h-12 w-80 bg-contain bg-left bg-no-repeat opacity-100"
              style={{ backgroundImage: "url('/signature/haoxiang-signature-crop.png')" }}
            />
          </div>
          <div className="overflow-visible py-6">
            <div className="mx-auto flex w-max min-w-full items-end justify-center overflow-visible px-4">
              {photoCards.map((card, index) => (
                <figure
                  key={card.src}
                  className={`polaroid-card relative w-28 rounded-[2px] p-2 pb-6 shadow-[0_10px_22px_rgba(2,6,23,0.2)] transition-transform duration-500 ease-out will-change-transform [transform:rotate(var(--tilt))_scale(1)] hover:z-30 hover:[transform:translateY(-20px)_rotate(0deg)_scale(1.65)] sm:w-32 md:w-36 ${
                    index === 0 ? "ml-0" : "-ml-8 sm:-ml-9 md:-ml-10"
                  }`}
                  style={{ "--tilt": `${card.tilt}deg` } as CSSProperties}
                >
                  <div
                    role="img"
                    aria-label="Photo memory"
                    className="photo-texture h-24 w-full bg-cover bg-center sm:h-28 md:h-32"
                    style={{ backgroundImage: `url(${card.src})` }}
                  />
                  <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-black/12" />
                </figure>
              ))}
            </div>
          </div>
          <p className="mt-4 pl-2 text-xs text-[color:var(--text-subtle)]">
            Justin & Saiban
          </p>
        </section>

      </section>
    </main>
  );
}
