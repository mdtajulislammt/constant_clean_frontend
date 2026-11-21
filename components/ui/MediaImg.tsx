import Image, { type ImageProps } from "next/image";
import type { MediaImage } from "@/lib/media";

/** next/image wrapper for entries from lib/media.ts — always a blur placeholder + the entry's alt text. */
export default function MediaImg({
  image,
  alt,
  ...props
}: { image: MediaImage; alt?: string } & Omit<ImageProps, "src" | "alt" | "placeholder" | "blurDataURL">) {
  return <Image src={image.src} alt={alt ?? image.alt} placeholder="blur" blurDataURL={image.blurDataURL} {...props} />;
}
