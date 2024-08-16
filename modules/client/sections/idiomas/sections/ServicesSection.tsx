import TextOption from "@/components/docentes/ListOptions";

export const ServicesSection = () => {
  return (
    <div>
      <main className="flex flex-col gap-4 pb-8">
        <h2 className="text-slate-950 text-[32px] font-medium">
          Servicios y trámites
        </h2>
        <p className="text-black text-base font-medium">
          Podrás realizar tus trámites desde la comodidad de tu casa o desde
          donde te encuentres:
        </p>
        <div>
          <TextOption
            title="Matrícula Online:"
            body=" matricúlate ingresando a matricula.icpna.edu.pe elige tu curso y horario y realiza el pago a través de la banca móvil, banca por internet, agentes u oficinas de BCP, BBVA Continental, Interbank o Scotiabank."
          />
          <TextOption
            title="Trámite de rezagados:"
            body="El término aplica para los cursos de SIU que el alumno pueda haber desaprobado o tenga pendientes de llevar.  Para recuperar estos cursos el alumno tendrá que pagar un trámite de rezagado ascendente a S/80 (soles) por curso omitido de cualquier nivel.
                  El alumno que culmine un nivel (Básico, Intermedio o Avanzado) y tenga cursos SIU pendientes por llevar tendrá un plazo máximo de 6 meses para regularizarlos, contabilizados desde el último período estudiado de cada nivel, caso contrario perderá lo avanzado y no podrá obtener el certificado."
          />
        </div>
      </main>
    </div>
  );
};
