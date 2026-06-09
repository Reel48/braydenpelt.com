"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Close } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * An image that opens a full-screen lightbox when clicked. The overlay is
 * rendered through a portal to <body> so it escapes any transformed ancestor
 * (e.g. a Reveal wrapper) and truly covers the viewport, over an opaque
 * backdrop that hides the page. Closes on backdrop/image click, the ✕ button,
 * or Escape.
 */
export function LightboxImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // A cached image can finish loading before React attaches `onLoad`, so the
  // event never fires. Catch that case when the node mounts.
  const thumbRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setLoaded(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setShown(false);
      return;
    }
    const raf = requestAnimationFrame(() => setShown(true));
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    // The viewport scroller is <html>, so lock it (locking <body> alone does
    // not stop the root scroll).
    document.documentElement.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View ${alt} full size`}
        className="block w-full cursor-zoom-in"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={thumbRef}
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={cn(
            // One transition covers both the load fade and the hover zoom
            // (callers supply `group-hover/*:scale-*`), so they never fight
            // over `transition-property`.
            "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
            loaded ? "opacity-100" : "opacity-0",
            className,
          )}
        />
      </button>

      {open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={alt}
              onClick={() => setOpen(false)}
              className={`fixed inset-0 z-[100] flex items-center justify-center bg-black p-4 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
                shown ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="max-h-[94vh] max-w-[94vw] cursor-zoom-out object-contain"
              />
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <Close size={20} />
              </button>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
