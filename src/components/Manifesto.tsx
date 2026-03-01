// components/Manifesto.tsx
export default function Manifesto() {
  return (
    <section className="relative bg-[#f4f1ee] py-20 md:py-32 px-6">
      {/* Texture papier ultra-subtile */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <div className="max-w-3xl mx-auto relative">
        {/* Ligne décorative horizontale courte */}
        <div className="flex justify-center mb-10">
          <div className="w-8 h-[1px] bg-stone-400/50" />
        </div>
        <div className="flex flex-col items-center">
          {/* Texte principal réduit et raffiné */}
          <p className="font-serif text-xl md:text-3xl text-stone-800 leading-[1.6] text-center italic font-light max-w-2xl">
            "Plus qu'un restaurant, une expérience sensorielle{" "}
            <br className="hidden md:block" />
            où le produit brut rencontre{" "}
            <span className="text-stone-500">l'audace</span>."
          </p>

          {/* Signature plus petite et intégrée */}
          <div className="mt-10 self-end md:mr-10">
            <div className="flex flex-col items-end">
              <span
                className="text-2xl md:text-3xl text-stone-700/90 italic"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Chef Jean-Pierre
              </span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-stone-400 mt-1">
                L'Âme du Jardin
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
