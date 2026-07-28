import Picture from "@/components/_shared/Picture";
import ContactMeBtn from "@/components/_shared/ContactMeBtn";
import Acknowledgements from "../(home)/_components/Acknowledgements";

const atAGlance = [
  {
    label: "Designation",
    value: "Accredited Buyer's Representative (ABR\u00AE)",
  },
  { label: "Licensed", value: "Massachusetts" },
  { label: "Brokerage", value: "The Proper Nest Real Estate" },
  { label: "Based in", value: "Marblehead, MA" },
  { label: "Practicing since", value: "2020" },
  { label: "Clients served", value: "150+" },
  { label: "Off the clock", value: "Drummer" },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <header className="shell pb-12 pt-20 md:pb-16 md:pt-28 lg:pt-36">
        <p className="flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          About
          <span aria-hidden="true" className="h-px w-14 bg-rule" />
        </p>

        <h1 className="mt-7 text-[clamp(2.5rem,8vw,5.5rem)] font-medium uppercase leading-[0.88] tracking-tight text-foreground">
          Hello, I&rsquo;m
          <span className="block">Devon Hunt</span>
        </h1>

        <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
          Realtor&reg; you can trust.
        </p>
      </header>

      <section
        aria-labelledby="bio-heading"
        className="shell border-t border-border pt-12 md:pt-16"
      >
        <h2 id="bio-heading" className="sr-only">
          Biography
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
          <div className="md:col-span-5 lg:col-span-4">
            {/* No overflow clipping anywhere here — the tinted block sits
                behind Devon and starts below his head, so he stands in
                front of it rather than inside it. The hard bottom edge of
                the cutout lands on the pink rule, which reads as a floor. */}
            <div className="relative mx-auto w-full max-w-sm md:mx-0">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 top-16 rounded-card border-b-4 border-b-rule bg-primary-subtle sm:top-20"
              />

              {/* Bracket answering the frame, mirrored from the home page */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-5 -right-5 hidden h-36 w-36 sm:block"
              >
                <span className="absolute bottom-0 right-0 h-px w-full bg-rule/60" />
                <span className="absolute bottom-0 right-0 h-full w-px bg-rule/60" />
              </div>

              <Picture
                src="/images/devon-02.png"
                alt="Devon Hunt"
                className="relative z-10 h-auto w-full object-contain"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-7 lg:col-span-8">
            <div className="max-w-[62ch] space-y-6 text-base leading-relaxed text-muted-foreground">
              <p className="text-xl leading-snug text-foreground lg:text-2xl">
                I play drums in The Iron Roses. It sounds like it has nothing to
                do with real estate, but you learn to read a room fast, and you
                learn that the job is mostly listening.
              </p>
              <p>
                Since 2020 I&rsquo;ve helped more than 150 people buy, sell, and
                rent around Massachusetts. First-time buyers, families
                who&rsquo;ve outgrown their place, investors, and plenty of
                people who just wanted someone to tell them honestly whether a
                house was worth it.
              </p>
              <p>
                I&rsquo;m based in Marblehead and I know the North Shore, partly
                from working here and partly from years of hauling a kit into
                clubs up and down the coast. If you&rsquo;re somewhere else in
                the state, I&rsquo;ll travel, or I&rsquo;ll point you toward
                someone who really knows your area.
              </p>
            </div>
            <dl className="mt-12 border-b border-border">
              {atAGlance.map(({ label, value }) => (
                <div
                  key={label}
                  className="grid grid-cols-1 gap-1 border-t border-border py-4 sm:grid-cols-3 sm:gap-6"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-subtle-foreground">
                    {label}
                  </dt>
                  <dd className="text-sm text-foreground sm:col-span-2">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <div className="mt-20 md:mt-28">
        <Acknowledgements />
      </div>

      <section aria-labelledby="about-cta" className="shell my-20 md:my-28">
        <div className="border-l-2 border-rule py-2 pl-6 md:pl-8">
          <h2
            id="about-cta"
            className="text-2xl font-medium uppercase leading-tight tracking-tight text-foreground md:text-3xl"
          >
            Let&rsquo;s talk
          </h2>
          <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-muted-foreground">
            No pitch, no pressure &mdash; just a conversation about what
            you&rsquo;re trying to do and whether I&rsquo;m the right person to
            help you do it.
          </p>
          <div className="mt-8">
            <ContactMeBtn />
          </div>
        </div>
      </section>
    </div>
  );
}
