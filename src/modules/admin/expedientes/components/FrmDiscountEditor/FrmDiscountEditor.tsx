'use client'
import { useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { HeaderSection } from '@/modules/admin'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { IDiscount } from '@/types'
import { DialogAction } from '@/components'
import { ActionData, InfoData } from './sections'
import { fetchCore } from '@/api'

//To alert
import { toast } from 'react-toastify'

interface IProps {
  defaulData?: IDiscount
}

export const FrmDiscountEditor = (props: IProps) => {
  const { defaulData } = props
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<IDiscount>({
    defaultValues: defaulData,
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IDiscount> = async (
    data: IDiscount
  ) => {
    setOpen(false)
    setLoading(true)

    if (defaulData?.id) {
      const res = await fetchCore(`gestor/Descuento/${data.id}/`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 200) {
        toast.success('Descuento actualizado')
        handleExit()
      } else {
        toast.error('Error al actualizar el descuento')
      }
    } else {
      const res = await fetchCore('gestor/Descuento/', {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 201) {
        toast.success('Descuento creado correctamente')
        handleExit()
      } else {
        toast.error('Error al crear el descuento')
      }
    }
    setLoading(false)
  }

  const handleExit = () => {
    methods.reset()
    router.push('/admin/expedientes/descuentos')
  }

  const title = defaulData?.id ? 'Editar descuento' : 'Nuevo descuento'
  const subtitle = defaulData?.id
    ? 'Edita los datos del descuento'
    : 'Ingresa los datos del descuento'

  return (
    <>
      <Modal
        isOpen
        onClose={handleExit}
        radius="sm"
        size="2xl"
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
                className="flex flex-col gap-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <InfoData />
                {defaulData?.id && <ActionData />}
              </form>
            </FormProvider>
          </ModalBody>
          <ModalFooter>
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
          </ModalFooter>
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
