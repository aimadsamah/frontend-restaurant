import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0C] text-[#F5F3EF] border-t border-white/10 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 mb-20">
          {/* Logo & Description */}
          <div>
            <h2 className="font-serif text-3xl mb-6 text-center md:text-left">
              L'Etoile
            </h2>
            <p className="text-[#9F988C] font-light leading-relaxed max-w-md mx-auto md:ml-0 text-center md:text-left">
              Une expérience gastronomique immersive au cœur de Paris, où chaque
              détail est pensé avec précision.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-20">
            {/* Navigation */}
            <div className=" text-center">
              <h3 className="uppercase tracking-[0.3em] text-xs text-[#C6A75E] mb-6">
                Navigation
              </h3>
              <div className="space-y-4 text-sm">
                <Link
                  href="/menu"
                  className="block text-[#9F988C] hover:text-white"
                >
                  Menu
                </Link>
                <Link
                  href="tel:+213770454948"
                  className="block text-[#9F988C] hover:text-white"
                >
                  Commander
                </Link>
                <Link
                  href="/contact"
                  className="block text-[#9F988C] hover:text-white"
                >
                  Contact
                </Link>
              </div>
            </div>
            {/* Informations */}
            <div className=" text-center">
              <h3 className="uppercase tracking-[0.3em] text-xs text-[#C6A75E] mb-6 ">
                Informations
              </h3>
              <p className="text-[#9F988C] text-sm leading-relaxed font-light">
                Rue 1er Novembre
                <br />
                18000 Jijel
                <br />
                <br />
                Lundi – Samedi
                <br />
                11h00 – 22h30
                <br />
                <br />
                07 70 45 49 48
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/10 pt-8 text-center text-xs text-[#9F988C] tracking-widest">
          © {new Date().getFullYear()} L'Etoile — Tous droits réservés
        </div>
      </div>
    </footer>
  );
}
