"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { container, drawRule, rise } from "@/lib/constants/motion.constants";

export default function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reveal on whichever of these lands first. Gating on `loadeddata`
    // alone means one missed event leaves the hero permanently blank.
    const reveal = () => setIsReady(true);
    const events = ["loadeddata", "canplay", "playing", "error"] as const;
    events.forEach((event) => video.addEventListener(event, reveal));

    // Already buffered from cache — the events won't fire again.
    if (video.readyState >= 2) reveal();

    return () =>
      events.forEach((event) => video.removeEventListener(event, reveal));
  }, []);

  // Autoplay can be refused (iOS Low Power Mode, data saver, browser
  // policy). Keep the button label honest when that happens.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  // WCAG 2.3.3 / prefers-reduced-motion: don't animate at people who
  // have asked the OS not to. Runs after mount so SSR markup matches.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !reduceMotion) return;

    video.pause();
    setIsPlaying(false);
  }, [reduceMotion]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  };

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate h-[calc(100svh-4.5rem)] min-h-144 w-full overflow-hidden"
    >
      <video
        ref={videoRef}
        aria-hidden="true"
        tabIndex={-1}
        poster="/images/home-hero-loading.png"
        className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-700 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/home-hero.mp4" type="video/mp4" />
      </video>

      {/* Scrim. Fixed rather than themed — text sits on video in both
          modes, so this region is always a dark surface. Dark mode
          deepens it so the banner doesn't glare next to the page. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-linear-to-b from-black/55 via-black/35 to-black/55 dark:from-black/60 dark:via-black/45 dark:to-black/65"
      />

      {/* The video fades into the page rather than being cut off by a
          border. Removing that hard edge is most of what makes the hero
          read as open instead of boxed. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-linear-to-t from-background via-background/60 to-transparent"
      />

      <motion.div
        variants={reduceMotion ? undefined : container}
        initial={reduceMotion ? undefined : "hidden"}
        animate={reduceMotion ? undefined : "visible"}
        className="shell relative z-20 flex h-full flex-col items-center justify-center text-center"
      >
        <motion.h1
          variants={reduceMotion ? undefined : rise}
          id="home-hero-heading"
          className="flex flex-col items-center gap-3 text-[clamp(1.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white sm:flex-row sm:gap-0"
        >
          <span className="whitespace-nowrap">Devon Hunt</span>
          <motion.span
            variants={reduceMotion ? undefined : drawRule}
            aria-hidden="true"
            className="h-1 w-20 shrink-0 bg-rule sm:mx-5 sm:h-[1.1em] sm:w-1.5 md:mx-8 lg:mx-10"
          />
          <span className="whitespace-nowrap">MA Realtor&reg;</span>
        </motion.h1>

        <motion.p
          variants={reduceMotion ? undefined : rise}
          className="mt-8 max-w-3xl text-balance text-[clamp(1rem,2.4vw,1.625rem)] font-medium leading-relaxed text-white/90"
        >
          Representing buyers, sellers, and renters across{" "}
          <span className="whitespace-nowrap font-semibold text-rule">
            Massachusetts
          </span>
          <span className="mt-1 block">
            with candid guidance from first showing to closing.
          </span>
        </motion.p>

        <motion.div
          variants={reduceMotion ? undefined : rise}
          className="mt-12 lg:mt-14"
        >
          <Link
            href="/contact"
            className="group relative inline-flex min-h-12 items-center justify-center overflow-hidden border-[3px] border-white px-6 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:text-on-rule focus-visible:text-on-rule focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-10 sm:text-sm"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 bg-rule transition-transform duration-300 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none"
            />
            <span className="relative">Request a consultation</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* WCAG 2.2.2 — moving content that starts on its own needs a
          way to stop it. */}
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={
          isPlaying ? "Pause background video" : "Play background video"
        }
        className="absolute bottom-4 right-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/50 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {isPlaying ? (
          <Pause aria-hidden="true" className="h-4 w-4" />
        ) : (
          <Play aria-hidden="true" className="h-4 w-4" />
        )}
      </button>
    </section>
  );
}
