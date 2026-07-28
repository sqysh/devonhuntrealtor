import Picture from "@/components/_shared/Picture";

const benefits = [
  {
    label: "No pressure",
    text: "I will never hurry you through the home-finding process.",
  },
  {
    label: "Off-market access",
    text: "I go above and beyond to find off-market and ignored homes.",
  },
  {
    label: "Straight counsel",
    text: "I provide you the confidence-boosting counsel you need.",
  },
  {
    label: "Full devotion",
    text: "I promise maximum care, detail, and devotion.",
  },
];

export default function Benefits() {
  return (
    <section aria-labelledby="benefits-heading" className="py-24 md:py-32">
      <div className="shell">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
          <div className="border-l-2 border-rule pl-6 md:col-span-5 md:pl-8">
            <h2
              id="benefits-heading"
              className="max-w-[16ch] text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground lg:text-[2.5rem]"
            >
              Benefits of working with me
            </h2>

            <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-muted-foreground">
              I am here for those who require a 100% transparent, undeniably
              ethical Realtor &mdash; representing sellers, buyers, investors,
              and anyone seeking knowledge to level up.
            </p>
          </div>

          {/* Offset mosaic: the right column drops, and the aspect ratios
              alternate, so it reads as a composition rather than a 2x2 tile. */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:col-span-7">
            <div className="flex flex-col gap-3 sm:gap-4">
              <Picture
                src="/images/benefit-1.png"
                alt=""
                className="aspect-4/5 w-full rounded-card object-cover"
                priority={false}
              />
              <Picture
                src="/images/benefit-2.png"
                alt=""
                className="aspect-square w-full rounded-card object-cover"
                priority={false}
              />
            </div>

            <div className="flex flex-col gap-3 pt-8 sm:gap-4 md:pt-14 lg:pt-20">
              <Picture
                src="/images/benefit-3.png"
                alt=""
                className="aspect-square w-full rounded-card object-cover"
                priority={false}
              />
              <Picture
                src="/images/benefit-4.png"
                alt=""
                className="aspect-4/5 w-full rounded-card object-cover"
                priority={false}
              />
            </div>
          </div>
        </div>

        {/* Claims run full width beneath the split, each under its own rule */}
        <ul className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-10">
          {benefits.map(({ label, text }) => (
            <li key={label} className="border-t-2 border-rule pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                {label}
              </p>
              <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
