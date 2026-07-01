import Link from "next/link";

const plans = [
  {
    name: "Básico",
    price: "89",
    period: "mês",
    description: "Ideal para quem está começando.",
    highlight: false,
    features: [
      "Acesso à musculação",
      "Horário comercial (6h–18h)",
      "Vestiários",
      "1 avaliação física/ano",
    ],
    missing: ["Aulas coletivas", "Personal trainer", "Acesso 24h"],
  },
  {
    name: "Premium",
    price: "149",
    period: "mês",
    description: "O mais popular. Acesso completo.",
    highlight: true,
    features: [
      "Acesso à musculação",
      "Acesso 24h",
      "Aulas coletivas ilimitadas",
      "Vestiários + sauna",
      "2 avaliações físicas/ano",
      "App de treinos",
    ],
    missing: ["Personal trainer"],
  },
  {
    name: "Elite",
    price: "299",
    period: "mês",
    description: "Para quem quer resultado acelerado.",
    highlight: false,
    features: [
      "Tudo do Premium",
      "8 sessões de personal/mês",
      "Nutricionista parceiro",
      "Avaliações físicas mensais",
      "Área VIP exclusiva",
      "Prioridade nas vagas",
    ],
    missing: [],
  },
];

export default function Pacotes() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold">Planos e Pacotes</h1>
        <p className="mt-3 text-zinc-400">Sem taxas escondidas. Cancele quando quiser.</p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col rounded-2xl border p-8 transition ${
              plan.highlight
                ? "border-orange-500 bg-orange-500/5 shadow-lg shadow-orange-500/10"
                : "border-zinc-800 bg-zinc-900"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white">
                MAIS POPULAR
              </span>
            )}

            <div>
              <h2 className="text-lg font-bold">{plan.name}</h2>
              <p className="mt-1 text-sm text-zinc-400">{plan.description}</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="text-sm text-zinc-500">R$</span>
                <span className="text-5xl font-extrabold">{plan.price}</span>
                <span className="mb-1 text-sm text-zinc-500">/{plan.period}</span>
              </div>
            </div>

            <ul className="mt-8 flex flex-col gap-3 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span className="text-green-400">✓</span>
                  {f}
                </li>
              ))}
              {plan.missing.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-zinc-600 line-through">
                  <span>✗</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="#"
              className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition ${
                plan.highlight
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
              }`}
            >
              Assinar {plan.name}
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ rápido */}
      <div className="mt-20">
        <h2 className="text-center text-2xl font-bold">Perguntas frequentes</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            { q: "Posso cancelar a qualquer momento?", a: "Sim, sem multa ou taxa de cancelamento." },
            { q: "Há taxa de matrícula?", a: "Não cobramos taxa de matrícula em nenhum plano." },
            { q: "Posso trocar de plano?", a: "Sim, a troca é feita a qualquer momento pelo app." },
            { q: "A academia funciona nos feriados?", a: "Sim, temos funcionamento 24h todos os dias do ano." },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="font-semibold">{q}</p>
              <p className="mt-2 text-sm text-zinc-400">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
