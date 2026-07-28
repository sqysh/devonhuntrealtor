"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Mail, Phone } from "lucide-react";
import Picture from "@/components/_shared/Picture";
import { IconComponent } from "../_shared/icons/types";
import FacebookIcon from "../_shared/icons/FacebookIcon";
import InstagramIcon from "../_shared/icons/InstagramIcon";

const CHROMELESS_ROUTES = ["/auth", "/admin"];

const PHONE_DISPLAY = "+1 (978) 818 5303";
const PHONE_HREF = "tel:+19788185303";
const EMAIL = "devon@thepropernest.com";
const ADDRESS = "257 Washington St #3, Marblehead, MA 01945";
const MAPS_HREF = `https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`;

const SQYSH_HREF =
  "https://www.sqysh.com/?utm_source=devonhuntrealtor&utm_medium=referral&utm_campaign=client_footer&utm_content=text_link";

const contactLink =
  "inline-flex min-h-11 items-center gap-2.5 rounded-control text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

type SocialLink = {
  linkKey: string;
  icon: IconComponent;
  /** Accessible name — these links are icon-only, so this is the only
      thing a screen reader has to go on. */
  label: string;
};

const socialMediaIconsData: SocialLink[] = [
  {
    linkKey: "https://www.facebook.com/devondhunt",
    icon: FacebookIcon,
    label: "Devon Hunt on Facebook",
  },
  {
    linkKey: "https://www.instagram.com/devondhunt/",
    icon: InstagramIcon,
    label: "Devon Hunt on Instagram",
  },
];

const Footer = () => {
  const pathname = usePathname();
  const socials = socialMediaIconsData;

  const isChromeless = CHROMELESS_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isChromeless) return null;

  return (
    <footer className="w-full bg-surface-sunken">
      <div className="shell py-12 md:py-16">
        <div className="flex flex-col gap-8 border-b border-border pb-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="shrink-0 self-start rounded-control focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:self-auto"
          >
            <Picture
              src="/images/tpn/tpn-logo-black-text-no-bg.png"
              alt="The Proper Nest Real Estate"
              className="w-48 dark:hidden sm:w-60"
              priority={false}
            />
            <Picture
              src="/images/tpn/tpn-logo-white-text-no-bg.png"
              alt="The Proper Nest Real Estate"
              className="hidden w-48 dark:block sm:w-60"
              priority={false}
            />
          </Link>

          <ul className="flex flex-wrap items-center gap-1">
            {socials.map(({ icon: Icon, linkKey, label }) => (
              <li key={linkKey}>
                <a
                  href={linkKey}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 hover:bg-foreground focus-visible:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5 text-foreground transition-colors duration-200 group-hover:text-rule group-focus-visible:text-rule"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-8 flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:gap-x-10">
          <li>
            <a href={PHONE_HREF} className={contactLink}>
              <Phone
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-rule"
              />
              {PHONE_DISPLAY}
            </a>
          </li>
          <li className="min-w-0">
            <a href={`mailto:${EMAIL}`} className={contactLink}>
              <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-rule" />
              <span className="truncate">{EMAIL}</span>
            </a>
          </li>
          <li>
            <a
              href={MAPS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={contactLink}
            >
              <House
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-rule"
              />
              <span>{ADDRESS}</span>
            </a>
          </li>
        </ul>

        <div className="mt-10 flex flex-col gap-2 text-xs text-subtle-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()}&nbsp; Devon Hunt &middot; The
            Proper Nest Real Estate
          </p>
          <p>
            Developed by{" "}
            <a
              href={SQYSH_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-control font-semibold text-muted-foreground underline decoration-rule decoration-2 underline-offset-4 transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Sqysh
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
