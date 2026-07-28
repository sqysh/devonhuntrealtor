import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DarkMosaic } from "@/public/images";

const routes = [
  { href: "/services", label: "Services" },
  { href: "/areas", label: "Areas served" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About Devon" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col bg-background">
      <div className="shell flex flex-1 flex-col justify-center py-20 md:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground sm:gap-5">
              Error 404
              <span aria-hidden="true" className="h-px w-10 bg-rule sm:w-14" />
            </p>

            <h1 className="mt-6 text-[clamp(2.25rem,9vw,5.5rem)] font-medium uppercase leading-[0.88] tracking-tight text-foreground">
              Wrong
              <span className="block">address</span>
            </h1>

            <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-muted-foreground md:text-lg">
              This page isn&rsquo;t on the market. It may have moved, or the
              link may have a typo in it.
            </p>

            <Link
              href="/"
              className="group mt-10 inline-flex min-h-12 items-center gap-3 border border-rule px-7 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition-colors duration-200 hover:bg-rule hover:text-on-rule focus-visible:bg-rule focus-visible:text-on-rule focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-x-1 motion-reduce:transition-none"
              />
              Back home
            </Link>
          </div>

          {/* Textured panel. The mosaic sits under a scrim so the links keep
              a measurable contrast ratio across the pattern. */}
          <nav
            aria-label="Site pages"
            className="relative overflow-hidden rounded-card border-b-4 border-b-rule bg-rule bg-center lg:col-span-5"
            style={{ backgroundImage: `url(${DarkMosaic.src})` }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-ink-950/45 dark:bg-ink-950/55"
            />

            <div className="relative p-6 sm:p-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                Try one of these
              </h2>

              <ul className="mt-5 border-b border-white/20">
                {routes.map(({ href, label }) => (
                  <li key={href} className="border-t border-white/20">
                    <Link
                      href={href}
                      className="group flex min-h-14 items-center justify-between gap-4 text-base font-semibold text-white transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-lg"
                    >
                      {label}
                      <span
                        aria-hidden="true"
                        className="h-px w-6 shrink-0 bg-white/50 transition-all duration-300 ease-out group-hover:w-12 group-hover:bg-white group-focus-visible:w-12"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
