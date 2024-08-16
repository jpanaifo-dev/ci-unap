import { ProgramFilter, StatusFilter } from '@/modules/admin'

export const CoursesFilter = () => {
  return (
    <>
      <section className="w-full flex gap-3 max-w-[32rem] items-center">
        <ProgramFilter />
        <StatusFilter />
      </section>
    </>
  )
}
