export const IntensiveModalitySection = () => {
  return (
    <div>
      <h4 className="text-slate-500 text-2xl font-medium">
        Modalidad intensiva
      </h4>
      <table className="w-full">
        <thead>
          <tr className="text-white font-medium bg-green-900 px-4 py-1 text-sm md:text-base">
            <th>Niveles</th>
            <th>Módulos</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-sm md:text-base">
            <td>
              <div className="p-1 md:p-4 flex flex-col justify-between items-start text-slate-600 text-sm md:text-base">
                <p>Básico</p>
                <p>Intermedio</p>
                <p>Avanzado</p>
              </div>
            </td>
            <td>
              <div className="p-1 md:p-4 flex flex-col justify-start items-start text-slate-600 text-sm md:text-base">
                <p>Básico 1, 2, 3, 4, 5, 6, 7, 8</p>
                <p>Intermedio 1, 2, 3, 4, 5, 6, 7, 8</p>
                <p>Avanzado 1, 2, 3, 4, 5, 6, 7, 8</p>
              </div>
            </td>
            <td>
              <div className="p-1 md:p-4 flex flex-col justify-start items-start text-slate-600 text-sm md:text-base">
                <p>1 mes por cada módulo</p>
                <p>1 mes por cada módulo</p>
                <p>1 mes por cada módulo</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
