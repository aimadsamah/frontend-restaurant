"use client";
import { useState, useEffect } from "react";
import {
  Edit2,
  Plus,
  Trash2,
  X,
  LogOut,
  Eye,
  EyeOff,
  Image as ImageIcon,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/dishes";

export default function AdminMenu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // 1. CHARGER LES DONNÉES
  const fetchDishes = async () => {
    try {
      const res = await fetch(`${API_URL}/find`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Erreur chargement:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchDishes();
  }, [isAuthenticated]);

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (password === "admin") setIsAuthenticated(true);
  };

  // 2. GESTION DE L'IMAGE (LECTURE DU FICHIER)
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingItem({ ...editingItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // 3. ACTIONS API (TOGGLE, DELETE, SAVE)
  const toggleVisibility = async (item: any) => {
    const newStatus = item.status === "oui" ? "non" : "oui";
    try {
      await fetch(`${API_URL}/update/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchDishes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Supprimer ce plat définitivement ?")) {
      try {
        const res = await fetch(`${API_URL}/delete/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          // MISE À JOUR LOCALE : On retire l'item de l'état "items" sans attendre le serveur
          setItems((prevItems) =>
            prevItems.filter((item: any) => item._id !== id),
          );
          console.log("Supprimé avec succès");
        } else {
          alert("Erreur lors de la suppression");
        }
      } catch (err) {
        console.error("Erreur réseau:", err);
      }
    }
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    const method = editingItem._id ? "PUT" : "POST";
    const url = editingItem._id
      ? `${API_URL}/update/${editingItem._id}`
      : `${API_URL}/add`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });
      if (res.ok) {
        fetchDishes();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = (item: any = null) => {
    setEditingItem(
      item || {
        name: "",
        category: "entree",
        price: "",
        description: "",
        status: "oui",
        image: "",
      },
    );
    setIsModalOpen(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-[#0A0A0A] flex items-center justify-center px-4 text-stone-200">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h2 className="font-serif text-3xl italic">Accès Privé</h2>
            <p className="text-[9px] uppercase tracking-[0.3em] mt-2 text-stone-500 italic underline underline-offset-8">
              L'Etoile
            </p>
          </div>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 p-5 text-center focus:border-white outline-none transition-all"
            placeholder="Mot de passe"
          />
          <button className="w-full bg-white text-black py-5 font-bold text-[10px] uppercase tracking-[0.3em]">
            Valider
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-stone-300 pb-20">
      <header className="sticky top-0 z-30 bg-[#0F0F0F]/90 backdrop-blur-xl border-b border-white/5 p-6 pt-20">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl text-white font-light tracking-tight">
            Gestionnaire Menu
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => openModal()}
              className="bg-white p-3 text-black rounded-full flex items-center gap-2 px-6"
            >
              <Plus size={18} />
              <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">
                Nouveau
              </span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-white/5 p-3 text-stone-500 hover:text-white transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-4 md:p-12">
        <div className="grid gap-4">
          {items.map((item: any) => (
            <div
              key={item._id}
              className={`relative flex flex-col md:flex-row md:items-center justify-between p-6 transition-all duration-500 ${item.status === "oui" ? "bg-[#161616] border border-white/5 shadow-lg" : "bg-black border border-red-500/20 opacity-40 grayscale"}`}
            >
              <div className="flex items-center gap-5">
                <button
                  onClick={() => toggleVisibility(item)}
                  className={`p-3 rounded-full transition-all duration-300 ${item.status === "oui" ? "text-white bg-white/5 hover:bg-white/10" : "text-red-500 bg-red-500/10"}`}
                >
                  {item.status === "oui" ? (
                    <Eye size={22} />
                  ) : (
                    <EyeOff size={22} />
                  )}
                </button>
                {/* Petit aperçu image dans la liste */}
                <div className="w-12 h-12 bg-stone-900 overflow-hidden border border-white/5">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium text-lg">
                      {item.name}
                    </span>
                    {item.status === "non" && (
                      <span className="text-[8px] text-red-500 font-bold uppercase tracking-tighter">
                        ● Hors Ligne
                      </span>
                    )}
                  </div>
                  <p className="text-stone-500 text-sm italic">
                    {item.category} • {item.price}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 mt-6 md:mt-0 pt-4 md:pt-0 border-t border-white/5 md:border-none">
                <button
                  onClick={() => openModal(item)}
                  className="p-3 text-stone-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-3 text-stone-400 hover:text-red-500 hover:bg-red-500/5 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODALE D'ÉDITION */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSave}
            className="bg-[#161616] w-full max-w-lg p-8 border border-white/10 shadow-2xl space-y-6 my-auto"
          >
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <h2 className="text-white font-serif italic text-2xl">
                {editingItem._id ? "Éditer" : "Créer"}
              </h2>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {/* SECTION IMAGE */}
              <div className="flex flex-col gap-4 p-4 bg-black/40 border border-white/5 rounded-sm">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase tracking-widest text-stone-500">
                    Image du plat
                  </label>
                  {editingItem.image && (
                    <button
                      type="button"
                      onClick={() =>
                        setEditingItem({ ...editingItem, image: "" })
                      }
                      className="text-[9px] text-red-500 uppercase"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-24 h-24 bg-stone-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                    {editingItem.image ? (
                      <img
                        src={editingItem.image}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                    ) : (
                      <ImageIcon size={30} className="text-stone-700" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="block w-full text-center py-2 bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors">
                      Choisir un fichier
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Ou URL de l'image"
                      value={editingItem.image}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          image: e.target.value,
                        })
                      }
                      className="w-full bg-transparent border border-white/5 p-2 text-[10px] text-stone-400 outline-none focus:border-white/20"
                    />
                  </div>
                </div>
              </div>

              <input
                required
                type="text"
                placeholder="Nom du délice"
                value={editingItem.name}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, name: e.target.value })
                }
                className="w-full bg-black border border-white/10 p-4 text-white outline-none focus:border-white"
              />

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={editingItem.category}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, category: e.target.value })
                  }
                  className="w-full bg-black border border-white/10 p-4 text-white outline-none"
                >
                  <option value="entree">Entrées</option>
                  <option value="plat">Plats</option>
                  <option value="dessert">Desserts</option>
                  <option value="boisson">Boissons</option>
                </select>
                <input
                  required
                  type="text"
                  placeholder="Prix (ex: 750 DA)"
                  value={editingItem.price}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, price: e.target.value })
                  }
                  className="w-full bg-black border border-white/10 p-4 text-white outline-none focus:border-white"
                />
              </div>

              <textarea
                placeholder="Description / Ingrédients"
                value={editingItem.description}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    description: e.target.value,
                  })
                }
                className="w-full bg-black border border-white/10 p-4 text-white outline-none focus:border-white"
                rows={3}
              />
            </div>

            <button className="w-full bg-white text-black py-5 font-bold text-[10px] uppercase tracking-[0.3em]">
              Enregistrer
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
