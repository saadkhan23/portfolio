'use client'

// ZAMEEN PROJECT PAGE – refreshed layout + copy
import { useEffect, useState } from 'react'
import { ConstructionCostChartFromData } from '@/components/zameen/ConstructionCostChartFromData'
import { SizeVsPriceSummary } from '@/components/zameen/SizeVsPriceSummary'
import { BargainsSummary } from '@/components/zameen/BargainsSummary'

interface ConstructionCostData {
  precinct: string
  median_cost_per_sq_yd: number
  p25_cost_per_sq_yd: number
  p75_cost_per_sq_yd: number
  n_properties: number
}

interface SizeVsPriceData {
  precinct: string
  n_houses: number
  median_size_sq_yd: number
  median_price: number
  median_price_per_sq_yd: number
  regression_slope: number
  regression_intercept: number
  r_squared: number
}

interface BargainSummaryData {
  precinct: string
  n_houses: number
  n_bargains: number
  bargain_pct: number
  median_price_per_sq_yd: number
  std_price_per_sq_yd: number
  min_bargain_price_per_sq_yd: number
  max_bargain_price_per_sq_yd: number
}

interface TopBargainData {
  precinct: string
  price: number
  size_sq_yd: number
  price_per_sq_yd: number
  z_score: number
  is_bargain: number
}

