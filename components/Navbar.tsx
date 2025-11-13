"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/zameen", label: "Zameen" },
  { href: "/manutd", label: "Man Utd" },
  { href: "/races", label: "Races" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-slate-900 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-sm font-semibold tracking-[0.2em] text-slate-300 uppercase">
            Saad Khan
          </span>
          <span className="hidden text-xs text-slate-500 sm:inline">
            Data · Strategy · Build
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-6 text-sm sm:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "border-b-2 pb-1 transition-colors " +
                  (active
                    ? "border-sky-400 text-sky-300"
                    : "border-transparent text-slate-400 hover:text-slate-100")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile */}
        <button
          className="sm:hidden text-slate-300"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-900 bg-slate-950 sm:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-4 py-3 text-sm">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    "py-1 " +
                    (active
                      ? "text-sky-300"
                      : "text-slate-400 hover:text-slate-100")
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
