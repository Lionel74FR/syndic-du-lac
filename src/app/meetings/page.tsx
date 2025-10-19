"use client";

import { useState } from "react";

interface Meeting {
  id: number;
  title: string;
  date: string;
  status: "À venir" | "Terminé";
}

export default function MeetingsPage() {
  const [meetings] = useState<Meeting[]>([
    { id: 1, title: "Assemblée Générale Ordinaire", date: "2025-11-15", status: "À venir" },
    { id: 2, title: "Réunion Conseil Syndical", date: "2025-09-05", status: "Terminé" },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary-dark">Assemblées & Réunions</h1>
      <p className="text-sm">
        Consultez les dates des assemblées générales et des réunions du conseil
        syndical, et accédez aux ordres du jour et aux procès-verbaux.
      </p>
      <ul className="space-y-2">
        {meetings.map((meeting) => (
          <li
            key={meeting.id}
            className="p-4 bg-white rounded-md shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-primary-dark">
                {meeting.title}
              </h2>
              <p className="text-sm">
                {new Date(meeting.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                – {meeting.status}
              </p>
            </div>
            <button
              onClick={() => alert(`Ouvrir la réunion #${meeting.id}`)}
              className="text-secondary hover:underline text-sm"
            >
              Voir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}