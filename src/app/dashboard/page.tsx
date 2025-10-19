export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary-dark">Tableau de bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-md shadow">
          <h2 className="text-xl font-semibold mb-2 text-primary-dark">
            Solde et appels de fonds
          </h2>
          <p className="text-sm">
            Consultez votre solde de charges et les appels de fonds en cours.
          </p>
        </div>
        <div className="p-4 bg-white rounded-md shadow">
          <h2 className="text-xl font-semibold mb-2 text-primary-dark">
            Documents récents
          </h2>
          <p className="text-sm">
            Accédez rapidement aux PV, règlements et autres documents partagés.
          </p>
        </div>
        <div className="p-4 bg-white rounded-md shadow">
          <h2 className="text-xl font-semibold mb-2 text-primary-dark">
            Tickets en cours
          </h2>
          <p className="text-sm">
            Suivez vos demandes et incidents en cours et leur avancement.
          </p>
        </div>
      </div>
    </div>
  );
}