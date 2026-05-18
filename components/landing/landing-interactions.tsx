"use client";

import { useEffect } from "react";

export function LandingInteractions() {
  useEffect(() => {
    const video = document.getElementById("demoVid") as HTMLVideoElement | null;
    const poster = document.getElementById("vp");
    const caption = document.getElementById("vc");
    const lightbox = document.getElementById("lb");
    const lightboxImage = document.getElementById("lbImg") as HTMLImageElement | null;
    const shots = Array.from(document.querySelectorAll<HTMLElement>(".shot[data-img]"));

    const hidePoster = () => {
      poster?.classList.add("hidden");
      caption?.classList.add("hidden");
    };

    const showPoster = () => {
      poster?.classList.remove("hidden");
      caption?.classList.remove("hidden");
    };

    const playVideo = () => {
      hidePoster();
      void video?.play().catch(() => {
        showPoster();
      });
    };

    const closeLightbox = () => {
      lightbox?.classList.remove("open");
      if (lightboxImage) lightboxImage.src = "";
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && lightbox?.classList.contains("open")) {
        closeLightbox();
      }
    };

    const shotHandlers = shots.map((shot) => {
      const handler = (event: Event) => {
        event.preventDefault();
        const src = shot.getAttribute("data-img");
        if (!src || !lightbox || !lightboxImage) return;
        lightboxImage.src = src;
        lightbox.classList.add("open");
      };
      shot.addEventListener("click", handler);
      return [shot, handler] as const;
    });

    poster?.addEventListener("click", playVideo);
    video?.addEventListener("play", hidePoster);
    video?.addEventListener("ended", showPoster);
    lightbox?.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      poster?.removeEventListener("click", playVideo);
      video?.removeEventListener("play", hidePoster);
      video?.removeEventListener("ended", showPoster);
      lightbox?.removeEventListener("click", closeLightbox);
      document.removeEventListener("keydown", onKeyDown);
      shotHandlers.forEach(([shot, handler]) => shot.removeEventListener("click", handler));
    };
  }, []);

  return null;
}
