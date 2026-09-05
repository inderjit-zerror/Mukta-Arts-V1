"use client";

import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function TransitionLink({ href, children, className, onClick, ...props }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();

    if (onClick) onClick(e);

    const curtain = document.getElementById("transition-curtain");

    if (curtain) {
      curtain.setAttribute("data-transitioning", "true");

      // Ensure the curtain starts at the bottom
      gsap.set(curtain, { y: "100%" });

      // Animate it to cover the screen
      gsap.to(curtain, {
        y: "0%",
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          router.push(href);
        }
      });
    } else {
      router.push(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
