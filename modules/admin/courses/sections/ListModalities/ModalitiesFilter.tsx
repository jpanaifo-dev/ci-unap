import { ProgramFilter, StatusFilter } from '@/modules/admin'

export const ModalitiesFilter = () => {
  return (
    <>
      <section className="w-full flex gap-3 max-w-[24rem]">
        <ProgramFilter />
        <StatusFilter />
      </section>
    </>
  )
}
