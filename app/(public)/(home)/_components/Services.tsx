import Link from "next/link";
import { Building, Home, Key } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  href?: string;
};

const servicesData: Service[] = [
  {
    title: "Sell Property",
    desc: "Proven ability to market and sell properties through a customized, strategic plan, resulting in clients netting top dollar.",
    icon: Home,
    href: "/services#sell",
  },
  {
    title: "Buy Property",
    desc: "Expertise in guiding clients (including first time buyers) through the process with ease.",
    icon: Building,
    href: "/services#buy",
  },
  {
    title: "Rent Property",
    desc: "Helping those who seek alternatives to owning, find the best option.",
    icon: Key,
    href: "/services#rent",
  },
];

export default function Services() {
  return (
    <section
      aria-labelledby="services-heading"
      className="relative z-20 pb-20 pt-16 md:pb-28 md:pt-24 lg:pt-28"
    >
      <h2 id="services-heading" className="sr-only">
        Services
      </h2>

      <ul className="shell grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-14">
        {servicesData.map(({ icon: Icon, title, desc, href }) => (
          <li key={title}>
            <Link
              href={href ?? "/services"}
              className="group flex h-full flex-col rounded-control focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-ring"
            >
              {/* The rule is the whole interaction. It sits short at rest
                  and runs the column on hover — the header's sliding
                  underline, scaled up. */}
              <span
                aria-hidden="true"
                className="block h-0.5 w-16 bg-rule transition-[width] duration-500 ease-out group-hover:w-full group-focus-visible:w-full motion-reduce:transition-none"
              />

              <Icon
                aria-hidden="true"
                className="mt-8 h-6 w-6 text-subtle-foreground transition-colors duration-300 group-hover:text-rule group-focus-visible:text-rule"
                strokeWidth={1.5}
              />

              <h3 className="mt-6 text-2xl font-medium leading-tight tracking-tight text-foreground lg:text-[1.75rem]">
                {title}
              </h3>

              <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-muted-foreground">
                {desc}
              </p>

              <span className="mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                View service
                <span
                  aria-hidden="true"
                  className="h-px w-6 bg-rule transition-[width] duration-300 ease-out group-hover:w-10 group-focus-visible:w-10 motion-reduce:transition-none"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {/* Closes the block. Without a terminating edge the three columns
          just trail off into whatever section comes next. */}
      <div className="shell mt-20 md:mt-28">
        <span aria-hidden="true" className="block h-px w-full bg-border" />
      </div>
    </section>
  );
}
