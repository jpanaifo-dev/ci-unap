import CardInfoDocente from "@/components/Cards/CardLinks";
import TextOption from "@/components/docentes/ListOptions";

export default function DocentesPage() {
  return (
    <main className="section">
      <div className="flex justify-center items-start gap-10">
        <section className="w-full h-full">
          <h2 className="text-green-900 text-[32px] font-medium pb-10">
            Docentes excelentes para una buena enseñanza{" "}
          </h2>
          <p className="text-slate-600 text-base font-normal pb-10">
            Para lograr tus metas personales y académicas, es muy importante que
            aprendas un nuevo idioma de manera correcta. Por ello, ponemos a tu
            disposición un equipo de docentes expertos y altamente calificados.
          </p>
          <div className="flex flex-col">
            <h4 className="text-black text-base font-medium">
              Nuestros docentes son:
            </h4>
            <div className="flex flex-col gap-5 pt-5">
                <TextOption title="Dinámicos" body="dejan atrás la rutina y los métodos de enseñanza
                  convencionales para ofrecerte una experiencia de aprendizaje
                  única." />
                <TextOption title="Creativos" body="innovan permanentemente en el aula y enfrentan cada reto de la enseñanza con creatividad." />
                <TextOption title="Actualizados" body="están al día con los avances de las nuevas tecnologías para optimizar tu aprendizaje." />
                <TextOption title="De experiencia multicultural" body="comparten sus experiencias internacionales contigo para que desarrolles una visión global." />
            </div>
          </div>
        </section>
        <section className="h-full">
          <CardInfoDocente />
        </section>
      </div>
    </main>
  );
}
