"use client";

import { useState, useEffect } from "react";

interface Copropriete {
  id: string;
  name: string;
  address: string;
}

/**
 * Page listing all copropriétés.  This page fetches the list of copropriétés
 * from the `/api/coproprietes` endpoint and displays their names and
 * adresses.  It is a client component so that it can fetch data on mount
 * using the browser's fetch API.  If you later add a server component
 * version, you can replace this with an async function and call `fetch`
 * directly.
 */
export default function CoproprietesPage() {
  const [coproprietes, setCoproprietes] = useState<Copropriete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/coproprietes")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors du chargement");
        }
        return res.json();
      })
      .then((data) => {
        setCoproprietes(data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger les copropriétés");
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold text-primary-dark">Mes copropriétés</h1>
      {loading && <p>Chargement…</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {!loading && coproprietes.length === 0 && !error && (
        <p>Aucune copropriété pour le moment.</p>
      )}
      {!loading && coproprietes.length > 0 && (
        <ul className="space-y-2">
          {coproprietes.map((copro) => (
            <li
              key={copro.id}
              className="p-3 border border-gray-200 rounded-md bg-white shadow-sm"
            >
              <div className="font-semibold text-primary-dark">{copro.name}</div>
              <div className="text-sm text-gray-600">{copro.address}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}