export default function ZameenPage() {
  const [constructionData, setConstructionData] = useState<ConstructionCostData[] | null>(null)
  const [sizeVsPriceData, setSizeVsPriceData] = useState<SizeVsPriceData[] | null>(null)
  const [bargainsSummary, setBargainsSummary] = useState<BargainSummaryData[] | null>(null)
  const [topBargains, setTopBargains] = useState<TopBargainData[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [constructionRes, sizeVsPriceRes, bargainsSummaryRes, topBargainsRes] = await Promise.all([
          fetch('/data/zameen/construction_cost_summary.json'),
          fetch('/data/zameen/size_vs_price_summary.json'),
          fetch('/data/zameen/bargains_summary.json'),
          fetch('/data/zameen/top_bargains.json'),
        ])

        if (!constructionRes.ok) throw new Error('Failed to load construction cost data')
        if (!sizeVsPriceRes.ok) throw new Error('Failed to load size vs price data')
        if (!bargainsSummaryRes.ok) throw new Error('Failed to load bargains summary')
        if (!topBargainsRes.ok) throw new Error('Failed to load top bargains')

        const [construction, sizeVsPrice, bargains, topBargains] = await Promise.all([
          constructionRes.json(),
          sizeVsPriceRes.json(),
          bargainsSummaryRes.json(),
          topBargainsRes.json(),
        ])

        setConstructionData(construction)
        setSizeVsPriceData(sizeVsPrice)
        setBargainsSummary(bargains)
        setTopBargains(topBargains)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analysis data')
        console.error('Error loading analysis data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="flex gap-6 items-start">
        {/* Sharp blue accent line */}
        <div className="w-1 bg-sky-500 flex-shrink-0 h-fit" />

        <div className="flex-1 space-y-2">
          <h1 className="text-4xl font-semibold leading-tight text-slate-50 md:text-5xl">
            Zameen.com Property Analysis
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Everyone has a theory about Karachi real estate. I pulled hundreds of Bahria Town Karachi listings to answer two simple questions:
            what does it actually cost to build a home here, and can we systematically spot the under-the-radar deals?
          </p>
          <p className="max-w-2xl text-sm tracking-wide font-medium text-slate-500" style={{ fontSize: '13px', fontVariant: 'small-caps', letterSpacing: '0.05em', lineHeight: '1.4' }}>
            Tools: Python · Pandas · Playwright · Recharts · Next.js
          </p>
        </div>
      </section>

      {/* Metrics Band */}
      <section className="space-y-6">
        <div className="grid gap-0 md:grid-cols-4 items-stretch">
          {/* Properties Analyzed */}
          <div
            className="grid border-l-0 border-r border-b border-t-0 border-slate-800 bg-slate-950 px-6 py-6 transition-colors hover:border-slate-700 hover:bg-slate-900"
            style={{
              display: 'grid',
              gridTemplateRows: 'auto 1fr auto',
              gap: '1rem',
            }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-600 mb-1" style={{ fontVariant: 'small-caps' }}>
              Properties Analyzed
            </p>
            <div className="flex items-center justify-center">
              <p className="text-4xl font-semibold text-sky-400">202</p>
            </div>
          </div>

          {/* Precincts */}
          <div
            className="grid border-l-0 border-r border-b border-t-0 border-slate-800 bg-slate-950 px-6 py-6 transition-colors hover:border-slate-700 hover:bg-slate-900"
            style={{
              display: 'grid',
              gridTemplateRows: 'auto 1fr auto',
              gap: '1rem',
            }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-600 mb-1" style={{ fontVariant: 'small-caps' }}>
              Precincts Compared
            </p>
            <div className="flex items-center justify-center">
              <p className="text-4xl font-semibold text-sky-400">3</p>
            </div>
          </div>

          {/* Data Points */}
          <div
            className="grid border-l-0 border-r border-b border-t-0 border-slate-800 bg-slate-950 px-6 py-6 transition-colors hover:border-slate-700 hover:bg-slate-900"
            style={{
              display: 'grid',
              gridTemplateRows: 'auto 1fr auto',
              gap: '1rem',
            }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-600 mb-1" style={{ fontVariant: 'small-caps' }}>
              Data Points Processed
            </p>
            <div className="flex items-center justify-center">
              <p className="text-4xl font-semibold text-sky-400">3,000+</p>
            </div>
          </div>

          {/* Construction Cost Range */}
          <div
            className="grid border-l-0 border-r border-b border-t-0 border-slate-800 bg-slate-950 px-6 py-6 transition-colors hover:border-slate-700 hover:bg-slate-900"
            style={{
              display: 'grid',
              gridTemplateRows: 'auto 1fr auto',
              gap: '1rem',
            }}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-600 mb-1" style={{ fontVariant: 'small-caps' }}>
              Cost Range (Median)
            </p>
            <div className="flex items-center justify-center text-center">
              <p className="text-xl font-semibold text-sky-400">PKR 70–80K/sq yd</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-50">Project Overview</h2>
        <div className="space-y-4 text-slate-300">
          <p>
            This started as a family question: if we moved to Bahria Town Karachi, what would it <em>really</em> cost to build
            a solid, middle-class home — and how would we know if a listing was a genuine bargain rather than just "cheap"
            for a bad reason?
          </p>
          <p>
            I scraped house and plot listings for three precincts (Precinct 5, Precinct 6, Precinct 8), converted everything to a per-square-yard
            basis, and separated land value from construction cost. That gave me two things:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>A realistic estimate of what it costs to build in BTK today.</li>
            <li>A repeatable way to flag homes that are statistically underpriced.</li>
          </ul>
          <p>
            The result is a small, opinionated model for Karachi property — useful for my family, and reusable for any
            precinct or city where similar listing data exists.
          </p>
        </div>
      </section>

      {/* Visual Insights */}
      {loading ? (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-50">Visual Insights</h2>
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-sky-400 mb-4"></div>
              <p className="text-slate-400">Loading analysis…</p>
            </div>
          </div>
        </section>
      ) : error ? (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-50">Visual Insights</h2>
          <div className="bg-red-950 border border-red-800 p-6 rounded">
            <p className="text-red-300 text-sm font-medium">Error loading analysis: {error}</p>
          </div>
        </section>
      ) : (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-50">Visual Insights</h2>

          {/* Construction Cost Analysis */}
          {constructionData && (
            <div className="space-y-4">
              <div className="border border-slate-800 bg-slate-950 px-6 py-6">
                <ConstructionCostChartFromData data={constructionData} />
              </div>
            </div>
          )}

          {/* Bargain Detection */}
          {bargainsSummary && topBargains && (
            <div className="space-y-4">
              <div className="border border-slate-800 bg-slate-950 px-6 py-6">
                <BargainsSummary bargainsSummary={bargainsSummary} topBargains={topBargains} />
              </div>
            </div>
          )}

          {/* Size vs Price Analysis */}
          {sizeVsPriceData && (
            <div className="space-y-4">
              <div className="border border-slate-800 bg-slate-950 px-6 py-6">
                <SizeVsPriceSummary data={sizeVsPriceData} />
              </div>
            </div>
          )}
        </section>
      )}

      {/* Key Takeaways */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-50">What This Tells Us</h2>
        <div className="space-y-3 text-slate-300">
          <div className="flex gap-3">
            <span className="text-sky-500 flex-shrink-0 mt-1 text-lg">▪</span>
            <p>
              <strong>Construction costs are boring — and that's powerful.</strong> Most homes cluster around
              70k–80k PKR per sq yd for construction. That stability makes it easy to separate build cost from land value
              and negotiation games.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-sky-500 flex-shrink-0 mt-1 text-lg">▪</span>
            <p>
              <strong>Some precincts price like a spreadsheet, others like a bazaar.</strong> Precinct 6 has the tightest
              size–price relationship; Precinct 8 is much noisier. Where pricing is predictable, bargains stand out cleanly.
              Where it's messy, you need more context.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-sky-500 flex-shrink-0 mt-1 text-lg">▪</span>
            <p>
              <strong>Real bargains are common, but measurable.</strong> Roughly 24% of listings in this sample are
              statistically underpriced. The point isn't that every one is a good buy — it's that you can find
              them systematically instead of scrolling Zameen on vibes.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-sky-500 flex-shrink-0 mt-1 text-lg">▪</span>
            <p>
              <strong>The pipeline scales beyond this family question.</strong> Swap in a different precinct or city,
              refresh the data, and the same logic will estimate build costs and surface potential bargains.
              It's a small, reusable engine for exploring real estate markets.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-50">Methodology</h2>

        <div className="space-y-6">
          {/* Data Collection */}
          <div className="border border-slate-800 bg-slate-950 px-6 py-6">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Data Collection</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex gap-3">
                <span className="text-sky-500 flex-shrink-0">▪</span>
                <span>Scrape plots and houses for Precinct 5, Precinct 6, Precinct 8 using Playwright headless browser</span>
              </li>
              <li className="flex gap-3">
                <span className="text-sky-500 flex-shrink-0">▪</span>
                <span>Normalize prices to per-square-yard basis for fair comparison</span>
              </li>
              <li className="flex gap-3">
                <span className="text-sky-500 flex-shrink-0">▪</span>
                <span>Handle missing or noisy listings through statistical validation</span>
              </li>
            </ul>
          </div>

          {/* Implied Construction Cost */}
          <div className="border border-slate-800 bg-slate-950 px-6 py-6">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Implied Construction Cost</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex gap-3">
                <span className="text-sky-500 flex-shrink-0">▪</span>
                <span>For each precinct, compute median plot price per square yard</span>
              </li>
              <li className="flex gap-3">
                <span className="text-sky-500 flex-shrink-0">▪</span>
                <span>For each house: (total price ÷ size) minus median plot price = implied construction cost</span>
              </li>
              <li className="flex gap-3">
                <span className="text-sky-500 flex-shrink-0">▪</span>
                <span>Aggregate p25, median, and p75 percentiles per precinct</span>
              </li>
            </ul>
          </div>

          {/* Bargain Detection */}
          <div className="border border-slate-800 bg-slate-950 px-6 py-6">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Bargain Detection</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex gap-3">
                <span className="text-sky-500 flex-shrink-0">▪</span>
                <span>Compute z-scores of house price per square yard within each precinct</span>
              </li>
              <li className="flex gap-3">
                <span className="text-sky-500 flex-shrink-0">▪</span>
                <span>Flag bargains: price_per_sq_yd &lt; median AND z_score &lt; −0.8</span>
              </li>
              <li className="flex gap-3">
                <span className="text-sky-500 flex-shrink-0">▪</span>
                <span>Roughly 1 in 4 houses qualify as statistically underpriced</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
