"use client";
import { useState } from "react";

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);

  const checkPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "admin") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#0A0A0A] flex items-center justify-center p-6">
        <form onSubmit={checkPassword} className="w-full max-w-xs space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-white font-serif text-3xl italic">Sécurité</h2>
            <p className="text-[10px] text-stone-500 uppercase tracking-widest">
              Accès Admin
            </p>
          </div>

          <input
            autoFocus
            type="password"
            placeholder="Mot de passe"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className={`w-full bg-[#111] border ${
              error ? "border-red-500" : "border-stone-800"
            } p-4 text-center text-white outline-none focus:border-white transition-all`}
          />

          {error && (
            <p className="text-red-500 text-[10px] text-center uppercase font-bold">
              Accès Refusé
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-white text-black py-4 font-bold text-[11px] uppercase tracking-[0.2em]"
          >
            Déverrouiller
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
