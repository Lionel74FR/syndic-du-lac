"use client";

import { useEffect, useState } from "react";

interface Locataire {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  lot?: { id: string; name: string };
}

/**
 * Page listing all locataires (tenants).  Loads the list of tenants from
 * the `/api/locataires` endpoint and displays their name, email, phone
 * number and associated lot.  Like other list pages, this is a client
 * component that fetches its own data on mount.
 */
export default function LocatairesPage() {
  const [locataires, setLocataires] = useState<Locataire[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/locataires")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors du chargement");
        }
        return res.json();
      })
      .then((data) => {
        setLocataires(data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger les locataires");
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold text-primary-dark">Locataires</h1>
      {loading && <p>Chargement…</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {!loading && locataires.length === 0 && !error && (
        <p>Aucun locataire pour le moment.</p>
      )}
      {!loading && locataires.length > 0 && (
        <ul className="space-y-2">
          {locataires.map((locataire) => (
            <li
              key={locataire.id}
              className="p-3 border border-gray-200 rounded-md bg-white shadow-sm"
            >
              <div className="font-semibold text-primary-dark">
                {locataire.name}
              </div>
              {locataire.email && (
                <div className="text-sm text-gray-600">{locataire.email}</div>
              )}
              {locataire.phone && (
                <div className="text-sm text-gray-600">{locataire.phone}</div>
              )}
              {locataire.lot && (
                <div className="text-xs text-gray-500">
                  Lot&nbsp;: {locataire.lot.name}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}