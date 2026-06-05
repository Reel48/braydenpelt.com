"use client";

import { useEffect, useState } from "react";

/**
 * An image that opens a full-size lightbox overlay when clicked.
 * Closes on backdrop/image click, the ✕ button, or Escape.
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

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
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
        <img src={src} alt={alt} className={className} />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="max-h-[92vh] max-w-[92vw] cursor-zoom-out rounded-md object-contain shadow-2xl"
          />
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-white/20"
          >
            ✕
          </button>
        </div>
      ) : null}
    </>
  );
}
