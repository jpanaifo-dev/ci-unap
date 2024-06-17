import CardInfoDocente from "@/components/Cards/CardLinks";
import arrowDown from "@/assets/svg/arrow-down.svg";
import Image from "next/image";

export default function ReglemantosPage() {
  return (
    <main className="section">
      <div className="flex justify-center items-start gap-10">
        <section className="w-full h-full">
          <h2 className="text-green-900 text-[32px] font-medium pb-6">¡Queremos que vivas la mejor experiencia en nuestro Centro de Idiomas!</h2>

          <p className="text-slate-600 text-base font-normal">Este reglamento establece las normativas para la gestión administrativa, académica y de proyección social del Centro de Idiomas de la Universidad Nacional de la Amazonía Peruana (CIUNAP). Todos los órganos que componen el CIUNAP deben cumplir con las disposiciones establecidas. El CIUNAP está compuesto por personal directivo, docente, administrativo y de servicios, designados por el Vicerrectorado de Investigación según el perfil requerido. Su objetivo principal es ofrecer servicios de enseñanza de idiomas para desarrollar habilidades integrales de escucha, habla, lectura y escritura, así como fomentar la investigación científica para mejorar la calidad educativa y de servicio. Además, se especifica que el CIUNAP es de carácter estatal, administrado por el Estado a través de la UNAP. Su creación y funcionamiento fueron aprobados mediante una resolución rectoral y su ubicación física se encuentra en un edificio específico en Iquitos.
          </p>
          <section className="section">
          <div className="flex gap-3">
            <Image src={arrowDown} alt="Reglamento" width={67} height={59} />
            <div className="flex flex-col gap-4">
                <h1 className="text-slate-950 text-[32px] font-medium">Revisa aquí las normas que regulan los procesos académicos y la convivencia en Idiomas UC.</h1>
                <button className="w-[221px] text-white text-sm font-medium leading-normal bg-amber-500 rounded-md px-4 py-2">Descargar reglamentos aquí</button>
            </div>
        </div>
          </section>
        </section>
        <section className="h-full">
          <CardInfoDocente />
        </section>
      </div>

    </main>
  )
}
