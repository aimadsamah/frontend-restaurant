"use client";

import AdminAuth from "@/components/AdminAuth";
import { useState } from "react";
import { Mail, Phone, Trash2 } from "lucide-react";

export default function AdminReservationsPage() {
  const [selectedReservation, setSelectedReservation] = useState<any>(null);

  const [reservations, setReservations] = useState([
    {
      id: 1,
      name: "Marc Aubert",
      email: "marc.a@email.com",
      phone: "06 12 34 56 78",
      date: "22 Fév",
      time: "20:30",
      guests: 4,
      note: "Table calme.",
    },
  ]);

  return (
    <AdminAuth>
      <div className="min-h-screen bg-[#0F0F0F] text-stone-300 p-12">
        <h1 className="text-xl text-white mb-12">Réservations</h1>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-4 space-y-2">
            {reservations.map((r) => (
              <div
                key={r.id}
                onClick={() => setSelectedReservation(r)}
                className="p-4 bg-[#141414] border border-white/5 cursor-pointer"
              >
                <div className="flex justify-between">
                  <span>{r.name}</span>
                  <span className="text-xs opacity-50">{r.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-8">
            {selectedReservation && (
              <div className="p-8 bg-[#141414] border border-white/10">
                <div className="flex justify-between mb-6">
                  <h2 className="text-white text-2xl">
                    {selectedReservation.name}
                  </h2>
                  <button
                    onClick={() =>
                      setReservations(
                        reservations.filter(
                          (r) => r.id !== selectedReservation.id,
                        ),
                      )
                    }
                  >
                    <Trash2 />
                  </button>
                </div>

                <div className="space-y-2 text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <Mail size={14} /> {selectedReservation.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} /> {selectedReservation.phone}
                  </div>
                </div>

                <div className="italic bg-white/5 p-6">
                  "{selectedReservation.note}"
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminAuth>
  );
}
