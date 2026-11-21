import Image from "next/image";
import Link from "next/link";
import { business, images, type LogoVariant } from "@/lib/config";

const defaults: Record<LogoVariant, { className: string; sizes: string }> = {
  // sizes = rendered width (height × 905/327), so next/image serves a small, sharp file
  horizontal: { className: "h-10 w-auto md:h-12", sizes: "(min-width:768px) 133px, 111px" },
  full: { className: "h-20 w-auto md:h-24", sizes: "(min-width:768px) 266px, 222px" },
  icon: { className: "h-10 w-auto", sizes: "111px" },
};

/** Client logo from lib/config.ts → images.logo[variant] (transparent PNG, optimised by next/image). */
export default function Logo({ variant = "horizontal", className }: { variant?: LogoVariant; className?: string }) {
  const { src, width, height } = images.logo[variant];
  return (
    <Link href="/" aria-label={`${business.name} — home`} className="inline-flex shrink-0 items-center">
      <Image
        src={src}
        alt={`${business.name} ${business.tagline} logo`} // "Constant Clean Auto Detailing logo"
        width={width}
        height={height}
        sizes={defaults[variant].sizes}
        priority={variant === "horizontal"}
        className={className ?? defaults[variant].className}
      />
    </Link>
  );
}
