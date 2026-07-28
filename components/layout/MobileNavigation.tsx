"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import Picture from "@/components/_shared/Picture";
import { headerLinkData } from "@/lib/utils/navigation.utils";

type HeaderLink = {
  path: string;
  textKey: string;
  active: boolean;
};

type MobileNavigationProps = {
  toggleMobileNavigation: boolean;
  close: () => void;
};

const MobileNavigation = ({
  toggleMobileNavigation: isOpen,
  close,
}: MobileNavigationProps) => {
  const path = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab") return;

      // Keep Tab inside the panel — otherwise focus walks onto the page
      // behind it, which is still rendered and still scrollable.
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const links = headerLinkData(path) as HeaderLink[];

  return (
    <div
      id="mobile-navigation"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      // `inert` while closed: the panel stays mounted for the transition,
      // and without this its links remain tabbable and readable offscreen.
      inert={!isOpen}
      className={`fixed inset-0 z-60 flex h-dvh flex-col bg-background transition-transform duration-300 ease-out lg:hidden ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          onClick={close}
          className="shrink-0 rounded-control focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <Picture
            src="/images/tpn/tpn-logo-black-text-no-bg.png"
            alt="The Proper Nest Real Estate"
            className="w-44 dark:hidden sm:w-52"
            priority={false}
          />
          <Picture
            src="/images/tpn/tpn-logo-white-text-no-bg.png"
            alt="The Proper Nest Real Estate"
            className="hidden w-44 dark:block sm:w-52"
            priority={false}
          />
        </Link>

        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close menu"
          className="-mr-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-control text-foreground transition-colors duration-200 hover:text-primary-accessible focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <X aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>

      <nav
        aria-label="Main"
        className="flex flex-1 items-center overflow-y-auto px-4 pb-16"
      >
        <ul className="w-full">
          {links.map((link) => (
            <li
              key={link.path}
              className="border-b border-border last:border-b-0"
            >
              <Link
                href={link.path}
                onClick={close}
                aria-current={link.active ? "page" : undefined}
                className={`flex min-h-16 items-center gap-4 text-2xl font-medium uppercase tracking-tight transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:text-3xl ${
                  link.active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-px shrink-0 bg-rule transition-all duration-300 ease-out ${
                    link.active ? "w-10" : "w-0"
                  }`}
                />
                {link.textKey}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavigation;
