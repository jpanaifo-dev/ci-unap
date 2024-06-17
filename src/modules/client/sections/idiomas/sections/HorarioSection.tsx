import TextOption from "@/components/docentes/ListOptions";

export const HorarioSection = () => {
  return (
    <div>
      <main className="flex flex-col gap-4 pb-8">
        <h2 className="text-slate-950 text-[32px] font-medium">Horarios</h2>
        <div>
          <h4 className="text-slate-500 text-2xl font-medium pb-4">
            Modalidad intensiva
          </h4>
          <div>
            <TextOption
              title="De lunes a viernes"
              body="- turnos mañana, tarde y noche"
            />
          </div>
        </div>
        <div>
          <h4 className="text-slate-500 text-2xl font-medium pb-4">
            Modalidad Regular
          </h4>
          <div>
            <TextOption
              title="De lunes a viernes"
              body="- turnos mañana, tarde y noche"
            />
          </div>
        </div>
      </main>
    </div>
  );
};
