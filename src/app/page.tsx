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
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/15 via-transparent to-brand-blue/5" />
        <span className="relative mb-4 inline-block rounded-full border border-brand-teal/40 bg-brand-teal/10 px-4 py-1 text-sm font-medium text-brand-blue">
          #1 academia da cidade
        </span>
        <h1 className="relative text-5xl font-extrabold tracking-tight text-brand-blue md:text-7xl">
          Transforme seu<br />
          <span className="text-brand-teal">corpo e sua vida</span>
        </h1>
        <p className="relative mt-6 max-w-xl text-lg text-brand-blue/70">
          Infraestrutura completa, profissionais qualificados e uma comunidade que vai te motivar todos os dias.
        </p>
        <div className="relative mt-10 flex gap-4">
          <Link
            href="/pacotes"
            className="rounded-lg bg-brand-teal px-8 py-3 font-semibold text-brand-blue transition hover:brightness-110"
          >
            Ver pacotes
          </Link>
          <Link
            href="/agenda"
            className="rounded-lg border border-brand-blue/20 bg-white px-8 py-3 font-semibold text-brand-blue transition hover:border-brand-teal hover:text-brand-teal"
          >
            Ver agenda
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-brand-blue/10 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px md:grid-cols-4">
          {[
            { value: "5.000+", label: "Alunos ativos" },
            { value: "50+", label: "Modalidades" },
            { value: "15 anos", label: "De experiência" },
            { value: "24h", label: "Funcionamento" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center py-10">
              <span className="text-3xl font-bold text-brand-teal">{value}</span>
              <span className="mt-1 text-sm text-brand-blue/60">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-center text-3xl font-bold text-brand-blue">O que oferecemos</h2>
        <p className="mt-3 text-center text-brand-blue/60">
          Tudo que você precisa para alcançar seus objetivos.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-brand-blue/10 bg-white p-6 shadow-sm transition hover:border-brand-teal/40 hover:shadow-md"
            >
              <span className="text-4xl">{icon}</span>
              <h3 className="mt-4 font-semibold text-brand-blue">{title}</h3>
              <p className="mt-2 text-sm text-brand-blue/60">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl bg-gradient-to-r from-brand-blue to-brand-teal p-12 text-center text-white">
          <h2 className="text-3xl font-bold">Pronto para começar?</h2>
          <p className="mt-3 text-white/80">Primeira semana grátis. Sem compromisso.</p>
          <Link
            href="/pacotes"
            className="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-brand-blue transition hover:bg-brand-surface"
          >
            Escolher meu plano
          </Link>
        </div>
      </section>
    </>
  );
}
