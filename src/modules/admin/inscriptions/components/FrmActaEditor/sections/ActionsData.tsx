'use client'
import { Switch } from '@nextui-org/react'
import { IInscriptions } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import { capitalize } from '@/utils'

const statusData = [
  {
    key: 'abierto',
    label: 'Acta abierta',
    description:
      'El acta aún no ha sido cerrada, aún se pueden modificar las notas',
    bgClassName: 'bg-primary-100 border-2 text-primary-600 border-primary-200',
  },
  {
    key: 'cerrado',
    label: 'Acta cerrada',
    description:
      'Al cerrar el acta no se podrá modificar las notas de los estudiantes',
    bgClassName: 'bg-danger-100 border-2 text-danger-600 border-danger-200',
  },
  {
    key: 'Sin publicar',
    label: 'Nota pendiente de publicación',
    description:
      'Las notas estas pendientes de publicación, los estudiantes no podrán verlas',
    bgClassName: 'bg-warning-100  border-2 text-warning-600 border-warning-200',
  },
  {
    key: 'publicado',
    label: 'Notas publicadas',
    description:
      'Las notas ya fueron publicadas, los estudiantes ya pueden verlas',
    bgClassName: 'bg-success-100 border-2 text-success-600 border-success-200',
  },
]

function getStatusData(key: string) {
  return statusData.find((item) => item.key === key)
}

export const ActionsData = () => {
  const { control, watch } = useFormContext<IInscriptions>()

  const statusClose = getStatusData(watch('is_cerrado') ? 'cerrado' : 'abierto')
  const statusPublic = getStatusData(
    watch('is_publicado') ? 'publicado' : 'Sin publicar'
  )

  return (
    <>
      <section
        className={`px-4 py-2  rounded-md ${statusClose?.bgClassName} grid grid-cols-2 gap-2`}
      >
        <div>
          <h2 className={`font-bold uppercase`}>{statusClose?.label}</h2>
          <p className="text-tiny text-gray-500 font-normal">
            {capitalize(statusClose?.description ?? '')}
          </p>
        </div>
        <div>
          <Controller
            control={control}
            name="is_cerrado"
            render={({ field: { value, onChange } }) => (
              <Switch
                aria-label="is_cerrado"
                isSelected={value}
                onValueChange={onChange}
                size="sm"
              >
                {value ? 'Abrir acta' : 'Cerrar acta'}
              </Switch>
            )}
          />
          <p className="text-xs text-gray-500">
            Click para {watch('is_cerrado') ? 'abrir' : 'cerrar'} el acta
          </p>
        </div>
      </section>
      <section
        className={`px-4 py-2 rounded-md ${statusPublic?.bgClassName} grid grid-cols-2 gap-2`}
      >
        <div>
          <h2 className={`font-bold uppercase`}>{statusPublic?.label}</h2>
          <p className="text-tiny text-gray-500 font-normal">
            {capitalize(statusPublic?.description ?? '')}
          </p>
        </div>
        <div>
          <Controller
            control={control}
            name="is_publicado"
            render={({ field: { value, onChange } }) => (
              <Switch
                aria-label="is_publicado"
                isSelected={value}
                onValueChange={onChange}
                size="sm"
              >
                {value ? 'Ocultar nota' : 'Publicar nota'}
              </Switch>
            )}
          />
          <p className="text-xs text-gray-500">
            Click para {watch('is_publicado') ? 'ocultar' : 'publicar'} las
            notas
          </p>
        </div>
      </section>
    </>
  )
}
