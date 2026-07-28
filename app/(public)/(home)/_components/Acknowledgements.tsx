import { DarkMosaic } from "@/public/images";
import { Crown, Map, Star, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Acknowledgement = {
  icon: LucideIcon;
  label: string;
};

const acknowledgements: Acknowledgement[] = [
  {
    icon: Crown,
    label: `${new Date().getFullYear() - 2020}+ years of experience`,
  },
  { icon: Users, label: "100+ satisfied clients" },
  { icon: Map, label: "Serving all of Massachusetts" },
  { icon: Star, label: "Multiple five star ratings" },
];

export default function Acknowledgements() {
  return (
    <section
      aria-labelledby="acknowledgements-heading"
      className="relative z-10 w-full bg-rule bg-center"
      style={{ backgroundImage: `url(${DarkMosaic.src})` }}
    >
      {/* Scrim over the mosaic. Without it the effective contrast of the
          labels changes tile to tile — this pins the ground dark enough
          that white text clears AA everywhere on the pattern. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ink-950/30 dark:bg-ink-950/40"
      />

      <h2 id="acknowledgements-heading" className="sr-only">
        Credentials
      </h2>

      <ul className="shell relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {acknowledgements.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex flex-col items-center justify-center gap-4 border-b border-white/25 px-6 py-12 text-center md:py-16 lg:border-b-0 lg:border-l lg:last:border-r"
          >
            <Icon aria-hidden="true" className="h-8 w-8 text-white" />
            <p className="max-w-[16ch] text-balance font-bold leading-snug text-white">
              {label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
