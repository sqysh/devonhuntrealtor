import ContactMeBtn from "@/components/_shared/ContactMeBtn";
import {
  FEATURED_TOWNS,
  TOWNS_BY_REGION,
} from "@/app/(public)/areas/_constants/areas.constants";

export default function Areas() {
  return (
    <div className="bg-background">
      <header className="shell pb-12 pt-20 md:pb-16 md:pt-28 lg:pt-36">
        <p className="flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          Where I work
          <span aria-hidden="true" className="h-px w-14 bg-rule" />
        </p>

        <h1 className="mt-7 text-[clamp(2.75rem,9vw,6rem)] font-medium uppercase leading-[0.88] tracking-tight text-foreground">
          Areas served
        </h1>

        <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
          Based in Marblehead and working the North Shore, Cape Ann, the
          Merrimack Valley, and the communities just north of Boston.
        </p>
      </header>

      {/* Tier one — towns with real depth behind them */}
      <section
        aria-labelledby="featured-heading"
        className="shell border-t border-border pt-12 md:pt-16"
      >
        <h2
          id="featured-heading"
          className="text-xs font-semibold uppercase tracking-[0.28em] text-subtle-foreground"
        >
          Towns I know best
        </h2>

        {/* Editorial rows: name left, read on the market right. Reads as
            a reference table rather than a set of clickable tiles. */}
        <ul className="mt-8 border-b border-border">
          {FEATURED_TOWNS.map((town) => (
            <li
              key={town.slug}
              className="grid grid-cols-1 gap-2 border-t border-border py-6 md:grid-cols-12 md:gap-8 md:py-7"
            >
              <h3 className="text-xl font-medium uppercase leading-tight tracking-tight text-foreground md:col-span-4 lg:text-2xl">
                {town.name}
              </h3>
              {town.blurb && (
                <p className="max-w-[68ch] text-sm leading-relaxed text-muted-foreground md:col-span-8">
                  {town.blurb}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Tier two — the wider footprint, names only */}
      <section
        aria-labelledby="regions-heading"
        className="shell mt-20 border-t border-border pt-12 md:mt-28 md:pt-16"
      >
        <h2
          id="regions-heading"
          className="text-xs font-semibold uppercase tracking-[0.28em] text-subtle-foreground"
        >
          Also serving
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {TOWNS_BY_REGION.map(({ region, label, towns }) => (
            <div key={region}>
              <h3 className="border-b-2 border-rule pb-3 text-sm font-bold uppercase tracking-[0.12em] text-foreground">
                {label}
              </h3>
              <ul>
                {towns.map((town) => (
                  <li
                    key={town.slug}
                    className="border-b border-border py-3 text-sm text-muted-foreground"
                  >
                    {town.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Tier three — the honest statewide note */}
      <section
        aria-labelledby="statewide-heading"
        className="shell my-20 md:my-28"
      >
        <div className="border-l-2 border-rule py-2 pl-6 md:pl-8">
          <h2
            id="statewide-heading"
            className="text-2xl font-medium uppercase leading-tight tracking-tight text-foreground md:text-3xl"
          >
            Don&rsquo;t see your town?
          </h2>
          <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-muted-foreground">
            I&rsquo;m licensed throughout Massachusetts. If you&rsquo;re buying
            or selling somewhere that isn&rsquo;t listed here, get in touch
            &mdash; I&rsquo;ll either work it myself or connect you with someone
            who knows that market cold.
          </p>
          <div className="mt-8">
            <ContactMeBtn />
          </div>
        </div>
      </section>
    </div>
  );
}
