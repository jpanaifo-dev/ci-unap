import { FrmEnrollmentEditor, HeaderSection } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <main className="flex flex-col gap-4 items-center ">
        <section className="w-full max-w-3xl">
          <FrmEnrollmentEditor />
        </section>
      </main>
    </>
  )
}
