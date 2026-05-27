"use client";

import { useState } from "react";
import { Icon } from "./Icon";

type Props = {
  id: string;
  title: string;
};

type ThumbState = "maxres" | "hq" | "failed";

export function LiteYouTube({ id, title }: Props) {
  const [active, setActive] = useState(false);
  const [thumb, setThumb] = useState<ThumbState>("maxres");

  if (active) {
    return (
      <div className="rounded-xl shadow-2xl relative z-10 w-full aspect-video overflow-hidden bg-black">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  const thumbUrl = thumb === "maxres"
    ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
    : thumb === "hq"
      ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
      : null;

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Play: ${title}`}
      className="rounded-xl shadow-2xl relative z-10 w-full aspect-video overflow-hidden group bg-charcoal cursor-pointer touch-manipulation"
    >
      {thumbUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumbUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          loading="lazy"
          onError={() => setThumb((s) => (s === "maxres" ? "hq" : "failed"))}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-on-surface flex items-center justify-center text-white/60 text-label-sm">
          {title}
        </div>
      )}
      <span className="absolute inset-0 bg-black/20" aria-hidden />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform motion-reduce:group-hover:scale-100">
        <Icon name="play_arrow" filled className="text-4xl" />
      </span>
    </button>
  );
}
