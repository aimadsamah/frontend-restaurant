"use client";

import { useState, useEffect } from "react";
import Dish from "@/components/Dish";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// On garde les intros car elles ne sont pas dans votre modèle BDD actuel
const categoryIntros = {
  entree:
    "Une ouverture délicate, précise et saisonnière, pensée comme un prélude à l’expérience.",
  plat: "Des compositions structurées autour du produit et du geste du chef.",
  dessert: "Une finale élégante, légère et texturée.",
  boisson: "Une sélection pointue de vins et spiritueux d’exception.",
};

const categories = [
  { id: "entree", label: "Entrées" },
  { id: "plat", label: "Plats" },
  { id: "dessert", label: "Desserts" },
  { id: "boisson", label: "Boissons" },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("entree");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Appel à l'API
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/api/dishes/find`);
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des plats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  // Filtrer les plats selon la catégorie active et le statut "oui"
  const filteredDishes = dishes.filter(
    (dish) => dish.category === activeCategory && dish.status === "oui",
  );

  return (
    <section className="bg-[#0B0B0C] text-[#F5F3EF] min-h-screen py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Navigation des Catégories */}
        <div className="flex gap-8 md:gap-14 overflow-x-auto pb-6 border-b border-white/10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap uppercase tracking-[0.3em] text-xs transition-all duration-300 ${
                activeCategory === cat.id
                  ? "text-[#C6A75E]"
                  : "text-[#9F988C] hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Intro catégorie */}
        <div className="mt-16 mb-20 max-w-2xl">
          <p className="text-[#9F988C] text-lg font-light leading-relaxed">
            {categoryIntros[activeCategory]}
          </p>
        </div>

        {/* Liste des plats */}
        <div>
          {loading ? (
            <p className="text-center text-[#9F988C]">Chargement du menu...</p>
          ) : filteredDishes.length > 0 ? (
            filteredDishes.map((dish) => (
              <Dish
                key={dish._id} // Utilisation de l'ID MongoDB
                name={dish.name}
                description={dish.description}
                price={dish.price}
                image={dish.image}
              />
            ))
          ) : (
            <p className="text-[#9F988C] italic">
              Aucun plat disponible dans cette catégorie.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
