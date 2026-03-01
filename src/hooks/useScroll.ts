// hooks/useScroll.ts
import { useState, useEffect } from "react";

export const useScroll = () => {
  const [isTop, setIsTop] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Est-on en haut de page ?
      setIsTop(currentScrollY < 50);

      // Détecter la direction du scroll pour cacher/montrer la barre
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // On descend : on cache
      } else {
        setIsVisible(true); // On monte : on montre
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return { isTop, isVisible };
};
