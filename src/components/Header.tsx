import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-primary dark:shadow-md text-white">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="text-xl font-bold">
          <Link href="/">SDL</Link>
        </div>
        <ul className="flex flex-wrap gap-4 text-sm font-medium text-white">
          {/* Lien vers le tableau de bord principal */}
          <li>
            <Link href="/dashboard" className="hover:text-secondary-light">
              Tableau de bord
            </Link>
          </li>
          {/* Section gestion des copropriétés */}
          <li>
            <Link href="/coproprietes" className="hover:text-secondary-light">
              Copropriétés
            </Link>
          </li>
          <li>
            <Link href="/lots" className="hover:text-secondary-light">
              Lots
            </Link>
          </li>
          <li>
            <Link href="/locataires" className="hover:text-secondary-light">
              Locataires
            </Link>
          </li>
          {/* Section ressources */}
          <li>
            <Link href="/documents" className="hover:text-secondary-light">
              Documents
            </Link>
          </li>
          <li>
            <Link href="/tickets" className="hover:text-secondary-light">
              Tickets
            </Link>
          </li>
          <li>
            <Link href="/meetings" className="hover:text-secondary-light">
              Assemblées
            </Link>
          </li>
          {/* Actions rapides de création */}
          <li>
            <Link href="/coproprietes/new" className="hover:text-secondary-light">
              + Copropriété
            </Link>
          </li>
          <li>
            <Link href="/lots/new" className="hover:text-secondary-light">
              + Lot
            </Link>
          </li>
          <li>
            <Link href="/locataires/new" className="hover:text-secondary-light">
              + Locataire
            </Link>
          </li>
          {/* Authentification */}
          <li>
            <Link href="/login" className="hover:text-secondary-light">
              Connexion
            </Link>
          </li>
          <li>
            <Link href="/register" className="hover:text-secondary-light">
              Inscription
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;