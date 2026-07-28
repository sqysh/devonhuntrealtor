import type { SVGProps } from "react";

/**
 * Shape both lucide icons and the hand-drawn brand marks satisfy, so the
 * two can sit in the same data array. Lucide's own components accept
 * SVGProps, so `LucideIcon` is assignable to this.
 */
export type IconComponent = React.ComponentType<SVGProps<SVGSVGElement>>;
