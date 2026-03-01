"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0B0B0C]/95 backdrop-blur-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[#F5F3EF] font-serif text-2xl tracking-tight"
        >
          L'Etoile
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12 text-xs uppercase tracking-[0.3em]">
          <Link
            href="/menu"
            className="text-[#9F988C] hover:text-[#F5F3EF] transition-colors"
          >
            Menu
          </Link>

          {/* <Link
            href="tel:+213770454948"
            className="text-[#9F988C] hover:text-[#F5F3EF] transition-colors"
          >
            Commander
          </Link> */}

          <Link
            href="/contact"
            className="text-[#9F988C] hover:text-[#F5F3EF] transition-colors"
          >
            Contact
          </Link>

          {/* CTA */}
          <Link
            href="tel:+213770454948"
            className="ml-6 px-6 py-3 border border-[#C6A75E]/40 text-[#C6A75E] hover:bg-[#C6A75E] hover:text-black transition-all duration-500"
          >
            Commander
          </Link>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#F5F3EF]"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0B0B0C] px-6 pb-10 pt-6 space-y-8 uppercase tracking-[0.3em] text-xs">
          <Link
            href="/menu"
            className="block text-[#9F988C]"
            onClick={() => setOpen(false)}
          >
            Menu
          </Link>
          <Link
            href="tel:+213770454948"
            className="block text-[#9F988C]"
            onClick={() => setOpen(false)}
          >
            Commander
          </Link>
          <Link
            href="/contact"
            className="block text-[#9F988C]"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
