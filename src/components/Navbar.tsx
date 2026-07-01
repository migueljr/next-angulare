"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", hardNav: false },
  { href: "/agenda", label: "Agenda", hardNav: true },
  { href: "/pacotes", label: "Pacotes", hardNav: true },
];

const btnTeal =
  "rounded-lg bg-brand-teal px-4 py-2 text-sm font-semibold text-brand-blue cursor-pointer transition hover:brightness-110";
const btnWhite =
  "rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-blue cursor-pointer transition hover:bg-brand-surface";
const btnOutline =
  "rounded-lg border border-brand-teal px-4 py-2 text-sm font-semibold text-brand-teal cursor-pointer transition hover:bg-brand-teal/10";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-brand-blue text-white shadow-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          Fit<span className="text-brand-teal">Zone</span>
        </Link>

        <nav className="flex gap-6">
          {links.map(({ href, label, hardNav }) => {
            const className = `text-sm font-medium transition-colors ${
              pathname === href
                ? "text-brand-teal"
                : "text-white/80 hover:text-white"
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

        {/* Hooks do Pagekraft Auth — o plugin controla visibilidade e cliques */}
        <div className="flex flex-wrap items-center gap-2">
          <a href="/pacotes" className={btnTeal}>
            Comprar
          </a>

          <a href="/agenda" className={btnWhite}>
            Reservar
          </a>

          <span className={`${btnOutline} pagekraft-auth-register`}>Cadastrar</span>

          <span className={`${btnOutline} pagekraft-auth-login`}>Login</span>

          <span className={`${btnOutline} pagekraft-auth-logout`}>Logout</span>

          <span className={`${btnOutline} pagekraft-auth-passwordforgot`}>
            Esqueci minha senha
          </span>

          <span className={`${btnWhite} pagekraft-auth-checkout`}>Carrinho</span>

          <span className={`${btnOutline} pagekraft-auth-my-account`}>Minha conta</span>

          <span className="rounded-lg px-2 py-1 text-sm font-semibold text-brand-teal pagekraft-auth-fullname">
            Olá usuário
          </span>

          <div className="pagekraft-auth-credits text-sm font-medium text-brand-teal" />
        </div>
      </div>
    </header>
  );
}
