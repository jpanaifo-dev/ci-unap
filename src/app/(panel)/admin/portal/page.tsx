import { HeaderSection } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <main className="flex flex-col gap-4">
        <HeaderSection
          title="Administración del portal"
          subtitle="Gestiona los contenidos de la página web"
        />
      </main>
    </>
  )
}
