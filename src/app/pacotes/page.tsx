import PagekraftCatalogue from "@/components/pagekraft/PagekraftCatalogue";

export default function Pacotes() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white">Planos e Pacotes</h1>
        <p className="mt-3 text-foreground-muted">Sem taxas escondidas. Cancele quando quiser.</p>
      </div>

      <div className="mt-12 rounded-2xl border border-white/10 bg-brand-elevated p-4">
        <PagekraftCatalogue />
      </div>

      <div className="mt-20">
        <h2 className="text-center text-2xl font-bold text-white">Perguntas frequentes</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            { q: "Posso cancelar a qualquer momento?", a: "Sim, sem multa ou taxa de cancelamento." },
            { q: "Há taxa de matrícula?", a: "Não cobramos taxa de matrícula em nenhum plano." },
            { q: "Posso trocar de plano?", a: "Sim, a troca é feita a qualquer momento pelo app." },
            { q: "A academia funciona nos feriados?", a: "Sim, temos funcionamento 24h todos os dias do ano." },
          ].map(({ q, a }) => (
            <div
              key={q}
              className="rounded-xl border border-white/10 bg-brand-elevated p-5"
            >
              <p className="font-semibold text-white">{q}</p>
              <p className="mt-2 text-sm text-foreground-muted">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
