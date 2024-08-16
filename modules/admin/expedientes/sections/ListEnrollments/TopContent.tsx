import {
  StatusFilter,
  ProgramFilter,
  QueryFilter,
  FPersonOptions,
  DateFilter,
} from '@/modules/admin'

export const TopContent = () => {
  return (
    <>
      <section className="w-full flex items-start gap-3">
        <QueryFilter
          optionsFilter={FPersonOptions}
          defaultSelectedKeys="dni"
        />
        <section className="w-full flex gap-3 max-w-[28rem]">
          <ProgramFilter />
          <StatusFilter />
        </section>
        <section className="flex w-full gap-1 items-center">
          <DateFilter />
        </section>
      </section>
    </>
  )
}
