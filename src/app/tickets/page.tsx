"use client";

import { useState } from "react";

interface Ticket {
  id: number;
  title: string;
  status: "Ouvert" | "En cours" | "Clos";
}

export default function TicketsPage() {
  const [tickets] = useState<Ticket[]>([
    { id: 1, title: "Fuite toiture", status: "En cours" },
    { id: 2, title: "Interphone en panne", status: "Ouvert" },
  ]);

  const handleNewTicket = () => {
    // TODO: implémenter la création de ticket
    alert("Fonctionnalité à venir : création de ticket");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary-dark">Tickets</h1>
        <button
          onClick={handleNewTicket}
          className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary-dark"
        >
          Nouveau ticket
        </button>
      </div>
      <p className="text-sm">
        Suivez et gérez vos demandes d&apos;intervention et incidents.
      </p>
      <ul className="space-y-2">
      {tickets.map((ticket) => (
        <li
          key={ticket.id}
          className="p-4 bg-white rounded-md shadow flex justify-between items-center"
        >
          <div>
            <h2 className="font-semibold text-primary-dark">{ticket.title}</h2>
            <p className="text-sm">{ticket.status}</p>
          </div>
          <button
            onClick={() => alert(`Ouvrir le ticket #${ticket.id}`)}
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