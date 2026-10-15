
import React, { useRef, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import heroVideo from '../assets/hero video/sami-hero-video.mp4';
import { hero, roles } from '../data/siteContent';

const Hero = () => {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Animated typography states
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentRole = roles[roleIndex] || hero.headlineRole;

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
    });

    return () => {
      AOS.refreshHard();
    };
  }, []);

  // Typing and deleting animation
  useEffect(() => {
    if (!roles.length) return;

    let delay = isDeleting ? 35 : 75;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = 1400;
    } else if (isDeleting && charIndex === 0) {
      delay = 300;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        // Type the next character
        setCharIndex((previous) => previous + 1);
      } else if (
        !isDeleting &&
        charIndex === currentRole.length
      ) {
        // Pause before deleting the current role
        setIsDeleting(true);
      } else if (isDeleting && charIndex > 0) {
        // Delete the current character
        setCharIndex((previous) => previous - 1);
      } else {
        // Move to the next role
        setIsDeleting(false);
        setRoleIndex((previous) => (previous + 1) % roles.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [roleIndex, charIndex, isDeleting, currentRole]);

  // Mute / unmute without interrupting the video
  const toggleMute = (event) => {
    event.stopPropagation();

    const video = videoRef.current;

    if (!video) return;

    const nextMuteState = !video.muted;

    video.muted = nextMuteState;
    setIsMuted(nextMuteState);

    if (video.paused) {
      video.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen min-h-[650px] w-full overflow-hidden bg-black"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for readable typography */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

      <div className="absolute inset-0 z-20 mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-center px-6 pt-24 text-left md:flex-row md:items-start md:justify-between md:px-12 md:pt-[12%]">
        {/* Left side: Heading, roles, description and buttons */}
        <div className="flex w-full max-w-xl flex-col items-start text-left">
          <h1
            data-aos="fade-up"
            data-aos-delay="50"
            className="mb-5 w-full text-4xl font-black leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block">Hi, I’m a</span>

            {/* Animated role typography */}
            <span
              className="mt-2 block min-h-[1.15em] bg-gradient-to-r from-white via-red-100 to-red-400 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]"
              aria-label={currentRole}
            >
              <span aria-hidden="true">
                {currentRole.slice(0, charIndex)}
              </span>

              {/* Blinking typing cursor */}
              <span
                aria-hidden="true"
                className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.04em] animate-pulse bg-red-400 align-baseline"
              />
            </span>
          </h1>

          {/* Role badges */}
          {/* <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="mb-5 flex max-w-md flex-wrap gap-2"
          >
            {roles.map((role) => (
              <span
                key={role}
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/95 backdrop-blur-sm transition-all duration-300 hover:border-red-400/70 hover:bg-red-500/20 md:text-xs"
              >
                {role}
              </span>
            ))}
          </div> */}

          {/* Description */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mb-8 max-w-sm text-sm font-medium leading-relaxed text-white/90 drop-shadow-sm sm:max-w-md md:max-w-lg md:text-base lg:text-lg"
          >
            {hero.subheading}
          </p>

          {/* Call-to-action buttons */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex w-full flex-row flex-wrap items-center gap-3 sm:gap-4"
          >
            <a
              href="#projects"
              className="inline-block rounded-full bg-white px-5 py-3 text-center text-xs font-bold text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-50 sm:px-7 sm:text-sm"
            >
              View My Work
            </a>

            <a
              href="#contact"
              className="inline-block rounded-full border border-white/80 bg-black/20 px-5 py-3 text-center text-xs font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-red-300 hover:bg-white/10 sm:px-7 sm:text-sm"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right side: Video audio controller */}
        <button
          type="button"
          data-aos="zoom-in"
          data-aos-delay="600"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute background video' : 'Mute background video'}
          aria-pressed={!isMuted}
          className="group mt-8 flex cursor-pointer flex-col items-center justify-center gap-2 self-start rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:mt-2 md:self-auto"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/30 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-white group-hover:bg-white md:h-16 md:w-16">
            {isMuted ? (
              /* Muted speaker icon */
              <svg
                className="h-6 w-6 text-white transition-colors group-hover:text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5 6 9H3v6h3l5 4V5Zm5 4 5 6m0-6-5 6"
                />
              </svg>
            ) : (
              /* Active speaker icon */
              <svg
                className="h-6 w-6 text-white transition-colors group-hover:text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5 6 9H3v6h3l5 4V5Zm4 4a5 5 0 0 1 0 6m3-9a9 9 0 0 1 0 12"
                />
              </svg>
            )}
          </span>

          <span className="mt-1 text-[9px] font-extrabold uppercase tracking-widest text-white/70 transition-opacity group-hover:text-white md:text-[11px]">
            {isMuted ? 'Unmute Reel' : 'Mute Sound'}
          </span>
        </button>
      </div>

      {/* Desktop scroll indicator */}
      <div
        data-aos="fade-up"
        data-aos-delay="800"
        className="pointer-events-none absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 md:block"
      >
        <div className="animate-bounce">
          <svg
            className="h-5 w-5 text-white/70"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 14l-7 7m0 0-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
