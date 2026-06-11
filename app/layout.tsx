import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ismael Larraín — Director Creativo & AI Content Showrunner",
  description:
    "Portfolio de Ismael Larraín, director creativo y AI Content Showrunner. Formatos, mundos narrativos, sistemas de contenido, IA generativa, social video y monetización digital.",
  openGraph: {
    title: "Ismael Larraín — Director Creativo & AI Content Showrunner",
    description:
      "Portfolio de Ismael Larraín, director creativo y AI Content Showrunner.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
