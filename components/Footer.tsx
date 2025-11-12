import Link from 'next/link'
import { FiGithub, FiMail } from 'react-icons/fi'
import { BsLinkedin } from 'react-icons/bs'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4">About</h3>
            <p className="text-sm text-slate-400">
              Data engineer and strategy enthusiast. Building projects that solve real problems with data-driven insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Projects</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/zameen" className="text-slate-400 hover:text-white transition-colors">
                  Zameen Real Estate Analysis
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  More Coming Soon
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/saadkhan23"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/saad-khan-86939469/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <BsLinkedin size={24} />
              </a>
              <a
                href="mailto:saad.khaan@live.com"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <FiMail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <p className="text-center text-sm text-slate-400">
            &copy; {currentYear} Saad Khan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
