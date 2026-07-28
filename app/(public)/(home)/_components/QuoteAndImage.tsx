import Link from "next/link";
import Picture from "@/components/_shared/Picture";

const outlineButton =
  "inline-flex min-h-12 min-w-46 items-center justify-center border border-rule px-7 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition-colors duration-200 hover:bg-rule hover:text-on-rule focus-visible:bg-rule focus-visible:text-on-rule focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

/* Fades the two cropped edges of the cutout — the bottom, where the
   original photo ended, and the left, where his arm meets the frame.
   A mask rather than an overlay so it works over the slab too. */
const edgeFade = {
  WebkitMaskImage:
    "linear-gradient(to top, transparent 0%, black 14%), linear-gradient(to right, transparent 0%, black 12%)",
  WebkitMaskComposite: "source-in",
  maskImage:
    "linear-gradient(to top, transparent 0%, black 14%), linear-gradient(to right, transparent 0%, black 12%)",
  maskComposite: "intersect",
} as const;

export default function QuoteAndImage() {
  return (
    <section
      aria-labelledby="intro-heading"
      className="relative overflow-hidden bg-surface-sunken py-24 md:py-32 lg:py-40"
    >
      <div className="shell relative mx-auto max-w-300">
        {/* Crosshair: short arms up and right, long arms down and left.
            Anchored to the content column rather than the section, so it
            stays beside the portrait instead of drifting toward the
            viewport edge as the screen widens. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-4 right-0 z-0 hidden h-56 w-56 lg:block"
        >
          <span className="absolute left-0 top-12 h-px w-full bg-rule" />
          <span className="absolute right-10 top-0 h-full w-px bg-rule" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 md:items-start">
          <div className="relative z-10 bg-surface-raised px-6 py-12 shadow-card sm:px-10 md:col-span-8 md:col-start-1 md:row-start-1 md:p-16 lg:p-20">
            <p className="flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Meet Devon
              <span aria-hidden="true" className="h-px w-14 bg-rule" />
            </p>

            <h2
              id="intro-heading"
              className="mt-7 text-[clamp(2.5rem,6.5vw,4.5rem)] font-medium uppercase leading-[0.95] tracking-tight text-foreground"
            >
              List or locate
            </h2>

            <p className="mt-8 max-w-[46ch] text-base leading-relaxed text-muted-foreground">
              I will help you in every way possible to list or locate your next
              residence. Since 2020, I have assisted over 150 customers in
              realizing their real estate goals &mdash; buying, selling, and
              renting, with complete transparency throughout.
            </p>

            <div className="mt-11 flex flex-col gap-4 sm:flex-row">
              <Link href="/about" className={outlineButton}>
                About Devon
              </Link>
              <Link href="/contact" className={outlineButton}>
                Contact me
              </Link>
            </div>
          </div>

          <div className="relative z-20 mt-2 md:col-span-6 md:col-start-7 md:row-start-1 md:mt-24 lg:mt-28">
            <div className="relative mx-auto w-full max-w-72 sm:max-w-80 md:ml-auto md:mr-0 md:max-w-md">
              {/* Corner bracket answering the crosshair. Meeting the crop
                  at a right angle reframes it as a deliberate edge. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -left-8 hidden h-48 w-48 md:block"
              >
                <span className="absolute bottom-0 left-0 h-px w-full bg-rule/60" />
                <span className="absolute bottom-0 left-0 h-full w-px bg-rule/60" />
              </div>

              <Picture
                src="/images/devon-02.png"
                alt="Devon Hunt"
                className="relative h-auto w-full object-contain"
                style={edgeFade}
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
