import { FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'

export default function CanadaDaySwimPage() {
  const raceStats = [
    { label: 'Event', value: 'Canada Day 2km Open Water Swim' },
    { label: 'Date', value: 'July 1, 2024' },
    { label: 'Location', value: 'Open Water' },
    { label: 'Distance', value: '2 km' },
  ]

  const stravaMetrics = [
    { key: 'Distance', value: '2.0 km' },
    { key: 'Time', value: 'Recorded on Strava', note: 'HR and pace data pending' },
    { key: 'Condition', value: 'Open Water', note: 'Post-Ironman training' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-slate-200 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
            <FiArrowLeft size={18} /> Back
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Canada Day 2km Open Water Swim</h1>
          <p className="text-xl text-slate-600">A post-Ironman open water swim challenge on Canada Day.</p>
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
            <p className="text-slate-600">Race/event photos will go here</p>
          </div>
        </div>
      </section>

      {/* Race Narrative */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Race Narrative</h2>
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              This 2km open water swim on Canada Day came shortly after completing the Ironman 70.3 Victoria. It was an opportunity to continue building confidence in open water and push my swimming further.
            </p>
            <p>
              Coming off the Ironman, I had a better sense of my open water capabilities and pacing. The focus was on steady effort rather than racing hard—treating it as a training effort in a competitive environment.
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
              <h3 className="font-bold text-slate-900 mb-2">Confidence builds with repetition in open water.</h3>
              <p className="text-slate-600">Each swim in open water makes the next one feel less intimidating.</p>
            </div>
            <div className="border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Training and racing aren't always the same.</h3>
              <p className="text-slate-600">Sometimes the best approach is to treat a competitive event as a training opportunity rather than trying to peak.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
