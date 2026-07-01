import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PagekraftAuthScripts from "@/components/pagekraft/PagekraftAuthScripts";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitZone Academia",
  description: "A melhor academia da cidade",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-surface text-foreground">
        <PagekraftAuthScripts />
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-brand-blue/10 bg-white py-6 text-center text-sm text-brand-blue/60">
          © {new Date().getFullYear()} FitZone Academia. Todos os direitos reservados.
        </footer>
      </body>
    </html>
  );
}
