import Link from 'next/link'
import { FiArrowRight, FiBarChart2, FiCode, FiStar } from 'react-icons/fi'

export default function Home() {
  const projects: Array<{
    title: string
    description: string
    stats: string
    href: string
    tags: string[]
    icon: string
    disabled?: boolean
  }> = [
    {
      title: 'Zameen Real Estate Analysis',
      description: 'Data pipeline for scraping, analyzing, and visualizing Pakistan real estate market data. Built with Playwright, Pandas, and interactive charts.',
      stats: '202 properties | 3 precincts | Construction cost analysis',
      href: '/zameen',
      tags: ['Data Engineering', 'Web Scraping', 'Analysis', 'Visualization'],
      icon: '📊',
    },
    {
      title: 'Why Manchester United Sucks',
      description: 'Interactive analysis of Manchester United\'s decline since 2013. Exploring attacking edge, performance metrics, and what went wrong with togglable visualizations.',
      stats: '26 seasons | 50+ teams | Interactive scatterplots',
      href: '/manutd',
      tags: ['Sports Analytics', 'Interactive Viz', 'Data Storytelling', 'React'],
      icon: '⚽',
    },
  ]

  const races = [
    {
      title: 'Ironman 70.3 Victoria',
      description: 'Completed a full sprint triathlon in Victoria, BC. Swim, bike, run across 7 hours 35 minutes with training insights.',
      stats: '1.9km swim | 90km bike | 21.1km run | May 2024',
      href: '/races/ironman-70-3-victoria',
      tags: ['Triathlon', 'Endurance', 'Training', 'Strava'],
      icon: '🏃',
    },
    {
      title: 'Whistler Granfondo 2024',
      description: 'Alpine cycling challenge through the Whistler trails. 121km with 2,300m elevation gain testing endurance and climbing ability.',
      stats: '121km | 2,300m elevation | 24.2 km/h avg | September 2024',
      href: '/races/whistler-granfondo-2024',
      tags: ['Cycling', 'Mountain Biking', 'Endurance'],
      icon: '🚴',
    },
    {
      title: 'Canada Day 2km Open Water Swim',
      description: 'Post-Ironman training swim in open water. Building ocean swimming skills and confidence in natural water environments.',
      stats: '2km open water | Training focus | Strava linked',
      href: '/races/canada-day-2km-swim',
      tags: ['Swimming', 'Open Water', 'Training'],
      icon: '🏊',
    },
  ]

  const skills = [
    { category: 'Data Engineering', items: ['Web Scraping', 'Pandas', 'SQL', 'ETL Pipelines'] },
    { category: 'Analysis', items: ['Statistical Analysis', 'Data Visualization', 'Business Insights', 'Market Analysis'] },
    { category: 'Web Development', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Tools & Platforms', items: ['Playwright', 'Excel/VBA', 'GitHub', 'Vercel'] },
  ]

  return (
    <>
      {/* Hero Section - Bold Minimalist */}
      <section className="relative pt-20 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100"></div>

        {/* Large geometric circle - top right */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-slate-200 to-slate-100 rounded-full opacity-20 blur-3xl"></div>

        {/* Large geometric circle - bottom left */}
        <div className="absolute -bottom-20 -left-40 w-80 h-80 bg-gradient-to-tr from-slate-100 to-slate-50 rounded-full opacity-15 blur-3xl"></div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bold Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Build from First Principles
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl">
            I build data pipelines, uncover insights, and communicate findings with clarity. From scraping to visualization, I help you understand what your data really means.
          </p>

          {/* CTAs - Minimal Style */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/zameen"
              className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              View My Work <FiArrowRight size={20} />
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 border-2 border-slate-900 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Featured Projects</h2>
            <p className="text-lg text-slate-600">
              Data-driven projects showcasing full-stack capabilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <Link
                key={idx}
                href={project.href}
                className={`group border border-slate-200 p-8 rounded-lg transition-all ${
                  project.disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-slate-400 hover:shadow-md cursor-pointer'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{project.icon}</div>
                  {!project.disabled && <FiArrowRight className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" size={20} />}
                </div>

                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-slate-700 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-600 mb-4">{project.description}</p>

                <p className="text-sm text-slate-500 mb-4 font-mono">
                  {project.stats}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Races & Extracurricular Section */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Races & Endurance Activities</h2>
            <p className="text-lg text-slate-600">
              Beyond data and code — triathlon, cycling, and open water swimming challenges
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {races.map((race, idx) => (
              <Link
                key={idx}
                href={race.href}
                className="group border border-slate-200 p-8 rounded-lg transition-all bg-white hover:border-slate-400 hover:shadow-md cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{race.icon}</div>
                  <FiArrowRight className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" size={20} />
                </div>

                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-slate-700 transition-colors">
                  {race.title}
                </h3>

                <p className="text-slate-600 mb-4">{race.description}</p>

                <p className="text-sm text-slate-500 mb-4 font-mono">
                  {race.stats}
                </p>

                <div className="flex flex-wrap gap-2">
                  {race.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Skills & Technologies</h2>
            <p className="text-lg text-slate-600">
              Tools and frameworks I use to build solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="border border-slate-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900">
                  <FiStar className="text-slate-900" size={20} />
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-2 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-12 text-center border-2 border-slate-900 rounded-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
              Ready to explore?
            </h2>
            <p className="text-lg mb-8 text-slate-600">
              Check out my Zameen real estate analysis project to see data engineering and visualization in action.
            </p>
            <Link
              href="/zameen"
              className="inline-block px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
            >
              View Analysis →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
