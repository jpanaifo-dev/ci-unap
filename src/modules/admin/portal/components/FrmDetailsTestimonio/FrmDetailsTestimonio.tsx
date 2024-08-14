'use client'
import { useState } from 'react'
import { Button, Divider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { ITestimony } from '@/types'
import { DialogAction } from '@/components'
import { fetchCore } from '@/api'

//To alert
import { toast } from 'react-toastify'
import { ActionData } from './sections/ActionData'
import { converDate } from '@/utils'
import { RenderStar } from '@/modules/core'

interface IProps {
  defaulData?: ITestimony
}

export const FrmDetailsTestimonio = (props: IProps) => {
  const { defaulData } = props
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const methods = useForm<ITestimony>({
    defaultValues: defaulData,
  })

  const { reset } = useForm()

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<ITestimony> = async (
    data: ITestimony
  ) => {
    setOpen(false)
    setLoading(true)

    const { persona, ...res } = data

    const newData = {
      ...res,
      persona: persona.id,
    }

    if (defaulData?.id) {
      const res = await fetchCore(
        `portal/Testimonio/${data.id}/`,
        {
          method: 'PUT',
          body: JSON.stringify(newData),
        },
        {
          revalidatePath: 0,
          caches: 'no-store',
        }
      )
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 200) {
        toast.success('Comentario actualizado correctamente')
        handleExit()
      } else {
        toast.error('Error al actualizar la comentario')
      }
    } else {
      const res = await fetchCore('portal/Testimonio/', {
        method: 'POST',
        body: JSON.stringify(newData),
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 201) {
        toast.success('Comentario creado correctamente')
        handleExit()
      } else {
        toast.error('Error al crear la comentario')
      }
    }
    setLoading(false)
    reset()
  }

  const handleExit = () => {
    methods.setValue('is_active', false)
    methods.setValue('is_public', false)
    reset()
    router.refresh()
    router.push('/admin/portal/comentarios')
  }
  return (
    <main className="flex flex-col section-panel gap-4">
      <header className="w-full flex flex-col gap-3">
        <section className="flex flex-col gap-1 items-start">
          <h3 className="font-bold">Detalle de comentario</h3>
          <p className="text-xs text-gray-500 uppercase">
            Creado por: {defaulData?.persona?.nombres}{' '}
            {defaulData?.persona?.apellido_paterno}
          </p>
        </section>
        <Divider />
      </header>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-4 h-full overflow-y-auto max-h-[calc(100vh-236px)]"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div>
            {defaulData?.fecha && (
              <p className="text-xs text-gray-400">
                Creado el: {<>{converDate(defaulData?.fecha)}</>}
              </p>
            )}
          </div>
          <div>
            {defaulData?.valoracion && (
              <RenderStar value={defaulData?.valoracion} />
            )}
          </div>
          <div className="w-full text-gray-500">
            <p className="text-sm">{defaulData?.contenido}</p>
          </div>

          <ActionData />
        </form>
      </FormProvider>
      <footer className="flex items-center gap-3 justify-end">
        <Button
          className="button-dark"
          radius="sm"
          type="submit"
          onPress={() => methods.handleSubmit(handleFormSubmit)()}
          isLoading={loading}
          isDisabled={loading}
        >
          Guardar
        </Button>

        <Button
          radius="sm"
          onPress={handleExit}
        >
          Cancelar
        </Button>
      </footer>
      <DialogAction
        isOpen={isOpen}
        setOpen={setOpen}
        title="Guardar cambios"
        message="¿Estás seguro de guardar los cambios?"
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
    </main>
  )
}
