"use client";

import { useEffect, useState } from "react";

interface Lot {
  id: string;
  name: string;
  description?: string;
  copropriete?: { id: string; name: string };
}

/**
 * Page listing all lots.  Loads lots from the `/api/lots` endpoint and
 * displays their name, description and associated copropriété.  This is a
 * simple client component that performs the fetch on mount.  In a more
 * advanced app you might use server components or SWR to handle data
 * fetching and caching.
 */
export default function LotsPage() {
  const [lots, setLots] = useState<Lot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/lots")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors du chargement");
        }
        return res.json();
      })
      .then((data) => {
        setLots(data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger les lots");
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold text-primary-dark">Lots</h1>
      {loading && <p>Chargement…</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {!loading && lots.length === 0 && !error && <p>Aucun lot pour le moment.</p>}
      {!loading && lots.length > 0 && (
        <ul className="space-y-2">
          {lots.map((lot) => (
            <li
              key={lot.id}
              className="p-3 border border-gray-200 rounded-md bg-white shadow-sm"
            >
              <div className="font-semibold text-primary-dark">{lot.name}</div>
              {lot.description && (
                <div className="text-sm text-gray-600">{lot.description}</div>
              )}
              {lot.copropriete && (
                <div className="text-xs text-gray-500">
                  Copropriété&nbsp;: {lot.copropriete.name}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}