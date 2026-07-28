import Link from "next/link";
import ContactMeBtn from "@/components/_shared/ContactMeBtn";
import Picture from "@/components/_shared/Picture";
import { SERVICES } from "@/app/(public)/services/_constants/services.constants";

export default function ServicesPage() {
  return (
    <div className="bg-background">
      <header className="shell pb-12 pt-20 md:pb-16 md:pt-28 lg:pt-36">
        <p className="flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          What I do
          <span aria-hidden="true" className="h-px w-14 bg-rule" />
        </p>

        <h1 className="mt-7 text-[clamp(2.75rem,9vw,6rem)] font-medium uppercase leading-[0.88] tracking-tight text-foreground">
          Services
        </h1>

        <p className="mt-8 max-w-[42ch] text-lg leading-relaxed text-muted-foreground">
          The only Realtor&reg; you will ever want.
        </p>
      </header>

      <div className="shell grid grid-cols-1 gap-y-10 border-t border-border pt-10 lg:grid-cols-12 lg:gap-x-16 lg:pt-16">
        {/* Persistent index. Horizontal above lg, pinned rail beyond it. */}
        <nav
          aria-label="Services"
          className="lg:sticky lg:top-28 lg:col-span-3 lg:self-start"
        >
          <p className="hidden text-xs font-semibold uppercase tracking-[0.28em] text-subtle-foreground lg:block">
            Index
          </p>

          <ul className="-mx-4 flex gap-6 overflow-x-auto px-4 pb-2 lg:mx-0 lg:mt-6 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
            {SERVICES.map((service) => (
              <li
                key={service.id}
                className="shrink-0 lg:shrink lg:border-t lg:border-border lg:first:border-t-0"
              >
                <Link
                  href={`#${service.id}`}
                  className="group flex min-h-11 items-center gap-3 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring lg:min-h-0 lg:whitespace-normal lg:py-4"
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-4 shrink-0 bg-rule transition-all duration-300 ease-out group-hover:w-8 group-focus-visible:w-8"
                  />
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 hidden border-t border-border pt-6 lg:block">
            <p className="max-w-[24ch] text-sm leading-relaxed text-muted-foreground">
              Not sure which applies? Start a conversation and we&rsquo;ll work
              it out together.
            </p>
            <div className="mt-5">
              <ContactMeBtn />
            </div>
          </div>
        </nav>

        {/* Detail column */}
        <div className="flex flex-col lg:col-span-9">
          {SERVICES.map((service, i) => (
            <section
              key={service.id}
              id={service.id}
              aria-labelledby={`${service.id}-heading`}
              className={`scroll-mt-28 py-12 md:py-16 ${
                i > 0 ? "border-t border-border" : "pt-0 lg:pt-0"
              }`}
            >
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-5">
                  <p className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                    {service.eyebrow}
                    <span aria-hidden="true" className="h-px w-8 bg-rule" />
                  </p>

                  <h2
                    id={`${service.id}-heading`}
                    className="mt-5 text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium uppercase leading-[0.95] tracking-tight text-foreground"
                  >
                    {service.title}
                  </h2>

                  <Picture
                    src={service.image}
                    alt=""
                    className="mt-8 aspect-4/3 w-full rounded-card object-cover"
                    priority={i === 0}
                  />
                </div>

                <div className="md:col-span-7">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {service.intro}
                  </p>

                  <ul className="mt-8 border-b border-border">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="border-t border-border py-4 text-sm leading-relaxed text-foreground"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 lg:hidden">
                    <ContactMeBtn />
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="h-20 md:h-28" />
    </div>
  );
}
