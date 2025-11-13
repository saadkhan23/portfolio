'use client'

import { useEffect, useState } from 'react'
import { ConstructionCostChartFromData } from '@/components/zameen/ConstructionCostChartFromData'
import { SizeVsPriceSummary } from '@/components/zameen/SizeVsPriceSummary'
import { BargainsSummary } from '@/components/zameen/BargainsSummary'
import { PrecinctComparison } from '@/components/zameen/PrecinctComparison'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

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
  const stats = [
    { label: 'Properties Analyzed', value: '202', icon: '🏠' },
    { label: 'Precincts Compared', value: '3', icon: '📍' },
    { label: 'Data Points Processed', value: '3,000+', icon: '📊' },
    { label: 'Construction Cost Range', value: 'PKR 70K-79K/sq yd', icon: '💰' },
  ]

  const keyFindings = [
    {
      title: 'Size Drives Cost',
      description:
        'Precinct 5 has 1.8x higher absolute construction costs (PKR 39.5M vs 21.8M) but only 23% higher per square yard. Property size, not location, is the primary cost driver.',
      icon: '📐',
    },
    {
      title: 'Similar Per-Unit Costs',
      description:
        'Construction costs per square yard are nearly identical across precincts (PKR 79-80K/sq yd), indicating uniform labor and material costs.',
      icon: '⚖️',
    },
    {
      title: 'Market Segmentation',
      description:
        'Precinct 5 attracts buyers seeking larger properties at premium prices, while Precincts 6 & 8 serve the mid-range market.',
      icon: '🎯',
    },
    {
      title: 'Bargain Detection',
      description:
        'Identified 8-12 underpriced properties per precinct (>10% below median), using statistical variance analysis.',
      icon: '🎁',
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-slate-200 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Zameen Real Estate Analysis</h1>
          <p className="text-xl text-slate-600 mb-6">
            Data pipeline for scraping, analyzing, and visualizing Pakistan's largest real estate marketplace
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/saadkhan23/zameen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
            >
              <FiGithub /> View Source
            </a>
            <a
              href="https://zameen.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-colors"
            >
              <FiExternalLink /> Visit Zameen.com
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="border border-slate-200 p-5 rounded-lg text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-slate-600 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Project Overview</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                This project demonstrates a complete data engineering pipeline from raw web data to actionable business insights. The Zameen.com scraper collects property listings, analyzes market trends, and identifies investment opportunities.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Key Technologies</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Playwright', 'Pandas', 'Excel', 'Python', 'Recharts', 'Next.js'].map((tech) => (
                    <span key={tech} className="px-3 py-2 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-slate-200 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6">Data Collection</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="text-slate-900 font-bold">✓</span>
                  <span>Headless browser scraping with Playwright</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-900 font-bold">✓</span>
                  <span>JSON parsing from embedded data</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-900 font-bold">✓</span>
                  <span>Anti-detection measures (random delays, user agents)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-900 font-bold">✓</span>
                  <span>202 properties across 3 precincts</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-900 font-bold">✓</span>
                  <span>Ethical, respectful scraping practices</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Data-Driven Analysis Section */}
      {loading ? (
        <section className="py-12 md:py-16 bg-white border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900 mb-4"></div>
                <p className="text-slate-600">Loading analysis…</p>
              </div>
            </div>
          </div>
        </section>
      ) : error ? (
        <section className="py-12 md:py-16 bg-white border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <p className="text-red-700 font-medium">Error loading analysis: {error}</p>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* 1. Construction Cost Analysis */}
          {constructionData && (
            <section className="py-12 md:py-16 bg-white border-t border-slate-200">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border border-slate-200 p-8 rounded-lg">
                  <ConstructionCostChartFromData data={constructionData} />
                </div>
              </div>
            </section>
          )}

          {/* 2. Size vs Price Analysis */}
          {sizeVsPriceData && (
            <section className="py-12 md:py-16 bg-white border-t border-slate-200">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border border-slate-200 p-8 rounded-lg">
                  <SizeVsPriceSummary data={sizeVsPriceData} />
                </div>
              </div>
            </section>
          )}

          {/* 3. Bargain Detection */}
          {bargainsSummary && topBargains && (
            <section className="py-12 md:py-16 bg-white border-t border-slate-200">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border border-slate-200 p-8 rounded-lg">
                  <BargainsSummary bargainsSummary={bargainsSummary} topBargains={topBargains} />
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Key Findings */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900">Key Findings</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {keyFindings.map((finding, idx) => (
              <div key={idx} className="border border-slate-200 p-6 rounded-lg">
                <div className="text-3xl mb-3">{finding.icon}</div>
                <h3 className="text-lg font-bold mb-2">{finding.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{finding.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Precinct Comparison */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Precinct Details</h2>
          <p className="text-slate-600 mb-8">Click on any precinct to see the price ranges and property size distribution.</p>
          <PrecinctComparison />
        </div>
      </section>

      {/* Write-up & Reflection */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Why This Project?</h2>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                Let's work from first principles. Real estate is one of the largest asset classes in Pakistan. Yet most investment decisions are made with incomplete information—reliance on brokers, gut feel, or "what others are doing."
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                I was curious: What if we looked at the data directly? What patterns could we uncover? Could we reduce the noise and identify where value actually exists? This project started as an attempt to answer those questions using Zameen.com—Pakistan's largest real estate marketplace.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900">What We Found</h2>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                The analysis revealed something important: <strong>size, not location, is the primary cost driver.</strong>
              </p>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                Precinct 5 has 1.8x higher absolute construction costs than Precincts 6 and 8, but only 23% higher per square yard costs. This suggests the precincts serve different buyer preferences—P5 attracts those seeking larger properties at premium prices, while P6 and P8 serve the mid-range segment.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Without data, you might assume location premiums reflect construction cost differences. The data shows otherwise—it's buyer segmentation driving the market.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900">What We've Learned</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Patterns require validation.</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Intuition says location matters in real estate. Data shows uniform per-unit costs across precincts. Intuition wasn't wrong—it was incomplete.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Market segmentation is real and measurable.</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Each precinct attracts different buyer profiles. Understanding these segments matters for investment strategy and pricing decisions.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Outliers are opportunities.</h3>
                  <p className="text-slate-600 leading-relaxed">
                    We identified 8-12 statistically underpriced properties per precinct (&gt;10% below median). The anomalies in data often point to where inefficiencies exist.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900">What's Next?</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We've started with Bahria Town Karachi. From here, the geographic footprint will expand to other developments and eventually other cities. The data pipeline is built for scale. This is version 1 of understanding Pakistan's real estate market systematically—through patterns, not assumptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900">Methodology</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-slate-200 p-6 rounded-lg">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-bold mb-3 text-slate-900">Data Collection</h3>
              <p className="text-slate-600 text-sm">
                Playwright headless browser with JSON parsing for reliable data extraction from JavaScript-rendered pages.
              </p>
            </div>
            <div className="border border-slate-200 p-6 rounded-lg">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-bold mb-3 text-slate-900">Statistical Analysis</h3>
              <p className="text-slate-600 text-sm">
                Median-based pricing (avoids outlier skew), size normalization for fair comparison, variance analysis for
                bargain detection.
              </p>
            </div>
            <div className="border border-slate-200 p-6 rounded-lg">
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-bold mb-3 text-slate-900">Cost Estimation</h3>
              <p className="text-slate-600 text-sm">
                Construction cost = (House Price - Plot Price) normalized by average property size for fair comparison.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-12 border-2 border-slate-900 rounded-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Want to Dive Deeper?</h2>
            <p className="text-lg text-slate-600 mb-8">
              View the complete project on GitHub including source code, detailed documentation, and raw data.
            </p>
            <a
              href="https://github.com/saadkhan23/zameen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Explore on GitHub →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
