import { FrmEnrollmentEditor, HeaderSection } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <main className="flex flex-col gap-4 items-center ">
        <section className="w-full flex flex-col gap-4 max-w-2xl rounded-lg border p-6">
          <HeaderSection
            title="Añadir matricula"
            subtitle="Crear una nueva matricula para un expediente"
          />
          <FrmEnrollmentEditor />
        </section>
      </main>
    </>
  )
}
