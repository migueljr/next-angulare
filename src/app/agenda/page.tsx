import PagekraftBooking from "@/components/pagekraft/PagekraftBooking";

export default function Agenda() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-brand-blue">Agenda de Aulas</h1>
        <p className="mt-3 text-brand-blue/60">Escolha seu horário e garanta sua vaga.</p>
      </div>

      <div className="mt-12 rounded-2xl border border-brand-blue/10 bg-white p-4 shadow-sm">
        <PagekraftBooking />
      </div>
    </div>
  );
}
