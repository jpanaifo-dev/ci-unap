'use client'
import { IPublicationFile } from '@/types'
import { Switch } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'
import { IconPlayerPlay, IconPhoto } from '@tabler/icons-react'

export const ActionData = () => {
  const { control } = useFormContext<IPublicationFile>()

  return (
    <>
      <section className="flex items-start gap-4 w-full rounded-lg p-3 bg-gray-50 border border-gray-200">
        <div
          id="icon"
          className="p-2 rounded-full shadow-md"
        >
          <IconPlayerPlay
            size={32}
            strokeWidth={1.5}
          />
        </div>
        <div
          id="content"
          className="w-full"
        >
          <h1 className="font-bold">Activar contenido</h1>
          <p className="text-sm text-gray-500">
            Si está seleccionado, el archivo será visible para los usuarios del
            portal.
          </p>
        </div>
        <Controller
          control={control}
          name="is_active"
          render={({ field: { value, onChange } }) => (
            <Switch
              aria-label="is_active"
              onChange={onChange}
              isSelected={value}
              title="Activo"
            />
          )}
        />
      </section>
      <section className="flex items-start gap-4 w-full rounded-lg p-3 bg-gray-50 border border-gray-200">
        <div
          id="icon"
          className="p-2 rounded-full shadow-md"
        >
          <IconPhoto
            size={32}
            strokeWidth={1.5}
          />
        </div>
        <div
          id="content"
          className="w-full"
        >
          <h1 className="font-bold">Mostar como portada de publicación</h1>
          <p className="text-sm text-gray-500">
            Si está seleccionado, el archivo será visible en la portada de la
            publicación. En la lista de publicaciones del portal.
          </p>
        </div>
        <Controller
          control={control}
          name="is_portada"
          render={({ field: { value, onChange } }) => (
            <Switch
              aria-label="is_portada"
              onChange={onChange}
              isSelected={value}
              title="Portada"
            />
          )}
        />
      </section>
    </>
  )
}
