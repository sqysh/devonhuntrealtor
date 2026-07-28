"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { Menu } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import MobileNavigation from "./MobileNavigation";
import Picture from "@/components/_shared/Picture";
import { headerLinkData } from "@/lib/utils/navigation.utils";

type HeaderLink = {
  path: string;
  textKey: string;
  active: boolean;
};

/** Routes that render without the marketing chrome. */
const CHROMELESS_ROUTES = ["/auth", "/admin"];

const Header = () => {
  const path = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [pointedPath, setPointedPath] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setCondensed(y > 12));

  // Returning focus to the trigger is required when a menu closes —
  // otherwise keyboard focus falls back to <body> and the user
  // restarts tabbing from the top of the document.
  const close = useCallback(() => {
    setIsMobileNavOpen(false);
    toggleRef.current?.focus();
  }, []);

  const isChromeless = CHROMELESS_ROUTES.some(
    (route) => path === route || path.startsWith(`${route}/`),
  );

  if (isChromeless) return null;

  const links = headerLinkData(path) as HeaderLink[];
  const activePath = links.find((link) => link.active)?.path ?? null;

  // The rule follows the pointer or keyboard focus, and falls back to
  // the current page when neither is engaged.
  const ruledPath = pointedPath ?? activePath;

  return (
    <header
      className={`sticky top-0 z-30 border-b bg-surface/85 backdrop-blur-md transition-[padding,box-shadow,border-color] duration-300 ease-out ${
        condensed
          ? "border-border shadow-[0_1px_24px_-12px_hsl(var(--shadow-color)/0.5)]"
          : "border-transparent shadow-none"
      }`}
    >
      <a
        href="#main"
        className="sr-only rounded-control bg-primary-accessible px-4 py-2 text-sm font-semibold text-primary-foreground focus-visible:not-sr-only focus-visible:absolute focus-visible:left-3 focus-visible:top-3 focus-visible:z-50"
      >
        Skip to main content
      </a>

      <MobileNavigation
        toggleMobileNavigation={isMobileNavOpen}
        close={close}
      />

      <div
        className={`shell flex items-center justify-between gap-4 transition-[padding-block] duration-300 ease-out ${
          condensed ? "py-2 md:py-2" : "py-3 md:pb-3 md:pt-4"
        }`}
      >
        <Link
          href="/"
          className="group shrink-0 rounded-control focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <span
            className={`block origin-left transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.03] ${
              condensed ? "scale-90" : "scale-100"
            }`}
          >
            <Picture
              src="/images/tpn/tpn-logo-black-text-no-bg.png"
              alt="The Proper Nest Real Estate"
              className="w-40 dark:hidden sm:w-48 lg:w-52"
              priority={false}
            />
            <Picture
              src="/images/tpn/tpn-logo-white-text-no-bg.png"
              alt="The Proper Nest Real Estate"
              className="hidden w-40 dark:block sm:w-48 lg:w-52"
              priority={false}
            />
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul
            className="flex items-center gap-8 xl:gap-10"
            onMouseLeave={() => setPointedPath(null)}
          >
            {links.map((link) => (
              <li key={link.path} className="relative">
                <Link
                  href={link.path}
                  aria-current={link.active ? "page" : undefined}
                  onMouseEnter={() => setPointedPath(link.path)}
                  onFocus={() => setPointedPath(link.path)}
                  onBlur={() => setPointedPath(null)}
                  className={`inline-flex min-h-11 items-center px-1 text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${
                    ruledPath === link.path
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.textKey}
                </Link>

                {ruledPath === link.path && (
                  <motion.span
                    aria-hidden="true"
                    layoutId={reduceMotion ? undefined : "nav-rule"}
                    className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.75 rounded-full bg-rule"
                    transition={{
                      type: "spring",
                      stiffness: 480,
                      damping: 38,
                      mass: 0.7,
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsMobileNavOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-navigation"
          className="group relative -mr-1 inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-control text-foreground transition-colors duration-200 hover:text-primary-accessible focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-95 lg:hidden"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-1.5 bottom-1.5 h-0.75 origin-left scale-x-0 rounded-full bg-rule transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
          />
          <Menu aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
