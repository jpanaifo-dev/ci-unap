import {
  DateFilter,
  PublicationTypeFilter,
  QueryFilter,
  StatusFilter,
} from '@/modules/admin'

const optionsFilter = [
  {
    label: 'Contenido',
    value: 'contenido',
  },
  {
    label: 'Título',
    value: 'titulo',
  },
]

export const TopContent = () => {
  return (
    <section className="pb-4 flex gap-6 w-full">
      <div className="w-96">
        <QueryFilter
          optionsFilter={optionsFilter}
          defaultSelectedKeys="titulo"
          placeholder={`Buscar por ...`}
          classNames={{
            base: 'w-full',
            mainWrapper: 'w-32',
          }}
        />
      </div>
      <div className="flex gap-3 w-full">
        <DateFilter />
        <div className="w-1/2">
          <PublicationTypeFilter />
        </div>
        <div className="w-1/2">
          <StatusFilter />
        </div>
      </div>
    </section>
  )
}
