import { Star } from "lucide-react";
import Picture from "@/components/_shared/Picture";
import ContactMeBtn from "@/components/_shared/ContactMeBtn";
import { getTestimonials } from "@/lib/actions/public/testimonials/getTestimonials";

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <div className="bg-background">
      <header className="shell pb-12 pt-20 md:pb-16 md:pt-28 lg:pt-36">
        <p className="flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          In their words
          <span aria-hidden="true" className="h-px w-14 bg-rule" />
        </p>

        <h1 className="mt-7 text-[clamp(2.75rem,9vw,6rem)] font-medium uppercase leading-[0.88] tracking-tight text-foreground">
          Testimonials
        </h1>

        <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
          Helping you get more for your real estate.
        </p>
      </header>

      <section
        aria-label="Client testimonials"
        className="shell border-t border-border pb-20 pt-12 md:pb-28 md:pt-16"
      >
        {testimonials.length === 0 ? (
          <p className="max-w-[52ch] text-base leading-relaxed text-muted-foreground">
            No testimonials to show just yet. If we&rsquo;ve worked together,
            I&rsquo;d be glad to hear from you.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-2 lg:gap-x-16">
            {testimonials.map((testimonial) => {
              const rating = 5;

              return (
                <li key={testimonial.id}>
                  <figure className="flex h-full flex-col border-t-2 border-rule pt-7">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          aria-hidden="true"
                          className={`h-4 w-4 ${
                            index < rating
                              ? "fill-current text-amber-500"
                              : "text-border"
                          }`}
                        />
                      ))}
                      <span className="sr-only">Rated {rating} out of 5</span>
                    </div>

                    <blockquote className="mt-6 flex-1">
                      <p className="text-xl font-medium leading-snug tracking-tight text-foreground lg:text-2xl">
                        {testimonial.title}
                      </p>
                      <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-muted-foreground">
                        {testimonial.desc}
                      </p>
                    </blockquote>

                    <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                      {testimonial.img ? (
                        <Picture
                          src={testimonial.img}
                          alt=""
                          className="h-12 w-12 shrink-0 rounded-full object-cover"
                          priority={false}
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-subtle text-sm font-bold tracking-wide text-rule"
                        >
                          {initials(testimonial.name ?? "Unknown")}
                        </span>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        {testimonial.type && (
                          <p className="truncate text-sm text-subtle-foreground">
                            {testimonial.type}
                          </p>
                        )}
                      </div>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section
        aria-labelledby="testimonials-cta"
        className="shell mb-20 md:mb-28"
      >
        <div className="border-l-2 border-rule py-2 pl-6 md:pl-8">
          <h2
            id="testimonials-cta"
            className="text-2xl font-medium uppercase leading-tight tracking-tight text-foreground md:text-3xl"
          >
            Ready to start yours?
          </h2>
          <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-muted-foreground">
            Every one of these began with a conversation. Tell me what
            you&rsquo;re looking for and we&rsquo;ll go from there.
          </p>
          <div className="mt-8">
            <ContactMeBtn />
          </div>
        </div>
      </section>
    </div>
  );
}
