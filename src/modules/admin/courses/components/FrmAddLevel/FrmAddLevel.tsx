'use client'
import { useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { HeaderSection } from '@/modules/admin'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { ILevel } from '@/types'
import { DialogAction } from '@/components'
import { InfoData } from './sections'
import { fetchCore } from '@/api'

//To alert
import { toast } from 'react-toastify'

interface IProps {
  defaulData?: ILevel
  isView?: boolean
}

export const FrmAddLevel = (props: IProps) => {
  const { defaulData, isView } = props
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<ILevel>({
    defaultValues: defaulData,
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<ILevel> = async (data: ILevel) => {
    setOpen(false)
    setLoading(true)
    if (defaulData?.id) {
      const res = await fetchCore(`gestor/Nivel/${data.id}/`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 200) {
        toast.success('Niivel actualizado correctamente')
        router.push('/admin/idiomas/niveles')
        router.refresh()
      } else {
        toast.error('Error al actualizar el nivel')
      }
    } else {
      const res = await fetchCore('gestor/Nivel/', {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 201) {
        toast.success('Nivel creado correctamente')
        router.push('/admin/idiomas/niveles')
        router.refresh()
      } else {
        toast.error('Error al crear el nivel')
      }
    }
    setLoading(false)
  }

  const handleExit = () => {
    router.push('/admin/idiomas/niveles')
  }

  const title: string = isView
    ? 'Detalle del nivel'
    : defaulData
    ? 'Editar nivel'
    : 'Agregar nivel'

  const subtitle: string = isView
    ? 'Información del nivel'
    : defaulData
    ? 'Editar un nivel del sistema'
    : 'Agregar un nuevo nivel'

  return (
    <>
      <Modal
        isOpen
        onClose={handleExit}
        radius="sm"
        size="4xl"
      >
        <ModalContent>
          <ModalHeader>
            <div className="w-full">
              <HeaderSection
                title={title}
                subtitle={subtitle}
              />
            </div>
          </ModalHeader>
          <ModalBody>
            <FormProvider {...methods}>
              <form
                className="p-4 flex flex-col gap-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <InfoData isView={isView} />
                {!isView && (
                  <footer className="flex items-center gap-3 justify-end">
                    <Button
                      className="button-dark"
                      radius="sm"
                      type="submit"
                      isLoading={loading}
                      isDisabled={loading}
                    >
                      {defaulData ? 'Actualizar' : 'Guardar'}
                    </Button>

                    <Button
                      radius="sm"
                      onPress={handleExit}
                    >
                      Cancelar
                    </Button>
                  </footer>
                )}
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
      <DialogAction
        isOpen={isOpen}
        setOpen={setOpen}
        title="Confirmación"
        message="¿Estás seguro de guardar los cambios?"
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
    </>
  )
}
