import { IModality, ITestimony } from '@/types'
import { Checkbox, Radio, RadioGroup, cn } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'

const optValues = [
  {
    value: 'TRUE',
    label: 'Público',
    description: 'Visible para todos los usuarios',
  },
  {
    value: 'FALSE',
    label: 'No publicado',
    description: 'Oculto para todos los usuarios del portal y demás roles',
  },
]
const optValuesStatus = [
  {
    value: 'TRUE',
    label: 'Activo',
    description: 'Publicación visible en el portal y demás roles',
  },
  {
    value: 'FALSE',
    label: 'Inactivo',
    description:
      'Publicación oculta en el portal y demás roles, ya no puede ser visible',
  },
]

export const ActionData = () => {
  const { control } = useFormContext<ITestimony>()

  return (
    <>
      <section className="flex flex-col gap-3">
        <header className="w-full">
          <h1 className="font-bold">Configuración de estado</h1>
          <p className="text-xs">
            Controla el estado de la publicación, activa o desactiva la
            publicación si ya no es necesaria o si ya no es relevante para el
            portal
          </p>
        </header>
        <Controller
          control={control}
          name="is_active"
          render={({ field: { value, onChange } }) => (
            <RadioGroup
              value={value ? 'TRUE' : 'FALSE'}
              onValueChange={(value) => onChange(value === 'TRUE')}
              size="sm"
              aria-label="is_active"
            >
              {optValuesStatus.map((opt, index) => (
                <Radio
                  key={index}
                  value={opt.value}
                  classNames={{
                    base: cn(
                      'm-0 bg-content1 hover:bg-content2 items-center',
                      'cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent min-w-full',
                      'data-[selected=true]:border-primary'
                    ),
                    label: cn('font-semibold'),
                  }}
                  description={opt.description}
                >
                  {opt.label}
                </Radio>
              ))}
            </RadioGroup>
          )}
        />
      </section>
      <section className="flex flex-col gap-3">
        <header className="w-full">
          <h1 className="font-bold">Configuración de privacidad</h1>
          <p className="text-xs">
            Cambia la configuración de privacidad para controlar quién puede ver
            tu publicación en la seccion de blog (o publicaciones)
          </p>
        </header>
        <main>
          <Controller
            control={control}
            name="is_public"
            render={({ field: { value, onChange } }) => (
              <RadioGroup
                value={value ? 'TRUE' : 'FALSE'}
                onValueChange={(value) => onChange(value === 'TRUE')}
                size="sm"
                aria-label="is_public"
              >
                {optValues.map((opt, index) => (
                  <Radio
                    key={index}
                    value={opt.value}
                    classNames={{
                      base: cn(
                        'm-0 bg-content1 hover:bg-content2 items-center',
                        'cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent min-w-full',
                        'data-[selected=true]:border-primary'
                      ),
                      label: cn('font-semibold'),
                    }}
                    description={opt.description}
                  >
                    {opt.label}
                  </Radio>
                ))}
              </RadioGroup>
            )}
          />
        </main>
      </section>
    </>
  )
}
