// components/ActionMenu.tsx
import { ChevronRight, Calendar } from "lucide-react";
import Link from "next/link";

export default function ActionMenu() {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center px-6 overflow-hidden">
      {/* Background Image */}
      <img
        src="/hero1.jpg"
        alt="Art culinaire"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center backdrop-blur-sm bg-white/5 border border-white/10 p-10 md:p-16 rounded-2xl shadow-2xl">
        <span className="text-[11px] uppercase tracking-[0.4em] text-stone-300 block mb-6">
          Invitation
        </span>

        <h3 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
          L'harmonie des <span className="italic">saisons</span>
        </h3>

        <p className="text-stone-300 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
          Une cuisine d’émotion, guidée par les produits du moment et le respect
          du terroir.
        </p>

        <div className=" flex flex-col items-center  gap-4 justify-center">
          {/* Primary CTA */}
          <Link href={"tel:+770454948"}>
            <button className="w-72 border border-gray-950/40 bg-gray-200 text-stone-900 px-8 py-4 flex items-center justify-center gap-3 rounded-full uppercase text-[11px] tracking-[0.3em] font-bold hover:bg-gray-950 hover:text-white transition-all group">
              <Calendar className="w-4 h-4" />
              Commander
            </button>
          </Link>
          {/* Secondary CTA */}
          <Link href="/menu">
            <button className="w-72 border border-white/40 text-white px-8 py-4 flex items-center justify-center gap-3 rounded-full uppercase text-[11px] tracking-[0.3em] font-medium hover:bg-white hover:text-stone-900 transition-all group">
              Consulter le menu
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        <p className="mt-10 text-[12px] text-stone-400 italic">
          Ouvert du Lundi au Samedi • 11h - 23h
        </p>
      </div>
    </section>
  );
}
