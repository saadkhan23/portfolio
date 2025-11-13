import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Saad Khan. All rights reserved.</p>
        <div className="flex gap-4">
          <Link
            href="https://github.com/saadkhan23"
            className="hover:text-slate-200"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/saad-khan-86939469/"
            className="hover:text-slate-200"
          >
            LinkedIn
          </Link>
          <a href="mailto:saad.khaan@live.com" className="hover:text-slate-200">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
