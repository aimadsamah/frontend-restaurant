"use client";

import { useState } from "react";

const API_URL = "http://localhost:5000/api/reservations";

interface Reservation {
  name: string;
  phone: string;
  message: string;
  convives: string;
  date: string;
  time: string;
}

export default function Reservation() {
  const [guests, setGuests] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reservation, setReservation] = useState<Reservation>({
    name: "",
    phone: "",
    message: "",
    convives: "",
    date: "",
    time: "",
  });

  // Ajouter une reservation
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reservation),
      });

      const data = await res.json();
      console.log("STATUS:", res.status);
      console.log("RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.message || "Erreur serveur");
      }

      setReservation({
        name: "",
        phone: "",
        message: "",
        convives: "",
        date: "",
        time: "",
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#0B0B0C] text-[#F5F3EF] min-h-screen pt-40 pb-32">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-24 max-w-2xl">
          <p className="uppercase tracking-[0.4em] text-xs text-[#C6A75E] mb-6">
            Réservation
          </p>

          <h1 className="font-serif text-6xl md:text-7xl leading-[0.9] mb-8">
            Réserver une table
          </h1>

          <p className="text-[#9F988C] text-lg font-light leading-relaxed">
            Nous serons honorés de vous accueillir pour une expérience
            gastronomique unique.
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSave} className="space-y-20">
          {/* Étape 1 : Détails réservation */}
          <div className="grid md:grid-cols-3 gap-12">
            {/* Date */}
            <div>
              <label className="block text-xs uppercase tracking-[0.3em] text-[#9F988C] mb-4">
                Date
              </label>
              <input
                name="date"
                type="date"
                onFocus={(e) => e.target.showPicker?.()}
                className="w-full bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-[#C6A75E] transition-colors"
                value={reservation.date}
                onChange={(e) =>
                  setReservation({ ...reservation, date: e.target.value })
                }
              />
            </div>

            {/* Heure */}
            <div>
              <label className="block text-xs uppercase tracking-[0.3em] text-[#9F988C] mb-4">
                Heure
              </label>
              <input
                name="time"
                type="time"
                className="w-full bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-[#C6A75E] transition-colors"
                value={reservation.time}
                onChange={(e) =>
                  setReservation({ ...reservation, time: e.target.value })
                }
              />
            </div>

            {/* Nombre de personnes */}
            <div>
              <label className="block text-xs uppercase tracking-[0.3em] text-[#9F988C] mb-4">
                Nombre de personnes
              </label>
              <div className="flex items-center ">
                <input
                  name="convives"
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-[#C6A75E] transition-colors"
                  value={reservation.convives}
                  onChange={(e) =>
                    setReservation({ ...reservation, convives: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Étape 2 : Informations client */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <label className="block text-xs uppercase tracking-[0.3em] text-[#9F988C] mb-4">
                Nom complet
              </label>
              <input
                name="name"
                type="text"
                className="w-full bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-[#C6A75E] transition-colors"
                value={reservation.name}
                onChange={(e) =>
                  setReservation({ ...reservation, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.3em] text-[#9F988C] mb-4">
                Téléphone
              </label>
              <input
                name="phone"
                type="tel"
                className="w-full bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-[#C6A75E] transition-colors"
                value={reservation.phone}
                onChange={(e) =>
                  setReservation({ ...reservation, phone: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.3em] text-[#9F988C] mb-4">
                Demande particulière
              </label>
              <input
                name="message"
                type="text"
                className="w-full bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-[#C6A75E] transition-colors"
                value={reservation.message}
                onChange={(e) =>
                  setReservation({ ...reservation, message: e.target.value })
                }
              />
            </div>
          </div>

          {/* CTA */}
          <div className="pt-10">
            <button
              type="submit"
              className="px-12 py-5 border border-[#C6A75E]/50 text-[#C6A75E] uppercase tracking-[0.3em] text-xs hover:bg-[#C6A75E] hover:text-black transition-all duration-500"
            >
              Confirmer la réservation
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
