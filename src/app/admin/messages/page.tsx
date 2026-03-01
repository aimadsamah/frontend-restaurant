"use client";

import AdminAuth from "@/components/AdminAuth";
import { useEffect, useState } from "react";
import { Mail, Trash2, Loader2, Circle } from "lucide-react";

// 1. Interface mise à jour
interface Message {
  _id: string;
  name: string;
  phone: string;
  message: string;
  createdAt: string;
  read: boolean; // État de lecture
}

export default function AdminMessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // 2. Formater la date proprement
  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return "Date inconnue";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Format invalide";

    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // 3. Charger les messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/messages/find`);
        if (!res.ok) throw new Error("Erreur réseau");
        const data = await res.json();

        // Trier par date décroissante
        const sorted = data.sort(
          (a: Message, b: Message) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setMessages(sorted);
      } catch (error) {
        console.error("Erreur chargement:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // 4. Marquer comme lu
  const handleSelectMessage = async (msg: Message) => {
    setSelectedMessage(msg);

    // Si le message est déjà lu, on ne fait rien côté serveur
    if (msg.read) return;

    try {
      // Appel API pour mettre à jour le statut en base de données
      const res = await fetch(`${API_URL}/api/messages/${msg._id}/read`, {
        method: "PATCH",
      });

      if (res.ok) {
        // Mise à jour locale du state pour faire disparaître la pastille immédiatement
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, read: true } : m)),
        );
      }
    } catch (error) {
      console.error("Erreur lors du marquage comme lu:", error);
    }
  };

  // 5. Supprimer un message
  const handleDelete = async (id: string | number) => {
    if (!confirm("Supprimer définitivement ce message ?")) return;

    console.log("Tentative de suppression de l'ID :", id); // Debug

    try {
      const res = await fetch(`${API_URL}/api/messages/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        console.log("Suppression réussie côté serveur");
        // On met à jour l'interface locale
        setMessages((prev) => prev.filter((m) => (m._id || m.id) !== id));
        setSelectedMessage(null);
      } else {
        const errorData = await res.json();
        console.error("Le serveur a refusé la suppression :", errorData);
        alert("Erreur serveur : impossible de supprimer.");
      }
    } catch (error) {
      console.error("Erreur réseau ou crash lors de la suppression :", error);
      alert("Erreur de connexion au serveur.");
    }
  };

  return (
    <AdminAuth>
      <div className="min-h-screen bg-[#0F0F0F] text-stone-300 p-8 md:p-12">
        <header className="flex justify-between items-center mb-12 mt-20">
          <h1 className="text-xl text-white tracking-widest uppercase">
            Messages{" "}
            <span className="text-stone-600 ml-2">({messages.length})</span>
          </h1>
        </header>

        <div className="grid grid-cols-12 gap-8">
          {/* COLONNE GAUCHE : LISTE */}
          <div className="col-span-12 lg:col-span-4 space-y-2 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            {loading ? (
              <div className="flex items-center gap-2 py-4">
                <Loader2 className="animate-spin size-4" /> Chargement...
              </div>
            ) : messages.length === 0 ? (
              <p className="text-sm opacity-50">
                Aucun message en boîte de réception.
              </p>
            ) : (
              messages.map((m) => (
                <div
                  key={m._id}
                  onClick={() => handleSelectMessage(m)}
                  className={`p-5 border transition-all duration-300 cursor-pointer relative group ${
                    selectedMessage?._id === m._id
                      ? "bg-[#1A1A1A] border-white/20 shadow-xl"
                      : "bg-[#141414] border-white/5 hover:border-white/10"
                  }`}
                >
                  {/* Pastille Nouveau (Bleue) */}
                  {!m.read && (
                    <div className="absolute top-5 right-5 flex items-center gap-2">
                      <span className="text-[9px] font-bold text-blue-500 uppercase tracking-tighter">
                        New
                      </span>
                      <Circle className="size-2 fill-blue-500 text-blue-500 animate-pulse" />
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <span
                      className={`text-sm transition-colors ${!m.read ? "text-white font-semibold" : "text-stone-400 font-normal"}`}
                    >
                      {m.name}
                    </span>
                    <span className="text-[10px] opacity-40 font-mono">
                      {formatDate(m.createdAt)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* COLONNE DROITE : DÉTAIL */}
          <div className="col-span-12 lg:col-span-8">
            {selectedMessage ? (
              <div className="p-8 bg-[#141414] border border-white/10 rounded-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h2 className="text-white text-3xl font-light mb-2">
                      {selectedMessage.name}
                    </h2>
                    <p className="text-xs text-stone-500 font-mono uppercase tracking-widest">
                      Reçu le{" "}
                      {new Date(selectedMessage.createdAt).toLocaleDateString(
                        "fr-FR",
                        {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="p-2 text-stone-600 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                    title="Supprimer"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>

                <div className="flex items-center gap-3 text-sm mb-10 text-stone-400 bg-white/5 w-fit px-4 py-2 rounded-full border border-white/5">
                  <Mail size={14} className="text-stone-500" />
                  <span className="tracking-wider">
                    {selectedMessage.phone}
                  </span>
                </div>

                <div className="relative group">
                  <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-blue-500/50 group-hover:bg-blue-500 transition-colors" />
                  <p className="text-stone-200 text-lg leading-relaxed pl-4 whitespace-pre-wrap font-light italic">
                    "{selectedMessage.message}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center border border-white/5 border-dashed rounded-lg opacity-20">
                <Mail size={40} className="mb-4" />
                <p className="text-sm uppercase tracking-[0.2em]">
                  Sélectionnez un message
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminAuth>
  );
}
