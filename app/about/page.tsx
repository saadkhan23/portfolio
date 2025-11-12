export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">About Me</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
          I'm a data engineer and strategy enthusiast passionate about turning unstructured data into actionable
          business insights. I combine technical depth with operational thinking to build solutions that solve real
          problems.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">What I Do</h2>
        <p className="text-slate-600 mb-6">
          I specialize in building data pipelines that move from raw, messy web data to polished, insightful analysis.
          My approach:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-600 mb-6">
          <li>
            <strong>Identify the problem:</strong> What decision needs to be made? What data is missing?
          </li>
          <li>
            <strong>Engineer the solution:</strong> Build reliable pipelines that collect and process data ethically
          </li>
          <li>
            <strong>Analyze rigorously:</strong> Use statistical methods to extract true insights, not just surface
            patterns
          </li>
          <li>
            <strong>Present clearly:</strong> Communicate findings visually and with precision
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-12 mb-4">Technical Foundation</h2>
        <p className="text-slate-600 mb-6">
          I work across the full data stack: web scraping with Playwright, data processing with Pandas, statistical
          analysis, and modern web visualization with React/Next.js. I'm comfortable in Python, SQL, and JavaScript.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">Why Strategy & Operations?</h2>
        <p className="text-slate-600 mb-6">
          The best technology decisions come from understanding both the data and the business context. I'm drawn to
          Strategy & Operations roles because they sit at the intersection of technical capability and business impact.
          You get to use data rigorously while understanding the real-world constraints and opportunities.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">Current Focus</h2>
        <p className="text-slate-600">
          Building a portfolio of data projects that showcase full-stack capabilities: from problem identification
          through data collection, analysis, visualization, and communication. Each project is designed to tell a story
          about how better data leads to better decisions.
        </p>
      </div>

      <div className="mt-16 p-8 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-bold text-lg mb-2">Let's Connect</h3>
        <p className="text-slate-600 mb-4">
          Interested in data projects, strategy roles, or just want to chat about how to extract insights from messy
          data? I'd love to hear from you.
        </p>
        <a href="mailto:hello@example.com" className="text-blue-600 font-bold hover:underline">
          Send me an email
        </a>
      </div>
    </div>
  )
}
