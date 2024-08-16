export const LevelSection = () => {
  return (
    <div>
      <h2 className="text-slate-950 text-[32px] font-medium">
        Niveles y Modalidades
      </h2>
      <div className="py-2">
        <h4 className="text-slate-500 text-2xl font-medium">Niveles</h4>
        <div className="flex flex-col md:flex md:flex-row justify-between items-center gap-4 py-4">
            <div className="space-y-2">
              <h5 className="text-black text-base font-semibold">⭐ Básicoo</h5>
              <p className="text-slate-700 text-xs font-medium">
                Podrás mantener una conversación sobre temas cotidianos. Lograrás
                comprender frases y usar el vocabulario más frecuente, además de
                redactar notas y mensajes breves.
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="text-black text-base font-semibold">
                ⭐⭐ Intermedio
              </h5>
              <p className="text-slate-700 text-xs font-medium">
                Lograrás expresarte en inglés con total naturalidad explicando y
                defendiendo tu punto de vista. Podrás comprender películas, series
                y redactar informes.
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="text-black text-base font-semibold">
                ⭐⭐⭐ Avanzado
              </h5>
              <p className="text-slate-700 text-xs font-medium">
                Lograrás expresarte con fluidéz en ambientes sociales y
                profesionales presentando argumentos con expresiones idiomáticas
                correctas
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};
