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

      <article className="rounded-xl p-6">
        <h1 className="mb-4 text-2xl font-semibold">the future I believe</h1>
        <div className="space-y-4 leading-relaxed text-[color:var(--text-muted)]">
          <p>
            I believe technology has already changed the world, and we are in the
            middle of another major shift right now. If we compare how people
            live today with life 100 years ago, the change is massive. In many
            ways, daily life has transformed more in the last century than in
            most of human history before it.
          </p>

          <p>
            I think about this future through three principles.
          </p>

          <h2 className="pt-2 text-base font-semibold text-[color:var(--foreground)]">
            Principle one: long time horizon wins
          </h2>
          <p>
            Yes, the price of Bitcoin can go down hard in the short term. But if
            you zoom out to a 10-year horizon, what looks expensive today can
            become cheap in hindsight. I care less about short-term volatility
            and more about whether a technology changes how value moves globally.
            My core belief is simple: when adoption keeps growing, time rewards
            patience.
          </p>

          <h2 className="pt-2 text-base font-semibold text-[color:var(--foreground)]">
            Principle two: autonomous vehicles will reshape society
          </h2>
          <p>
            Autonomous vehicles will not just change transportation, they will
            change city design, labor markets, and how we spend time. There are
            real risks: regulation, safety, and job displacement all matter. But
            if we build responsibly, the upside is huge: fewer accidents, lower
            logistics costs, and more accessible mobility for everyone.
          </p>

          <h2 className="pt-2 text-base font-semibold text-[color:var(--foreground)]">
            Principle three: the economics of AI agents
          </h2>
          <p>
            AI agents are creating a new economic layer for software. In the old
            model, software mostly helped humans click faster. In the new model,
            software can plan, execute, and improve tasks with minimal human
            input. That means businesses can run leaner teams while producing
            higher output. The winners will be people and companies who learn how
            to orchestrate agents, not just use tools.
          </p>

          <p>
            I am optimistic, but not blindly optimistic. Every powerful
            technology comes with tradeoffs. The goal is not to slow progress. It
            is to guide progress with good judgment, strong ethics, and long-term
            thinking. That is the future I believe in.
          </p>
        </div>
      </article>
    </main>
  );
}
