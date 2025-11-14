import { ProjectCard } from "@/components/ProjectCard";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="flex gap-6 items-start">
        {/* Sharp blue accent line - matches text height */}
        <div className="w-1 bg-sky-500 flex-shrink-0 h-fit" />

        <div className="flex-1 space-y-2">
          <h1 className="text-4xl font-semibold leading-tight text-slate-50 md:text-5xl">
            I build end-to-end, data-heavy projects — from scraping and analysis to interactive web visuals.
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Python, scraping, and statistical modeling on the back end. Crisp, focused interfaces on the front end.
          </p>
          <p className="max-w-2xl text-sm tracking-wide font-medium text-slate-500" style={{ fontSize: '13px', fontVariant: 'small-caps', letterSpacing: '0.05em', lineHeight: '1.4' }}>
            Python · Pandas · Next.js · Cursor · Claude Code · ChatGPT
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500" style={{ fontVariant: 'small-caps', letterSpacing: '0.08em' }}>
          Featured Projects
        </h2>

        <div className="grid gap-0 md:grid-cols-3 items-stretch">
          <ProjectCard
            href="/zameen"
            kicker="Real estate · Pakistan"
            title="Zameen.com Property Analysis"
            stats={{ label: "LISTINGS", value: "200+" }}
            bullets={[
              "Scraped live property listings from Zameen.com using Playwright and JSON extraction",
              "Separated land vs construction value to estimate true build costs by precinct",
              "Exported Excel + JSON outputs that power construction cost and bargain visuals"
            ]}
            techStack={["PYTHON", "PLAYWRIGHT", "PANDAS", "EXCEL", "RECHARTS"]}
          />
          <ProjectCard
            href="/manutd"
            kicker="Football · Analytics"
            title="Why Man Utd Sucks?"
            stats={{ label: "SEASONS", value: "26" }}
            bullets={[
              "Scraped 26 seasons of Premier League squad stats from FBRef",
              "Compared Manchester United's attacking and defensive output vs City, Liverpool, Arsenal and Chelsea",
              "Quantified the post-Ferguson decline in goals, chance creation and overall performance"
            ]}
            techStack={["PYTHON", "PANDAS", "FBREF", "PLOTLY", "STATISTICS"]}
          />
          <ProjectCard
            href="/races"
            kicker="Endurance · Personal"
            title="Endurance Races & Data"
            stats={{ label: "RACES", value: "5+" }}
            bullets={[
              "Logged data from half-Ironman, Gran Fondo and open-water swim races",
              "Connected training blocks, pacing and nutrition to race-day outcomes",
              "Built simple dashboards to review what worked and what to change next season"
            ]}
            techStack={["DATA ANALYSIS", "PYTHON", "STRAVA / GARMIN", "SPREADSHEETS"]}
          />
        </div>
      </section>

      {/* Call to action */}
      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-4xl px-4 py-8 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-100 mb-2">
                Want to dig into the code or data?
              </h3>
              <p className="text-slate-400">
                The repos and analysis notebooks are open. I'm happy to walk through
                the pipeline, the trade-offs, or how I'd extend this for a real product.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-[11px] uppercase tracking-[0.16em] sm:flex-row">
              <Link
                href="https://github.com/saadkhan23"
                className="border border-slate-600 px-4 py-3 text-slate-200 hover:border-sky-400 hover:text-sky-300 transition-colors text-center"
              >
                View GitHub →
              </Link>
              <a
                href="mailto:saad.khaan@live.com"
                className="border border-sky-500 px-4 py-3 text-sky-300 hover:bg-sky-500 hover:text-slate-950 transition-colors text-center"
              >
                Get in touch →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
