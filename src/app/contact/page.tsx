"use client";

import { useState } from "react";

const API_URL = "http://localhost:5000/api/messages";

interface Message {
  name: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const [items, setItems] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<Message>({
    name: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les messages
  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/find`);
      if (!res.ok) throw new Error("Erreur lors du chargement");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Erreur chargement:", err);
    }
  };

  // Ajouter un message
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      const data = await res.json();
      console.log("STATUS:", res.status);
      console.log("RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.message || "Erreur serveur");
      }

      setNewMessage({ name: "", phone: "", message: "" });
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#0B0B0C] text-[#F5F3EF] min-h-screen pt-40 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-24 max-w-2xl">
          <p className="uppercase tracking-[0.4em] text-xs text-[#C6A75E] mb-6">
            Contact
          </p>

          <h1 className="font-serif text-6xl md:text-7xl leading-[0.9] mb-8">
            Nous écrire ou nous rendre visite
          </h1>

          <p className="text-[#9F988C] text-lg font-light leading-relaxed">
            Pour toute réservation spéciale, demande privée ou information,
            notre équipe se tient à votre disposition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-20">
          {/* Informations */}
          <div className="space-y-16">
            <div>
              <h2 className="uppercase tracking-[0.3em] text-xs text-[#C6A75E] mb-6">
                Adresse
              </h2>
              <p className="text-[#F5F3EF] text-lg font-light">
                Rue 1er Novembre
                <br />
                18000 Jijel, Algérie
              </p>
            </div>

            <div>
              <h2 className="uppercase tracking-[0.3em] text-xs text-[#C6A75E] mb-6">
                Contact
              </h2>
              <p className="text-[#F5F3EF] text-lg font-light">
                07 70 45 49 48
                <br />
                letoile.dz@gmail.com
              </p>
            </div>

            <div>
              <h2 className="uppercase tracking-[0.3em] text-xs text-[#C6A75E] mb-6">
                Horaires
              </h2>
              <p className="text-[#9F988C] font-light leading-relaxed">
                Lundi – Samedi
                <br />
                11h00 – 23h00
                <br />
                <br />
                Fermé dimanche
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <div>
            <form onSubmit={handleSave} className="space-y-10">
              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-[#9F988C] mb-4">
                  Nom
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-[#C6A75E] transition-colors"
                  value={newMessage.name}
                  onChange={(e) =>
                    setNewMessage({ ...newMessage, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-[#9F988C] mb-4">
                  Téléphone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-[#C6A75E] transition-colors"
                  value={newMessage.phone}
                  onChange={(e) =>
                    setNewMessage({ ...newMessage, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.3em] text-[#9F988C] mb-4">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  className="w-full bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-[#C6A75E] transition-colors resize-none"
                  value={newMessage.message}
                  onChange={(e) =>
                    setNewMessage({ ...newMessage, message: e.target.value })
                  }
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 px-10 py-4 border border-[#C6A75E]/50 text-[#C6A75E] uppercase tracking-[0.3em] text-xs hover:bg-[#C6A75E] hover:text-black transition-all duration-500 disabled:opacity-50"
              >
                {loading ? "Envoi..." : "Envoyer"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Google Maps */}
      <div className="mt-32">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4997.413690269239!2d5.769709147304723!3d36.8195445093137!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f261df2b334b07%3A0x44651f16b71abc67!2sPort%20de%20p%C3%AAche%20et%20de%20tourisme%20pour%20les%20petits%20et%20moyens%20bateaux!5e0!3m2!1sfr!2sus!4v1771691171931!5m2!1sfr!2sus"
          className="w-full h-[400px] border-0 grayscale contrast-125"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
