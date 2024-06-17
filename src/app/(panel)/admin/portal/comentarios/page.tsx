import { HeaderSection, ListTestimonials } from '@/modules/admin'

export default function Page() {
  return (
    <>
      <main className="flex flex-col gap-4">
        <HeaderSection
          title="Lista de comentarios realizado por alumnos"
          subtitle="Gestiona los comentarios realizados por los alumnos sobre la institución"
        />
        <ListTestimonials />
      </main>
    </>
  )
}
