const features = [
  { icon: "🏋️", title: "Musculação", desc: "Equipamentos de última geração para seu treino de força." },
  { icon: "🥊", title: "Artes Marciais", desc: "Muay Thai, Jiu-Jitsu e Boxe com instrutores experientes." },
  { icon: "🧘", title: "Yoga & Pilates", desc: "Equilíbrio corpo e mente para uma vida mais saudável." },
  { icon: "🚴", title: "Cardio", desc: "Bike, esteira e aulas de spinning para queimar calorias." },
];

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-elevated/30" />
        <span className="relative mb-4 inline-block rounded-full border border-brand-primary/40 bg-brand-primary/10 px-4 py-1 text-sm font-medium text-brand-primary">
          #1 academia da cidade
        </span>
        <h1 className="relative text-5xl font-extrabold tracking-tight text-white md:text-7xl">
          Transforme seu<br />
          <span className="text-brand-primary">corpo e sua vida</span>
        </h1>
        <p className="relative mt-6 max-w-xl text-lg text-foreground-muted">
          Infraestrutura completa, profissionais qualificados e uma comunidade que vai te motivar todos os dias.
        </p>
        <div className="relative mt-10 flex gap-4">
          <a
            href="/pacotes"
            className="inline-flex items-center no-underline rounded-lg bg-brand-primary px-8 py-3 font-semibold !text-brand-bg transition hover:bg-brand-primary-hover"
          >
            Ver pacotes
          </a>
          <a
            href="/agenda"
            className="inline-flex items-center no-underline rounded-lg border border-brand-primary px-8 py-3 font-semibold !text-brand-primary transition hover:bg-brand-primary/10"
          >
            Ver agenda
          </a>
        </div>
      </section>

      <section className="border-y border-white/10 bg-brand-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-white/5 md:grid-cols-4">
          {[
            { value: "5.000+", label: "Alunos ativos" },
            { value: "50+", label: "Modalidades" },
            { value: "15 anos", label: "De experiência" },
            { value: "24h", label: "Funcionamento" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center bg-brand-surface py-10">
              <span className="text-3xl font-bold text-brand-primary">{value}</span>
              <span className="mt-1 text-sm text-foreground-muted">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-center text-3xl font-bold text-white">O que oferecemos</h2>
        <p className="mt-3 text-center text-foreground-muted">
          Tudo que você precisa para alcançar seus objetivos.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-brand-elevated p-6 transition hover:border-brand-primary/40"
            >
              <span className="text-4xl">{icon}</span>
              <h3 className="mt-4 font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-foreground-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-brand-primary/30 bg-brand-surface p-12 text-center">
          <h2 className="text-3xl font-bold text-brand-primary">Pronto para começar?</h2>
          <p className="mt-3 text-foreground-muted">Primeira semana grátis. Sem compromisso.</p>
          <a
            href="/pacotes"
            className="mt-8 inline-flex items-center no-underline rounded-lg bg-brand-primary px-8 py-3 font-semibold !text-brand-bg transition hover:bg-brand-primary-hover"
          >
            Escolher meu plano
          </a>
        </div>
      </section>
    </>
  );
}
