"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Lot {
  id: string;
  name: string;
}

export default function NewLocatairePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [lotId, setLotId] = useState<string | "">("");
  const [lots, setLots] = useState<Lot[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/lots")
      .then((res) => res.json())
      .then((data) => setLots(data || []))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!lotId) {
      setError("Veuillez sélectionner un lot");
      return;
    }
    try {
      const res = await fetch("/api/locataires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, lotId }),
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
        Nouveau locataire
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
            placeholder="Jean Dupont"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-primary-dark">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="jean@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-primary-dark">
            Téléphone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="06 01 02 03 04"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-primary-dark">
            Lot
          </label>
          <select
            value={lotId}
            onChange={(e) => setLotId(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="">– Choisir un lot –</option>
            {lots.map((lot) => (
              <option key={lot.id} value={lot.id}>
                {lot.name}
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