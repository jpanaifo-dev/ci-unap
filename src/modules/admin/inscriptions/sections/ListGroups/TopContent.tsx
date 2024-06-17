import { ProgramFilter, StatusFilter } from '@/modules/admin'

export const TopContent = () => {
  return (
    <>
      <section className="w-full flex items-center gap-2">
        <ProgramFilter />
        <StatusFilter />
      </section>
    </>
  )
}
