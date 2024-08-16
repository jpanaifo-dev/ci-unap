import {
  DateFilter,
  PublicationFileTypeFilter,
  StatusFilter,
} from '@/modules/admin'

export const TopContent = () => {
  return (
    <section className="pb-4 flex gap-6 w-full">
      <div className="flex gap-3 w-full">
        <DateFilter />
        <div className="w-1/2">
          <PublicationFileTypeFilter />
        </div>
        <div className="w-1/2">
          <StatusFilter />
        </div>
      </div>
    </section>
  )
}
