"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", hardNav: false },
  { href: "/agenda", label: "Agenda", hardNav: true },
  { href: "/pacotes", label: "Pacotes", hardNav: true },
];

const btnPrimary =
  "inline-flex items-center no-underline rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold !text-brand-bg cursor-pointer transition hover:bg-brand-primary-hover";
const btnOutline =
  "inline-flex items-center no-underline rounded-lg border border-brand-primary px-4 py-2 text-sm font-semibold !text-brand-primary cursor-pointer transition hover:bg-brand-primary/10";
const btnGhost =
  "inline-flex items-center no-underline rounded-lg border border-white/15 bg-brand-elevated px-4 py-2 text-sm font-semibold !text-white cursor-pointer transition hover:border-brand-primary/50 hover:!text-brand-primary";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-surface text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="no-underline text-xl font-bold tracking-tight !text-white">
          Fit<span className="text-brand-primary">Zone</span>
        </Link>

        <nav className="flex gap-6">
          {links.map(({ href, label, hardNav }) => {
            const className = `no-underline text-sm font-medium transition-colors ${
              pathname === href
                ? "!text-brand-primary"
                : "!text-white/70 hover:!text-white"
            }`;

            return hardNav ? (
              <a key={href} href={href} className={className}>
                {label}
              </a>
            ) : (
              <Link key={href} href={href} className={className}>
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          <a href="/pacotes" className={btnPrimary}>
            Comprar
          </a>

          <a href="/agenda" className={btnGhost}>
            Reservar
          </a>

          <span className={`${btnOutline} pagekraft-auth-register`}>Cadastrar</span>
          <span className={`${btnOutline} pagekraft-auth-login`}>Login</span>
          <span className={`${btnOutline} pagekraft-auth-logout`}>Logout</span>
          <span className={`${btnOutline} pagekraft-auth-passwordforgot`}>
            Esqueci minha senha
          </span>
          <span className={`${btnGhost} pagekraft-auth-checkout`}>Carrinho</span>
          <span className={`${btnOutline} pagekraft-auth-my-account`}>Minha conta</span>

          <span className="rounded-lg px-2 py-1 text-sm font-semibold text-brand-primary pagekraft-auth-fullname">
            Olá usuário
          </span>

          <div className="pagekraft-auth-credits text-sm font-medium text-brand-primary" />
        </div>
      </div>
    </header>
  );
}
