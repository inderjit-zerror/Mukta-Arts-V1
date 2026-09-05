"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const containerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const menuTextRef = useRef(null);
  const magneticAreaRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const closeButtonRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tl = useRef();
  const router = useRouter();
  const pathname = usePathname();
  const isTransitioningRef = useRef(false);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const createTimeline = contextSafe(() => {
    if (tl.current) tl.current.kill();
    tl.current = gsap.timeline({ paused: true });

    tl.current.to(menuOverlayRef.current, {
      x: '0%',
      duration: 0.8,
      ease: "power4.inOut"
    })
      .to('.menu-line', {
        width: '100%',
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.inOut"
      }, "-=0.4")
      .to('.menu-item-text', {
        y: '0%',
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out"
      }, "-=0.6")
      .fromTo(closeButtonRef.current, {
        opacity: 0,
        rotate: -90
      }, {
        opacity: 1,
        rotate: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.5");
  });

  useGSAP(() => {
    createTimeline();
  }, { scope: containerRef });

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    if (isTransitioningRef.current) return;

    // If clicking the current page, just close the menu
    if (href === pathname || href === pathname + '/') {
      setIsMenuOpen(false);
      return;
    }

    isTransitioningRef.current = true;

    // Fade out menu contents
    gsap.to('.menu-item-text, .menu-line', { opacity: 0, duration: 0.3, ease: 'power2.inOut' });
    gsap.to(closeButtonRef.current, { opacity: 0, duration: 0.3, ease: 'power2.inOut' });

    // Expand menu to cover screen
    gsap.to(menuOverlayRef.current, {
      width: '100vw',
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        router.push(href);
      }
    });
  };

  useEffect(() => {
    // If the pathname changed and we are in the middle of a transition, slide it out
    if (isTransitioningRef.current) {
      gsap.to(menuOverlayRef.current, {
        x: '-100%',
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.1, // brief delay to allow new page to render
        onComplete: () => {
          setIsMenuOpen(false);
          isTransitioningRef.current = false;

          // Reset styles to CSS defaults
          gsap.set(menuOverlayRef.current, { clearProps: 'all' });
          gsap.set('.menu-item-text, .menu-line', { clearProps: 'all' });
          gsap.set(closeButtonRef.current, { clearProps: 'all' });

          // Rebuild the menu timeline to prevent GSAP overwrite issues
          createTimeline();
        }
      });
    }
  }, [pathname]);

  const handleMouseMove = contextSafe((e) => {
    if (isMenuOpen) return; // Don't do magnetic effect if menu is open

    const { clientX, clientY } = e;
    const { left, top, width, height } = magneticAreaRef.current.getBoundingClientRect();

    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    gsap.to(menuButtonRef.current, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 1,
      ease: "power3.out"
    });

    gsap.to(menuTextRef.current, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 1,
      ease: "power3.out"
    });
  });

  const handleMouseLeave = contextSafe(() => {
    if (isMenuOpen) return;

    gsap.to([menuButtonRef.current, menuTextRef.current], {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });
  });

  return (
    <header ref={containerRef} className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center pointer-events-none">
      <div className="text-2xl md:text-3xl font-black tracking-tighter uppercase pointer-events-auto mix-blend-difference text-white relative z-[60]">

      </div>

      {/* Main Menu Button */}
      <div
        ref={magneticAreaRef}
        className={`pointer-events-auto relative p-0 cursor-pointer z-[60] transition-opacity duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsMenuOpen(true)}
      >
        <button
          ref={menuButtonRef}
          className="relative flex items-center justify-center gap-3 bg-[#111] text-white px-7 py-1  overflow-hidden group hover:bg-[#222] transition-colors duration-300"
        >
          <div className="absolute inset-0 bg-[#4E829F] translate-y-[101%]  group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"></div>
          <span
            ref={menuTextRef}
            className="relative z-10  transition-colors duration-500 delay-100 block"
          >
            Menu
          </span>
        </button>
      </div>

      {/* Side Menu Overlay */}
      <div
        ref={menuOverlayRef}
        className="fixed top-0 right-0 w-full md:w-[50vw] h-[100svh] bg-[#1a1a1a] translate-x-full pointer-events-auto flex flex-col justify-center px-8 md:px-20 z-50 shadow-2xl"
      >
        <button
          ref={closeButtonRef}
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-10 right-10 text-white text-3xl font-extralight hover:text-gray-400 transition-colors cursor-pointer w-12 h-12 flex items-center justify-center"
        >
          ✕
        </button>

        <div className="flex flex-col w-full relative mt-[20vh] mb-auto">
          <div className="w-0 h-[1px] bg-white/80 menu-line"></div>
          {[
            { name: "HOME", url: '/' },
            { name: "WORK IN PROGRESS", url: '/work-in-progress' },
            { name: "WHO WE ARE", url: '/' },
            { name: "SGM STUDIO", url: '/' },
            { name: "WHISTLING WOODS", url: '/' },
            { name: "MUKTA A2 CINEMAS", url: '/' },
            { name: "SUBMIT SCRIPT", url: '/' }
          ].map((item, index) => (
            <React.Fragment key={index}>
              <a href={item.url} onClick={(e) => handleLinkClick(e, item.url)} className="py-1 block overflow-hidden group">
                <div className="menu-item-text translate-y-full text-white">
                  <h4 className="inline-block font-light! transform origin-left transition-all duration-300 ease-out  group-hover:-skew-x-17  ">
                    {item.name}
                  </h4>
                </div>
              </a>
              <div className="w-0 h-[1px] bg-white/80 menu-line"></div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;