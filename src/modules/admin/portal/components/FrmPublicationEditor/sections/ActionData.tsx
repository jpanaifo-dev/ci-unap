import { IPublicationList } from '@/types'
import { Switch } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'
import { IconEyeCheck, IconSpeakerphone } from '@tabler/icons-react'

export const ActionData = () => {
  const { control } = useFormContext<IPublicationList>()

  return (
    <>
      <section className="flex items-start gap-4 w-full rounded-lg p-3 bg-gray-50 border border-gray-200">
        <div
          id="icon"
          className="p-2 rounded-full shadow-md"
        >
          <IconSpeakerphone
            size={32}
            strokeWidth={1.5}
          />
        </div>
        <div
          id="content"
          className="w-full"
        >
          <h1 className="font-bold">Activar esta publicación</h1>
          <p className="text-sm text-gray-500">
            Si está seleccionado, la publicación será visible para los usuarios
            del portal.
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
      <section className="flex items-start gap-4 w-full  rounded-lg p-3 bg-gray-50 border border-gray-200">
        <div
          id="icon"
          className="p-2 rounded-full shadow-md"
        >
          <IconEyeCheck
            size={32}
            strokeWidth={1.5}
          />
        </div>
        <div
          id="content"
          className="w-full"
        >
          <h1 className="font-bold">Visible en el banner</h1>
          <p className="text-sm text-gray-500">
            Si está seleccionado, la publicación será visible en el banner del
            portal.
          </p>
        </div>
        <Controller
          control={control}
          name="is_banner"
          render={({ field: { value, onChange } }) => (
            <Switch
              aria-label="is_banner"
              onChange={onChange}
              isSelected={value}
              title="Visible en el banner"
            />
          )}
        />
      </section>
    </>
  )
}
