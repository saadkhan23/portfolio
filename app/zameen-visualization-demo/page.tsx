import {
  OptionA_PrecinctTabs,
  OptionB_ComparisonMatrix,
  OptionC_InteractiveToggle,
} from '@/components/zameen/PrecinctVisualizationOptions'

export default function VisualizationDemo() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <a href="/" className="font-bold text-lg text-slate-900">
            ← Back to Home
          </a>
        </div>
      </nav>

      <main className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Precinct Visualization Options</h1>
            <p className="text-xl text-slate-600">
              Compare the 3 designs below. Which one do you prefer for showing precinct-by-precinct statistics?
            </p>
          </div>

          {/* Option A */}
          <div className="mb-24 pb-12 border-b border-slate-200">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-slate-900">Option A: Precinct Selector Tabs</h2>
              <p className="text-slate-600">
                Click tabs to view one precinct at a time. Good for focused storytelling, clean interaction.
              </p>
            </div>
            <OptionA_PrecinctTabs />
          </div>

          {/* Option B */}
          <div className="mb-24 pb-12 border-b border-slate-200">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-slate-900">Option B: Comparison Matrix</h2>
              <p className="text-slate-600">
                All precincts displayed side-by-side. Great for quick comparison, everything visible at once.
              </p>
            </div>
            <OptionB_ComparisonMatrix />
          </div>

          {/* Option C */}
          <div className="mb-24">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-slate-900">Option C: Interactive Toggle Metrics</h2>
              <p className="text-slate-600">
                Dropdown to switch between metrics. Visual bar charts show how metrics compare across precincts.
              </p>
            </div>
            <OptionC_InteractiveToggle />
          </div>

          {/* Selection Guide */}
          <div className="mt-20 pt-12 border-t border-slate-200">
            <h3 className="text-2xl font-bold mb-6 text-slate-900">Which appeals to you?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-slate-200 p-6 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-2">Option A</h4>
                <p className="text-sm text-slate-600">Best for: Minimal, focused narrative flow</p>
              </div>
              <div className="border border-slate-200 p-6 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-2">Option B</h4>
                <p className="text-sm text-slate-600">Best for: Quick comparison, all info visible</p>
              </div>
              <div className="border border-slate-200 p-6 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-2">Option C</h4>
                <p className="text-sm text-slate-600">Best for: Exploring different metrics</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
