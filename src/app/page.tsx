import Link from "next/link";

const features = [
  { icon: "🏋️", title: "Musculação", desc: "Equipamentos de última geração para seu treino de força." },
  { icon: "🥊", title: "Artes Marciais", desc: "Muay Thai, Jiu-Jitsu e Boxe com instrutores experientes." },
  { icon: "🧘", title: "Yoga & Pilates", desc: "Equilíbrio corpo e mente para uma vida mais saudável." },
  { icon: "🚴", title: "Cardio", desc: "Bike, esteira e aulas de spinning para queimar calorias." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent" />
        <span className="mb-4 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-sm text-orange-400">
          #1 academia da cidade
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
          Transforme seu<br />
          <span className="text-orange-500">corpo e sua vida</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-zinc-400">
          Infraestrutura completa, profissionais qualificados e uma comunidade que vai te motivar todos os dias.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/pacotes"
            className="rounded-full bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Ver pacotes
          </Link>
          <Link
            href="/agenda"
            className="rounded-full border border-zinc-700 px-8 py-3 font-semibold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
          >
            Ver agenda
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px md:grid-cols-4">
          {[
            { value: "5.000+", label: "Alunos ativos" },
            { value: "50+", label: "Modalidades" },
            { value: "15 anos", label: "De experiência" },
            { value: "24h", label: "Funcionamento" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center py-10">
              <span className="text-3xl font-bold text-orange-500">{value}</span>
              <span className="mt-1 text-sm text-zinc-400">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-center text-3xl font-bold">O que oferecemos</h2>
        <p className="mt-3 text-center text-zinc-400">Tudo que você precisa para alcançar seus objetivos.</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-orange-500/40"
            >
              <span className="text-4xl">{icon}</span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl bg-gradient-to-r from-orange-600 to-orange-500 p-12 text-center">
          <h2 className="text-3xl font-bold">Pronto para começar?</h2>
          <p className="mt-3 text-orange-100">Primeira semana grátis. Sem compromisso.</p>
          <Link
            href="/pacotes"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
          >
            Escolher meu plano
          </Link>
        </div>
      </section>
    </>
  );
}
