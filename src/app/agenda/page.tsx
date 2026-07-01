import PagekraftBooking from "@/components/pagekraft/PagekraftBooking";

export default function Agenda() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white">Agenda de Aulas</h1>
        <p className="mt-3 text-foreground-muted">Escolha seu horário e garanta sua vaga.</p>
      </div>

      <div className="mt-12 rounded-2xl border border-white/10 bg-brand-elevated p-4">
        <PagekraftBooking />
      </div>
    </div>
  );
}
