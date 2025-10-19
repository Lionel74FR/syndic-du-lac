"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPropertyPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/proprietes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address }),
      });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Erreur");
      }
    } catch (err) {
      setError("Erreur réseau");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4 text-primary-dark">
        Nouvelle propriété
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary-dark">
            Nom
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Résidence Bellevue"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-primary-dark">
            Adresse
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="1 rue des Alpes, Annecy"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded-md hover:bg-secondary-dark"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}