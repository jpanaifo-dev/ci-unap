
export const GuideSection = () => {
  return (
    <div>
        <main className="flex flex-col gap-4 pb-8">
              <h2 className="text-slate-950 text-[32px] font-medium">
                Información para el alumno
              </h2>
              <p className="text-slate-600 text-base font-medium">
                Conoce la guía del Programa para Jóvenes y Adultos{" "}
                <span className="underline text-blue-400 hover:cursor-pointer">
                  aquí
                </span>
                . y nuestro Reglamento CIUNAP{" "}
                <span className="underline text-blue-400 hover:cursor-pointer">
                  aquí
                </span>
                . Conoce los lineamos generales del Programa Internacional
                Jóvenes y Adultos{" "}
                <span className="underline text-blue-400 hover:cursor-pointer">
                  aquí
                </span>
                .
              </p>
            </main>
    </div>
  )
}
