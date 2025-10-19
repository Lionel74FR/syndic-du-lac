"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Copropriete {
  id: string;
  name: string;
}

export default function NewLotPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coproprieteId, setCoproprieteId] = useState<string | "">("");
  const [coproprietes, setCoproprietes] = useState<Copropriete[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Charger la liste des copropriétés
    fetch("/api/coproprietes")
      .then((res) => res.json())
      .then((data) => setCoproprietes(data || []))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/lots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, coproprieteId: coproprieteId || undefined }),
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
        Nouveau lot
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
            placeholder="Lot A12"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-primary-dark">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Appartement T3 avec balcon"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary-dark">
            Copropriété
          </label>
          <select
            value={coproprieteId}
            onChange={(e) => setCoproprieteId(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="">– Choisir une copropriété –</option>
            {coproprietes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
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