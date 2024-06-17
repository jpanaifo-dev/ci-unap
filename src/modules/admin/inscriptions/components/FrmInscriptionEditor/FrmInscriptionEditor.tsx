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
import { IInscriptions } from '@/types'
import { DialogAction } from '@/components'
import { fetchCore } from '@/api'

//To alert
import { toast } from 'react-toastify'
import { GroupData, MatriculaData } from './sections'

interface IProps {
  defaulData?: IInscriptions
}

export const FrmInscriptionEditor = (props: IProps) => {
  const { defaulData } = props
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<IInscriptions>({
    defaultValues: defaulData,
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IInscriptions> = async (
    data: IInscriptions
  ) => {
    setOpen(false)
    setLoading(true)

    const { matricula, grupo, ...resData } = data

    const newData = {
      ...resData,
      matricula: matricula?.id,
      grupo: grupo.id,
    }

    const endpoint = defaulData?.id ? `gestor/Inscripcion/${data.id}/` : 'gestor/Inscripcion/'
    const method = defaulData?.id ? 'PUT' : 'POST'

    const res = await fetchCore(endpoint, {
      method,
      body: JSON.stringify(newData),
    })
      .then((res) => res)
      .catch((err) => err)

    if (res.status === 200 && defaulData?.id) {
      toast.success('Descuento actualizado')
      handleExit()
    } else if (res.status === 201 && !defaulData?.id) {
      toast.success('Inscripción registrada')
      handleExit()
    } else {
      toast.error(defaulData?.id ? 'Error al actualizar el descuento' : 'Error al registrar la inscripción')
    }
    setLoading(false)
  }

  const handleExit = () => {
    methods.reset()
    router.push('/admin/cursos/inscripciones')
  }

  const title = defaulData?.id ? 'Editar inscripcion' : 'Registrar Inscripción'
  const subtitle = defaulData?.id
    ? 'Edita los datos de la inscripción'
    : 'Ingresa los datos de la inscripción'

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
                <MatriculaData />
                <GroupData />
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
