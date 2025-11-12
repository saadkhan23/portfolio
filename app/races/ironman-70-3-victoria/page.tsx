import { FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'

export default function Ironman70Page() {
  const raceStats = [
    { label: 'Race Date', value: 'May 26, 2024' },
    { label: 'Total Time', value: '7h 35m' },
    { label: 'Location', value: 'Victoria, BC' },
    { label: 'Distance', value: '70.3 miles' },
  ]

  const segmentStats = [
    { segment: 'Swim', distance: '1.9 km', time: '57 mins', note: 'Open water' },
    { segment: 'Bike', distance: '90 km', time: '3h 57m', note: 'Cold & wet conditions' },
    { segment: 'Run', distance: '21.1 km', time: '2h 22m', note: 'Mental challenge' },
  ]

  const stravaMetrics = [
    { category: 'Swim', metrics: [{ key: 'HR', value: '~140 bpm', note: 'Cold water adaptation' }, { key: 'Time', value: '57m', note: 'Breathing issues early' }] },
    { category: 'Bike', metrics: [{ key: 'Avg Speed', value: '22.7 km/h', note: 'Strong pace despite conditions' }, { key: 'HR', value: '~155 bpm', note: 'Tempo effort' }, { key: 'Issue', value: 'Flat tire', note: 'Lost ~15 minutes' }] },
    { category: 'Run', metrics: [{ key: 'Avg Pace', value: '6:45 min/km', note: 'Stronger than expected' }, { key: 'HR', value: '~165 bpm', note: 'Aerobic work' }, { key: 'Cramps', value: 'Managed well', note: 'Mental >Physical' }] },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-slate-200 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
            <FiArrowLeft size={18} /> Back
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Ironman 70.3 Victoria</h1>
          <p className="text-xl text-slate-600">
            My first triathlon. A lesson in pain, mental toughness, and the limits of training.
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
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segment Breakdown */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Race Segments</h2>
          <div className="space-y-4">
            {segmentStats.map((segment, idx) => (
              <div key={idx} className="border border-slate-200 p-6 rounded-lg">
                <div className="grid md:grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Segment</p>
                    <p className="font-bold text-slate-900">{segment.segment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Distance</p>
                    <p className="font-bold text-slate-900">{segment.distance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Time</p>
                    <p className="font-bold text-slate-900">{segment.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Notes</p>
                    <p className="text-slate-600 text-sm">{segment.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strava Metrics */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Strava Data</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {stravaMetrics.map((sport, idx) => (
              <div key={idx} className="border border-slate-200 p-6 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-4">{sport.category}</h3>
                <div className="space-y-4">
                  {sport.metrics.map((metric, midx) => (
                    <div key={midx} className="border-t border-slate-100 pt-3 first:border-t-0 first:pt-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-xs text-slate-500 uppercase">{metric.key}</span>
                        <span className="font-bold text-slate-900">{metric.value}</span>
                      </div>
                      <p className="text-xs text-slate-500">{metric.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Picture Placeholder */}
      <section className="py-12 md:py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
            <p className="text-slate-600">Race photos will go here</p>
          </div>
        </div>
      </section>

      {/* Race Narrative */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Race Narrative</h2>
          <div className="space-y-8 text-slate-600">
            <div>
              <h3 className="font-bold text-slate-900 mb-3">Going In</h3>
              <p className="leading-relaxed">
                I never expected to train for a triathlon. I was very rusty with swimming, didn't really have much experience with cycling, and I (still) don't enjoy running much. On top of that, I was recovering from a nasty concussion from a car accident which made training complicated.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-3">Why Do This?</h3>
              <p className="leading-relaxed mb-4">
                I enjoy the discipline and the mental toughness that endurance racing demands. In training for this race, I realized that fitness is only part of the challenge. It's your capacity to <strong>endure pain</strong> that determines how fast you can go. This translates into daily life: How much pain are we willing to endure?
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-3">The Swim (57 mins)</h3>
              <p className="leading-relaxed mb-3">
                Swimming in open water is a completely different beast. The water is cold, choppy, and visibility is poor. The hardest part of the swim happens during the race—when all participants get in the water. There's a mismatch of fast and slow swimmers. People will swim over you, people might kick you, people might pull you. It's pure chaos coupled with adrenaline.
              </p>
              <p className="leading-relaxed">
                I struggled in the first 300-400m to breathe because of the cold. I had to swim on my back for a few minutes. Eventually, something clicked and I was able to regulate my breathing. That was a big confidence booster for what was yet to come.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-3">The Bike (3h 57m)</h3>
              <p className="leading-relaxed mb-3">
                Biking was fun, especially right after the swim. My transition swim → bike took 11 minutes, which is really poor. The weather was quite cold and wet this year (2022 and 2023 were relatively warm).
              </p>
              <p className="leading-relaxed">
                I had a flat tyre early on and struggled to patch it myself. I lost about 15 minutes waiting for a race warden to help. Why? Cold hands. I lost my CO2 canister because I didn't tighten it properly on my wheel. Lesson: practice transitions and carb load more than necessary.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-3">The Run (2h 22m) - Trail Run</h3>
              <p className="leading-relaxed mb-3">
                Running after a 90km bike wasn't bad. The run course is a trail run, which adds technical complexity. I didn't train much for the run portion. I'd never run a half-marathon before this race, so I expected to problem-solve and manage my mental blocks as the race progressed.
              </p>
              <p className="leading-relaxed">
                I managed cramping pretty well considering I didn't have experience at this distance. The trail terrain kept me engaged—technical footing forces you to stay present. I could have carb-loaded more during the bike, especially in the final hour of my ride. Running is mostly mental, at least for me. My mental block is around the 6km and 14km marks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons Learned */}
      <section className="py-12 md:py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Key Learnings</h2>
          <div className="space-y-4">
            <div className="border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Pain is the primary variable in endurance.</h3>
              <p className="text-slate-600">Fitness matters, but capacity to endure pain is the limiting factor. This applies far beyond triathlon.</p>
            </div>
            <div className="border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Mental toughness compounds.</h3>
              <p className="text-slate-600">Every small victory (controlling breathing in cold water, pushing through fatigue) builds confidence for the next challenge.</p>
            </div>
            <div className="border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">Details matter in execution.</h3>
              <p className="text-slate-600">Losing 15 minutes to a flat tyre on something preventable (tight CO2 canister) shows that small prep details prevent big problems.</p>
            </div>
            <div className="border border-slate-200 p-6 rounded-lg">
              <h3 className="font-bold text-slate-900 mb-2">You're often stronger than you think.</h3>
              <p className="text-slate-600">Running a strong half-marathon with minimal training surprised me. Sometimes the real limit is in the mind, not the legs.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
