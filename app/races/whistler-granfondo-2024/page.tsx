import { FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'

export default function WhistlerGranfondoPage() {
  const raceStats = [
    { label: 'Event', value: 'Whistler Granfondo' },
    { label: 'Date', value: 'September 2024' },
    { label: 'Location', value: 'Whistler, BC' },
    { label: 'Terrain', value: 'Mountains & Climbs' },
  ]

  const stravaMetrics = [
    { key: 'Distance', value: '121 km', note: 'Long course' },
    { key: 'Total Elevation', value: '2,300m', note: 'Sustained climbing' },
    { key: 'Avg Speed', value: '24.2 km/h', note: 'Tempo pace on mountains' },
    { key: 'Avg Heart Rate', value: '162 bpm', note: 'Threshold effort' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-slate-200 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
            <FiArrowLeft size={18} /> Back
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Whistler Granfondo 2024</h1>
          <p className="text-xl text-slate-600">
            A challenging mountain cycling granfondo in the Whistler peaks.
          </p>
        </div>
      </section>

      {/* Strava Link */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="https://www.strava.com/athletes/90977345"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:border-slate-400 transition-colors text-slate-900 font-medium"
          >
            View on Strava →
          </a>
        </div>
      </section>

      {/* Race Overview Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {raceStats.map((stat, idx) => (
              <div key={idx} className="border border-slate-200 p-5 rounded-lg text-center">
                <p className="text-slate-600 text-xs uppercase tracking-wider mb-2">{stat.label}</p>
                <p className="text-lg font-bold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strava Metrics */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Strava Data</h2>
          <div className="border border-slate-200 p-6 rounded-lg">
            <div className="space-y-4">
              {stravaMetrics.map((metric, idx) => (
                <div key={idx} className="flex justify-between items-start pb-4 border-b border-slate-100 last:border-b-0 last:pb-0">
                  <div>
                    <p className="text-sm text-slate-500 uppercase tracking-wider mb-1">{metric.key}</p>
                    {metric.note && <p className="text-xs text-slate-500">{metric.note}</p>}
                  </div>
                  <p className="font-bold text-slate-900">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Picture Placeholder */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
            <p className="text-slate-600">Race photos from Whistler will go here</p>
          </div>
        </div>
      </section>

      {/* Race Narrative */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Race Narrative</h2>
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              The Whistler Granfondo is one of Canada's premier cycling mass-participation events. Set in the stunning mountain terrain of Whistler Blackcomb, it combines scenic beauty with serious climbing challenges.
            </p>
            <p>
              This event built on the cycling fitness developed during Ironman training. The mountain environment presents different challenges—sustained climbing, technical descents, and high elevation. It was an opportunity to push beyond triathlon cycling and experience pure mountain cycling.
            </p>
            <p>
              Granfondos are unique in that they're competitive but community-focused. Thousands of riders of all abilities participate, creating an environment of shared challenge and mutual respect.
            </p>
          </div>
        </div>
      </section>

      {/* Lessons Learned */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Key Learnings</h2>
          <div className="space-y-4">
            <div className="border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Pacing matters on sustained climbs.</h3>
              <p className="text-slate-600">Mountain cycling teaches you to manage effort strategically over long climbs rather than attacking early.</p>
            </div>
            <div className="border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Community in suffering is powerful.</h3>
              <p className="text-slate-600">Granfondos create an environment where everyone is pushing their limits. That shared experience makes the challenge feel meaningful.</p>
            </div>
            <div className="border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Technical terrain demands focus.</h3>
              <p className="text-slate-600">Descents and technical sections require presence. You can't coast mentally the way you might on flat terrain.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
