'use client'
import { Radio, RadioGroup, cn } from '@nextui-org/react'

interface IProps {
  value: boolean
  onChange: (value: boolean) => void
  showHeader?: boolean
}

const optValues = [
  {
    value: 'TRUE',
    label: 'Activo',
    description: 'Activar para que sea visible en el sistema',
  },
  {
    value: 'FALSE',
    label: 'Inactivo',
    description: 'Ocultar para que no sea visible en el sistema',
  },
]

export const RadioStatus = (props: IProps) => {
  const { value, onChange, showHeader } = props

  return (
    <>
      {showHeader && (
        <header className="w-full">
          <h1 className="font-bold">Configuración de privacidad</h1>
          <p className="text-xs">
            Cambia la configuración de privacidad para controlar quién puede ver
            tu publicación en la seccion de blog (o publicaciones)
          </p>
        </header>
      )}
      <main>
        <RadioGroup
          value={value ? 'TRUE' : 'FALSE'}
          onValueChange={(value) => onChange(value === 'TRUE')}
          size="sm"
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
      </main>
    </>
  )
}
