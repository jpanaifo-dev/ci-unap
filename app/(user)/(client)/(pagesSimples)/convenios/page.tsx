import CardInfoDocente from "@/components/Cards/CardLinks";

export default function ConveniosPage() {
  return (
    <main className="section">
      <div className="flex justify-center items-start gap-10">
        <section className="w-full h-full">
          <h2 className="text-green-900 text-[32px] font-medium">Accede a más oportunidades académicas y profesionales gracias a nuestras alianzas y convenios con diferentes instituciones reconocidas.</h2>
          <div className="flex flex-col pt-6 gap-4">
                <h3 className="text-slate-950 text-xl font-medium">Universidad Nacional de la Amazonía Peruana</h3>
                <p className="text-slate-700 text-base font-medium">Reconocimiento internacional. Logra una certificación que sirva en cualquier parte del mundo. Somos un centro examinador autorizado de los prestigiosos exámenes internacionales de Cambridge: FCE, CAE, PET, KET y CPE.</p>
          </div>
        </section>
        <section className="h-full">
          <CardInfoDocente />
        </section>
      </div>
    </main>
  )
}
