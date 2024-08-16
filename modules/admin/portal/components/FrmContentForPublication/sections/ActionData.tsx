import { IPublicationFile } from '@/types'
import { Switch } from '@nextui-org/react'
import { IconPhoto } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'

export const ActionData = () => {
  const { control, watch } = useFormContext<IPublicationFile>()

  const archivo: File[] = watch('uploadArchivo') || []
  const isPdf =
    archivo[0]?.type === 'application/pdf' ||
    archivo[0]?.type === 'application/msword' ||
    archivo[0]?.type ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

  return (
    <>
      {!isPdf && (
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
      )}
    </>
  )
}
