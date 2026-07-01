const schedule: Record<string, { time: string; name: string; instructor: string; slots: number }[]> = {
  "Segunda": [
    { time: "06:00", name: "Spinning", instructor: "Carlos", slots: 20 },
    { time: "08:00", name: "Yoga", instructor: "Ana", slots: 15 },
    { time: "10:00", name: "Musculação Funcional", instructor: "Lucas", slots: 12 },
    { time: "18:00", name: "Muay Thai", instructor: "Rafael", slots: 18 },
    { time: "20:00", name: "Pilates", instructor: "Júlia", slots: 10 },
  ],
  "Terça": [
    { time: "07:00", name: "Boxe", instructor: "Rafael", slots: 16 },
    { time: "09:00", name: "Pilates", instructor: "Júlia", slots: 10 },
    { time: "17:00", name: "Spinning", instructor: "Carlos", slots: 20 },
    { time: "19:00", name: "Jiu-Jitsu", instructor: "Pedro", slots: 14 },
  ],
  "Quarta": [
    { time: "06:00", name: "Yoga", instructor: "Ana", slots: 15 },
    { time: "08:00", name: "Musculação Funcional", instructor: "Lucas", slots: 12 },
    { time: "18:00", name: "Spinning", instructor: "Carlos", slots: 20 },
    { time: "20:00", name: "Muay Thai", instructor: "Rafael", slots: 18 },
  ],
  "Quinta": [
    { time: "07:00", name: "Pilates", instructor: "Júlia", slots: 10 },
    { time: "09:00", name: "Boxe", instructor: "Rafael", slots: 16 },
    { time: "17:00", name: "Yoga", instructor: "Ana", slots: 15 },
    { time: "19:00", name: "Spinning", instructor: "Carlos", slots: 20 },
  ],
  "Sexta": [
    { time: "06:00", name: "Musculação Funcional", instructor: "Lucas", slots: 12 },
    { time: "08:00", name: "Jiu-Jitsu", instructor: "Pedro", slots: 14 },
    { time: "18:00", name: "Pilates", instructor: "Júlia", slots: 10 },
    { time: "20:00", name: "Boxe", instructor: "Rafael", slots: 16 },
  ],
  "Sábado": [
    { time: "08:00", name: "Spinning", instructor: "Carlos", slots: 20 },
    { time: "09:30", name: "Yoga", instructor: "Ana", slots: 15 },
    { time: "11:00", name: "Muay Thai", instructor: "Rafael", slots: 18 },
  ],
};

const tagColors: Record<string, string> = {
  Spinning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  Yoga: "bg-green-500/10 text-green-400 border-green-500/30",
  "Musculação Funcional": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Muay Thai": "bg-red-500/10 text-red-400 border-red-500/30",
  Pilates: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  Boxe: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  "Jiu-Jitsu": "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
};

export default function Agenda() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold">Agenda de Aulas</h1>
        <p className="mt-3 text-zinc-400">Escolha seu horário e garanta sua vaga.</p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(schedule).map(([day, classes]) => (
          <div key={day} className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden">
            <div className="border-b border-zinc-800 bg-zinc-800/50 px-5 py-3">
              <h2 className="font-bold text-orange-400">{day}</h2>
            </div>
            <div className="divide-y divide-zinc-800">
              {classes.map((cls) => (
                <div key={`${day}-${cls.time}`} className="flex items-center justify-between px-5 py-4 hover:bg-zinc-800/40 transition">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 w-12 shrink-0 text-sm font-mono text-zinc-500">{cls.time}</span>
                    <div>
                      <span className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${tagColors[cls.name] ?? "bg-zinc-800 text-zinc-300 border-zinc-700"}`}>
                        {cls.name}
                      </span>
                      <p className="mt-1 text-xs text-zinc-500">Prof. {cls.instructor}</p>
                    </div>
                  </div>
                  <button className="shrink-0 rounded-full border border-orange-500/50 px-3 py-1 text-xs text-orange-400 transition hover:bg-orange-500 hover:text-white">
                    {cls.slots} vagas
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
