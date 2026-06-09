"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * A plain <img> that fades and settles in once it decodes, instead of popping
 * abruptly. The `className` carries sizing/object-fit; the fade is layered on
 * top. Respects reduced motion (the global guard collapses the transition).
 */
export function FadeImage({
  src,
  alt,
  className,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  const [loaded, setLoaded] = useState(false);
  // A cached image can finish loading before React attaches `onLoad`, so the
  // event never fires. Catch that case when the node mounts.
  const ref = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setLoaded(true);
  }, []);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={loading}
      onLoad={() => setLoaded(true)}
      className={cn(
        "transition-[opacity,filter] duration-700 ease-out motion-reduce:transition-none",
        loaded ? "opacity-100 blur-0" : "opacity-0 blur-[8px]",
        className,
      )}
    />
  );
}
