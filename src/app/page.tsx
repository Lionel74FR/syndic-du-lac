import Link from "next/link";

export default function Home() {
  return (
    <section className="text-center space-y-6">
      <h1 className="text-4xl font-bold text-primary-dark">
        Bienvenue sur Syndic du Lac
      </h1>
      <p className="text-lg max-w-xl mx-auto">
        SDL est votre logiciel de gestion de copropriété. Accédez à votre tableau
        de bord, consultez les documents, suivez les tickets et participez aux
        assemblées depuis une plateforme unique.
      </p>
      <div className="space-x-4">
        <Link
          href="/login"
          className="inline-block bg-secondary text-white px-6 py-3 rounded-md hover:bg-secondary-dark"
        >
          Se connecter
        </Link>
        <Link
          href="/dashboard"
          className="inline-block bg-primary-light text-white px-6 py-3 rounded-md hover:bg-primary-dark"
        >
          Découvrir le tableau de bord
        </Link>
      </div>
    </section>
  );
}