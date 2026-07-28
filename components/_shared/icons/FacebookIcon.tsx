import type { SVGProps } from "react";

/**
 * Facebook wordmark "f". Stroked rather than solid so it sits alongside
 * lucide icons (24 grid, 2px stroke, currentColor) without looking heavier.
 */
const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17 2h-3a4 4 0 0 0-4 4v3H7v4h3v9h4v-9h3l1-4h-4V6.5a.5.5 0 0 1 .5-.5H17z" />
  </svg>
);

export default FacebookIcon;
