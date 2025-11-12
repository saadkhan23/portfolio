'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiArrowLeft, FiChevronDown } from 'react-icons/fi'
import { AttackingEdgeScatter } from '@/components/manutd/AttackingEdgeScatter'
import { PerformanceVsExpectedScatter } from '@/components/manutd/PerformanceVsExpectedScatter'
import { ManUtdTimeline } from '@/components/manutd/ManUtdTimeline'

interface AttackingData {
  attacking_edge: any[]
  performance_vs_expected: any[]
  man_utd_timeline: any[]
  rivals_comparison: any[]
}

export default function ManUtdPage() {
  const [data, setData] = useState<AttackingData | null>(null)
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    attacking_edge: true,
    performance: false,
    timeline: false,
    narrative: false
  })

  useEffect(() => {
    // Load attacking analysis data
    fetch('/data/attacking_analysis.json')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error('Failed to load data:', err))
  }, [])

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-slate-200 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
            <FiArrowLeft size={18} /> Back
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Why Manchester United Sucks</h1>
          <p className="text-xl text-slate-600 mb-6">
            A data-driven analysis of Manchester United's decline since 2013. Breaking down attacking prowess, defensive stability, and what went wrong.
          </p>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-slate-200 p-5 rounded-lg text-center">
              <div className="text-3xl mb-2">📉</div>
              <p className="text-xl font-bold text-slate-900">-23%</p>
              <p className="text-slate-600 text-xs mt-1">Goals per game decline</p>
            </div>
            <div className="border border-slate-200 p-5 rounded-lg text-center">
              <div className="text-3xl mb-2">🔴</div>
              <p className="text-xl font-bold text-slate-900">#5</p>
              <p className="text-slate-600 text-xs mt-1">Fallen from #1 ranking</p>
            </div>
            <div className="border border-slate-200 p-5 rounded-lg text-center">
              <div className="text-3xl mb-2">👔</div>
              <p className="text-xl font-bold text-slate-900">7</p>
              <p className="text-slate-600 text-xs mt-1">Managers since Ferguson</p>
            </div>
            <div className="border border-slate-200 p-5 rounded-lg text-center">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-xl font-bold text-slate-900">26</p>
              <p className="text-slate-600 text-xs mt-1">Seasons analyzed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Togglable Sections */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Overview Section */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('overview')}
              className="w-full p-6 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
            >
              <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
              <FiChevronDown
                className={`transition-transform ${expandedSections.overview ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSections.overview && (
              <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  Manchester United's decline since Sir Alex Ferguson's retirement in 2013 isn't perception—it's statistical fact.
                  While rivals evolved and thrived, Man Utd has stagnated, fallen behind, and struggled to establish a consistent identity.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  This analysis uses 26 seasons of Premier League data to show what changed. Not just that performance dropped, but
                  <strong> why</strong>—examining attacking output, defensive stability, and the impact of managerial instability.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white p-4 rounded border border-slate-200">
                    <p className="font-bold text-slate-900 mb-2">The Ferguson Era (2000-2013)</p>
                    <p className="text-sm text-slate-600">1.925 goals per game. Consistently the most potent attacking force in the Premier League.</p>
                  </div>
                  <div className="bg-white p-4 rounded border border-slate-200">
                    <p className="font-bold text-slate-900 mb-2">Post-Ferguson (2014-2025)</p>
                    <p className="text-sm text-slate-600">1.482 goals per game. 23% decline. Fell from #1 to #5 among rivals.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Attacking Edge Section */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('attacking_edge')}
              className="w-full p-6 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
            >
              <h2 className="text-2xl font-bold text-slate-900">Attacking Edge (2024-25)</h2>
              <FiChevronDown
                className={`transition-transform ${expandedSections.attacking_edge ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSections.attacking_edge && (
              <div className="p-6 border-t border-slate-200 bg-slate-50">
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Progressive carries show how effectively a team moves the ball upfield. More carries should correlate with more goals.
                  Man Utd's position here reveals the attacking problem: lots of ball progression but insufficient conversion into goals.
                </p>
                {data && data.attacking_edge.length > 0 ? (
                  <AttackingEdgeScatter data={data.attacking_edge} />
                ) : (
                  <div className="h-96 flex items-center justify-center text-slate-500">Loading chart...</div>
                )}
                <p className="text-sm text-slate-500 mt-6 italic">
                  Red point: Manchester United. Gray points: Other Premier League teams. Higher is better.
                </p>
              </div>
            )}
          </div>

          {/* Performance vs Expected Section */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('performance')}
              className="w-full p-6 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
            >
              <h2 className="text-2xl font-bold text-slate-900">Performance vs Expected (2024-25)</h2>
              <FiChevronDown
                className={`transition-transform ${expandedSections.performance ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSections.performance && (
              <div className="p-6 border-t border-slate-200 bg-slate-50">
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Expected Goals (xG) estimates how many goals a team should have scored based on shot quality.
                  If a team is below the diagonal line, they're underperforming their chances. Man Utd's position tells us:
                  we're not just lacking good chances, we're also wasting the ones we get.
                </p>
                {data && data.performance_vs_expected.length > 0 ? (
                  <PerformanceVsExpectedScatter data={data.performance_vs_expected} />
                ) : (
                  <div className="h-96 flex items-center justify-center text-slate-500">Loading chart...</div>
                )}
                <p className="text-sm text-slate-500 mt-6 italic">
                  Points above the diagonal line are overperforming xG. Below = underperforming.
                </p>
              </div>
            )}
          </div>

          {/* Timeline Section */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('timeline')}
              className="w-full p-6 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
            >
              <h2 className="text-2xl font-bold text-slate-900">The 25-Year Trajectory</h2>
              <FiChevronDown
                className={`transition-transform ${expandedSections.timeline ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSections.timeline && (
              <div className="p-6 border-t border-slate-200 bg-slate-50">
                <p className="text-slate-600 mb-6 leading-relaxed">
                  From 2000 to 2025, Man Utd's attacking output tells the story. The vertical line marks Ferguson's retirement.
                  Notice: the consistent level from 2000-2013, then the immediate collapse and the failure to recover.
                </p>
                {data && data.man_utd_timeline.length > 0 ? (
                  <ManUtdTimeline data={data.man_utd_timeline} />
                ) : (
                  <div className="h-96 flex items-center justify-center text-slate-500">Loading chart...</div>
                )}
                <p className="text-sm text-slate-500 mt-6 italic">
                  Red line: Actual goals scored. Gray dashed line: Expected goals (xG/90) from shot quality.
                </p>
              </div>
            )}
          </div>

          {/* Narrative Section */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('narrative')}
              className="w-full p-6 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
            >
              <h2 className="text-2xl font-bold text-slate-900">The Narrative: What Went Wrong?</h2>
              <FiChevronDown
                className={`transition-transform ${expandedSections.narrative ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
            {expandedSections.narrative && (
              <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">The Lost Attacking Edge</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Man Utd went from the most prolific attacking team in the Premier League to the 5th. The attacking decline isn't marginal—it's fundamental.
                    Our data shows that Man Utd aren't just unlucky; they're genuinely creating fewer goal-scoring opportunities and converting at a lower rate.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Managerial Instability Killed Coherence</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Seven managers in 12 years. Ferguson had 27 years to build a philosophy. Each successor brought different tactics,
                    different formations, different player preferences. The squad was never stable enough to build chemistry.
                    This directly impacted attacking efficiency.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Rivals Didn't Just Maintain—They Evolved</h3>
                  <p className="text-slate-600 leading-relaxed">
                    While Man Utd stagnated:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-1 mt-2 ml-2">
                    <li><strong>Man City</strong> improved attacking output by 52% under Guardiola</li>
                    <li><strong>Liverpool</strong> improved 22% under Klopp</li>
                    <li><strong>Arsenal</strong> maintained consistency with clear tactical direction</li>
                  </ul>
                  <p className="text-slate-600 leading-relaxed mt-4">
                    Man Utd's problem: reactive rather than proactive. Always chasing, never leading.
                  </p>
                </div>

                <div className="bg-white p-4 rounded border-l-4 border-red-500">
                  <p className="text-slate-900 font-bold mb-2">The Deeper Issue: Loss of Culture</p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Beyond tactics and metrics, Ferguson built a winning culture. Players believed. The club had identity.
                    Post-Ferguson, that evaporated. Without strategic direction and managerial stability, even talented squads
                    underperform. The data reflects this: lower attacking output, inconsistent defensive performance, constant reset.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-2">What Needs to Change?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Not another manager. Not another transfer window. Man Utd needs <strong>systematic overhaul</strong>:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-1 mt-2 ml-2">
                    <li>Clear, multi-year tactical philosophy (not changing every season)</li>
                    <li>Managerial stability with realistic performance expectations</li>
                    <li>Youth development and recruitment aligned with that philosophy</li>
                    <li>Rebuild attacking cohesion (the data shows this is where the gap is biggest)</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-12 border-2 border-slate-900 rounded-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Deep Dive Into the Data</h2>
            <p className="text-lg text-slate-600 mb-8">
              All analysis and visualizations built from 26 seasons of FBRef Premier League data. Source code available on GitHub.
            </p>
            <a
              href="https://github.com/saadkhan23/manutd_sucks_project"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
            >
              View on GitHub →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
