export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary-dark">Documents</h1>
      <p className="text-sm">
        Cette page affichera la liste des documents liés à votre copropriété :
        procès-verbaux, règlements, contrats, devis, etc.
      </p>
      <ul className="space-y-2">
        <li className="p-4 bg-white rounded-md shadow">
          <h2 className="font-semibold text-primary-dark">Procès-verbaux</h2>
          <p className="text-sm">
            Retrouvez les comptes rendus des assemblées générales.
          </p>
        </li>
        <li className="p-4 bg-white rounded-md shadow">
          <h2 className="font-semibold text-primary-dark">Règlements</h2>
          <p className="text-sm">
            Consultez le règlement de copropriété et ses annexes.
          </p>
        </li>
        <li className="p-4 bg-white rounded-md shadow">
          <h2 className="font-semibold text-primary-dark">Contrats & Devis</h2>
          <p className="text-sm">
            Accédez aux contrats d’entretien, assurances et aux devis en cours.
          </p>
        </li>
      </ul>
    </div>
  );
}