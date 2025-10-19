import "../app/globals.css";
import Header from "../components/Header";
import Providers from "./providers";

export const metadata = {
  title: "SDL – Syndic du Lac",
  description: "Plateforme de gestion de syndic pour La Conciergerie du Lac.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <Header />
          <main className="container mx-auto py-6 px-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}