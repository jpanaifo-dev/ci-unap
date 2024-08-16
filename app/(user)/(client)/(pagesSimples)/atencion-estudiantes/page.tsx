import { Button } from "@nextui-org/button";
import Image from "next/image";
import arrowDown from "@/assets/svg/arrow-down.svg";

export default function AtencionEstudiantePage() {
  return (
    <main>
      <section className="section">
        <div className="grid grid-cols-12 items-center gap-8 p-6">
          <div className="col-span-4">
            <h2 className="text-right text-green-900 text-[32px] font-medium">
              Trámites documentarios del Centro de Idiomas de la UNAP
            </h2>
          </div>
          <div className="col-span-8 space-y-4">
            <h3 className="text-slate-900 text-xl font-bold">
              ¡Todo el soporte que necesitas está aquí!
            </h3>
            <p className="text-slate-600 text-base font-normal">
              Acompaña tu solicitud con las evidencias que sustenten el motivo
              de tu trámite y será derivado y atendido por la oficina
              correspondiente.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center max-w-screen-xl h-10 px-6 gap-24 pt-6">
          <Button color="success" size="md" className="text-white font-medium">
            Gestión académica
          </Button>
          <Button color="success" size="md" className="text-white font-medium">
            Registros académicos
          </Button>
          <Button color="success" size="md" className="text-white font-medium">
            Matrícula
          </Button>
        </div>
      </section>
      <section className="section flex gap-4 justify-center items-center">
            <Image src={arrowDown} alt="Reglamento" width={67} height={59} />
            <div className="flex flex-col gap-4">
                <h1 className="text-slate-950 text-[32px] font-medium max-w-screen-md">El mejor ecosistema de aprendizaje para llegar cada vez más lejos!</h1>
                <p className="text-slate-600 text-sm md:text-base font-medium">
                  Mira cómo serán tus clases en el Centro de Idiomas UNAP
                </p>
            </div>
      </section>
    </main>
  );
}
