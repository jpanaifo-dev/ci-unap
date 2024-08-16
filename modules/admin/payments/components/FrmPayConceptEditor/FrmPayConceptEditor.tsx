'use client'
import { useState } from 'react'
import { HeaderSection } from '@/modules/admin'
import { ITypePayments } from '@/types'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { DialogAction } from '@/components'
import { InfoData } from './sections'
import { fetchCore } from '@/api'

//To alert
import { toast } from 'react-toastify'

interface IProps {
  dataDeafult?: ITypePayments
}

export const FrmPayConceptEditor = (props: IProps) => {
  const { dataDeafult } = props
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<ITypePayments>({
    defaultValues: dataDeafult,
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<ITypePayments> = async (
    data: ITypePayments
  ) => {
    setLoading(true)
    setOpen(false)
    if (dataDeafult?.id) {
      const res = await fetchCore(`gestor/Concepto/${data.id}/`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 200) {
        toast.success('Concepto de pago actualizado correctamente')
        router.push('/admin/pagos/conceptos')
        router.refresh()
      } else {
        toast.error('Error al actualizar el concepto de pago')
      }
    } else {
      const res = await fetchCore('gestor/Concepto/', {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 201) {
        toast.success('Concepto de pago creado correctamente')
        router.push('/admin/pagos/conceptos')
        router.refresh()
      } else {
        toast.error('Error al crear el concepto de pago')
      }
    }
    setLoading(false)
  }

  //For title
  const title = dataDeafult
    ? 'Editar concepto de pago'
    : 'Nuevo concepto de pago'
  const subtitle = dataDeafult
    ? 'Editar los datos del concepto de pago'
    : 'Agrega los datos del concepto de pago'

  const handleExit = () => {
    router.push('/admin/pagos/conceptos')
  }

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
                onSubmit={methods.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <InfoData />
                <footer className="flex items-center gap-3 justify-end">
                  <Button
                    className="button-dark"
                    radius="sm"
                    type="submit"
                    isLoading={loading}
                    isDisabled={loading}
                  >
                    {dataDeafult?.id ? 'Actualizar' : 'Guardar'}
                  </Button>

                  <Button
                    radius="sm"
                    onPress={handleExit}
                  >
                    Cancelar
                  </Button>
                </footer>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
      <DialogAction
        isOpen={isOpen}
        title="Guardar cambios"
        message="¿Estás seguro de guardar los cambios?"
        setOpen={setOpen}
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
    </>
  )
}
