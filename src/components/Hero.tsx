// components/Hero.tsx
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero2.jpg"
          alt="Haute gastronomie mondiale"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-8 md:px-20">
        <div className="max-w-3xl">
          {/* Signature */}
          <p className="text-amber-200/70 uppercase tracking-[0.4em] text-xs mb-6">
            Maison Gastronomique — Jijel
          </p>

          {/* Main Title */}
          <h1 className="text-white font-serif tracking-tight ">
            <span className=" block text-7xl md:text-[8rem] lg:text-[9rem] font-light">
              L'Etoile
            </span>
          </h1>

          {/* Divider line */}
          <div className="w-24  h-[1px] bg-amber-400/50 my-10"></div>

          {/* Description */}
          <p className="text-white/60 text-base md:text-lg font-light leading-relaxed max-w-xl mb-10">
            Une expérience gastronomique immersive où l’élégance rencontre
            l’audace culinaire. Chaque assiette est une œuvre, chaque instant un
            souvenir.
          </p>

          {/* CTA Minimal */}
          <div className="flex gap-10 items-center">
            <Link href="/menu">
              <button className="cursor-pointer group flex items-center gap-3 text-white uppercase tracking-[0.3em] text-xs font-medium animate-swingX ">
                Découvrir le menu
                <ArrowRight className="w-4 h-4 " />
              </button>
            </Link>
            {/* <button className="px-7 py-3 border border-amber-100/40 text-amber-50 uppercase tracking-[0.3em] text-xs hover:bg-amber-200 hover:text-black transition-all duration-500">
              Réserver
            </button> */}
          </div>
        </div>
      </div>

      {/* Vertical Accent Line */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="w-[1px] h-48 bg-gradient-to-b from-transparent via-amber-300/40 to-transparent" />
      </div>
    </section>
  );
}
