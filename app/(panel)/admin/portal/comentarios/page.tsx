import { HeaderSection, ListTestimonials } from '@/modules/admin'

export default function Page() {
  return (
    <main className="flex flex-col h-full gap-4 section-panel ">
      <HeaderSection
        title="Lista de comentarios realizado por alumnos"
        subtitle="Gestiona los comentarios realizados por los alumnos sobre la institución"
      />
      <ListTestimonials />
    </main>
  )
}
