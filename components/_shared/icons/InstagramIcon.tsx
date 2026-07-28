import type { SVGProps } from "react";

/**
 * Instagram camera mark: rounded body, lens, flash dot. Built from
 * primitives on the 24 grid so it stays crisp at 20px and matches the
 * stroke weight of the lucide icons beside it.
 */
const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5.5" />
    <circle cx="12" cy="12" r="4.25" />
    <circle cx="17.75" cy="6.25" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export default InstagramIcon;
