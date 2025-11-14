'use client'

// ZAMEEN PROJECT PAGE – refreshed layout + copy
import { useEffect, useState } from 'react'
import { ConstructionCostChartFromData } from '@/components/zameen/ConstructionCostChartFromData'
import { SizeVsPriceSummary } from '@/components/zameen/SizeVsPriceSummary'
import { BargainsSummary } from '@/components/zameen/BargainsSummary'
import { BeeswarmPricePerSqYd } from '@/components/zameen/BeeswarmPricePerSqYd'

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
  const [beeswarmPoints, setBeeswarmPoints] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [constructionRes, sizeVsPriceRes, bargainsSummaryRes, topBargainsRes, beeswarmRes] = await Promise.all([
          fetch('/data/zameen/construction_cost_summary.json'),
          fetch('/data/zameen/size_vs_price_summary.json'),
          fetch('/data/zameen/bargains_summary.json'),
          fetch('/data/zameen/top_bargains.json'),
          fetch('/data/zameen/beeswarm_points.json'),
        ])

        if (!constructionRes.ok) throw new Error('Failed to load construction cost data')
        if (!sizeVsPriceRes.ok) throw new Error('Failed to load size vs price data')
        if (!bargainsSummaryRes.ok) throw new Error('Failed to load bargains summary')
        if (!topBargainsRes.ok) throw new Error('Failed to load top bargains')
        if (!beeswarmRes.ok) throw new Error('Failed to load beeswarm points')

        const [construction, sizeVsPrice, bargains, topBargains, beeswarm] = await Promise.all([
          constructionRes.json(),
          sizeVsPriceRes.json(),
          bargainsSummaryRes.json(),
          topBargainsRes.json(),
          beeswarmRes.json(),
        ])

        setConstructionData(construction)
        setSizeVsPriceData(sizeVsPrice)
        setBargainsSummary(bargains)
        setTopBargains(topBargains)
        setBeeswarmPoints(beeswarm)
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
            Bahria Town Karachi — A Data‑Driven Look
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Opinions are loud. Data is quiet. I scraped Bahria Town Karachi listings, separated land value from
            construction cost, and used simple statistics to find homes that are genuinely underpriced — useful if you’re
            choosing where to live or screening investments.
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

      {/* Lay of the Land */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-50">Lay of the Land</h2>
        <div className="space-y-4 text-slate-300">
          <p>
            Bahria Town Karachi (BTK) is a large, master‑planned community on the edge of Karachi. The draw is
            consistency: society‑managed security, utilities, road upkeep, parks, mosques, schools, and organized waste/water services.
          </p>
          <p>
            It’s a long‑horizon project built in phases. Multiple precincts are already active and lived in, with ongoing expansion of
            residential blocks, commercial corridors, schools, and healthcare capacity. The society continues to add amenities and
            improve internal connectivity over time.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Monthly maintenance (HOA): about PKR 7,000 (assumed mid‑range).</li>
            <li>One‑time utilities/connection allowance during build: ≈ PKR 300,000.</li>
            <li>Trade‑off: longer commutes; car‑first lifestyle; resale can be slower than DHA/Clifton in some segments.</li>
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-400">
            <div className="border border-slate-800 bg-slate-950 p-4 rounded">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Commute (indicative)</div>
              <div>BTK ↔ Airport: ~45–75 min</div>
              <div>BTK ↔ Clifton (Dolmen): ~70–110 min</div>
              <div>BTK ↔ Central (Saddar/LuckyOne): ~60–90 min</div>
            </div>
            <div className="border border-slate-800 bg-slate-950 p-4 rounded">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">On‑site</div>
              <div>Security access and patrols</div>
              <div>Schools within the society</div>
              <div>Hospitals/clinics available</div>
            </div>
            <div className="border border-slate-800 bg-slate-950 p-4 rounded">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-1">Units</div>
              <div>1 square yard = 9 square feet</div>
              <div>10 marla example ≈ 280 sq yd</div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-50">Project Overview</h2>
        <div className="space-y-4 text-slate-300">
          <p>
            Two simple ideas drive this work. First, normalize everything by size (price per square yard) so comparisons are fair.
            Second, separate land from building to understand what a house really costs to construct.
          </p>
          <div className="space-y-2">
            <p className="font-semibold text-slate-200">Two ways to estimate construction cost</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Implied method (from listings): Construction cost per sq yd = House price per sq yd − Typical plot price per sq yd.
              </li>
              <li>
                Bottom‑up method (from a builder’s view): Covered area × cost per sq ft + soft costs + contingency + one‑time utilities.
              </li>
            </ul>
            <p className="text-slate-400 text-sm">
              Example (10 marla ≈ 280 sq yd): Covered area = 280 × 9 × 0.70 × 2 ≈ 3,528 sq ft. At PKR 5,000–5,500 per sq ft,
              plus soft (3%), contingency (10%), and utilities (~PKR 300k), the build‑only total is ≈ PKR 20.2M–22.2M.
            </p>
          </div>
          <p>
            I gathered finished house and plot listings across three precincts (P5, P6, P8), excluded grey/unfinished shells from the numbers,
            and compared the implied figures against the bottom‑up calculation. The same framework works in any precinct or city with comparable
            listing data.
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

          {/* Beeswarm - first orientation visual */}
          {beeswarmPoints && (
            <div className="space-y-4">
              <div className="border border-slate-800 bg-slate-950 px-6 py-6">
                <BeeswarmPricePerSqYd data={beeswarmPoints} />
              </div>
              {sizeVsPriceData && (
                <div className="border border-slate-800 bg-slate-950 px-6 py-5">
                  <h4 className="text-sm font-bold text-slate-200 mb-2">What this shows</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    P5 clusters near {(() => {
                      const p5 = sizeVsPriceData.find(d => d.precinct.endsWith('_5'))
                      return p5 ? `PKR ${(p5.median_price/1_000_000).toFixed(0)}M` : 'its median'
                    })()} — largely because plots are bigger (~500 sq yd).
                    P6 sits around {(() => {
                      const p6 = sizeVsPriceData.find(d => d.precinct.endsWith('_6'))
                      return p6 ? `PKR ${(p6.median_price/1_000_000).toFixed(0)}M` : 'its median'
                    })()} and P8 around {(() => {
                      const p8 = sizeVsPriceData.find(d => d.precinct.endsWith('_8'))
                      return p8 ? `PKR ${(p8.median_price/1_000_000).toFixed(0)}M` : 'its median'
                    })()}, with P8 generally pricing higher per unit. The vertical spread within each precinct is the
                    “noise” — finishes, street/park/corner, and seller expectations. Green dots are the ones worth a closer look.
                  </p>
                </div>
              )}
            </div>
          )}

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
        <div className="space-y-6 text-slate-300">
          <div>
            <p className="mb-3">
              <strong>1. Building a house in BTK costs less about "luck" and more about math.</strong>
            </p>
            <p>
              Once you strip away land value and seller drama, construction costs settle into a surprisingly tight band — roughly 70k–80k PKR per sq yd across all three precincts. That consistency is useful: it tells you that quality and materials aren't swinging wildly. The noise in the market comes from everything around the house — location, expectations, and personality — not the structure itself.
            </p>
          </div>

          <div>
            <p className="mb-3">
              <strong>2. Precincts behave differently — some like orderly markets, others like Karachi.</strong>
            </p>
            <p>
              Precinct 6 prices homes the way a spreadsheet would: size explains price cleanly. Precinct 8… doesn't. It's messier, more emotional, more local. In a disciplined market, underpriced homes pop out immediately. In a noisy one, you have to think harder about why something looks cheap.
            </p>
          </div>

          <div>
            <p className="mb-3">
              <strong>3. "Bargains" aren't rare — but they're rarely random.</strong>
            </p>
            <p>
              About one in four homes in this sample is genuinely underpriced relative to its neighbours. That doesn't mean 24% are great deals — many of the extreme outliers are unfinished shells — but it shows you don't need to scroll Zameen like a zombie to find opportunities. You can measure mispricing.
            </p>
          </div>

          <div>
            <p className="mb-3">
              <strong>4. The framework generalizes — you can point it at any precinct or city.</strong>
            </p>
            <p>
              Swap in another neighbourhood's listings, rerun the pipeline, and you'll get the same three layers of insight: the real cost of building, how rational the market is, and where the anomalies live. It's a reusable engine for understanding any real estate market with enough data — not just BTK.
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
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Implied Construction Cost (Plain English)</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex gap-3">
                <span className="text-sky-500 flex-shrink-0">▪</span>
                <span>Typical plot price per sq yd: compute the precinct’s median from plot listings.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-sky-500 flex-shrink-0">▪</span>
                <span>For each finished house: (house price ÷ size) − (typical plot price) = implied construction cost per sq yd.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-sky-500 flex-shrink-0">▪</span>
                <span>Summarize p25/median/p75 across houses in that precinct.</span>
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
