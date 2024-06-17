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
import { DialogAction } from '@/components'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { ITeach } from '@/types'
import { fetchCore } from '@/api'
import { AcademicData, PersonData } from './sections'

//To alert
import { toast } from 'react-toastify'

interface IProps {
  defaulData?: ITeach
}

export const FrmTeacherEditor = (props: IProps) => {
  const { defaulData } = props
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<ITeach>({
    defaultValues: defaulData
      ? defaulData
      : {
          grado_academico: 'M',
        },
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<ITeach> = async (data: ITeach) => {
    setOpen(false)
    setLoading(true)

    const newData = {
      ...data,
      persona: data.persona.id,
    }

    const endpoint = defaulData?.id
      ? `gestor/Docente/${data.id}/`
      : 'gestor/Docente/'

    const res = await fetchCore(endpoint, {
      method: defaulData?.id ? 'PUT' : 'POST',
      body: JSON.stringify(newData),
    })
      .then((res) => res)
      .catch((err) => err)

    if (res.status === 200 && defaulData?.id) {
      const resData = await res.json()
      toast.success(
        <>
          <h1 className="font-semibold text-sm">
            Docente actualizado correctamente
          </h1>
          <p className="text-xs text-gray-500">
            Los datos del docente con id_persona: <b>{resData.persona}</b> ha
            sido actualizado
          </p>
        </>
      )
      handleExit()
    } else if (res.status === 201 && !defaulData?.id) {
      const resData = await res.json()
      toast.success(
        <>
          <h1 className="font-semibold text-sm">
            Docente creado correctamente
          </h1>
          <p className="text-xs text-gray-500">
            El docente con id_persona <b>{resData.persona}</b> ha sido creado
          </p>
        </>
      )
      handleExit()
    } else {
      toast.error(
        'Error al ' + (defaulData?.id ? 'actualizar' : 'crear') + ' el docente'
      )
    }

    setLoading(false)
  }

  const handleExit = () => {
    router.refresh()
    router.push('/admin/cursos/docentes')
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
                title="Crear Docente"
                subtitle="Agrega un nuevo docente a la lista de docentes de la institución."
              />
            </div>
          </ModalHeader>
          <ModalBody>
            <FormProvider {...methods}>
              <form
                className="flex flex-col gap-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <AcademicData />
                <PersonData />
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
        title="Guardar Modalidad"
        message="¿Estás seguro de guardar esta modalidad?"
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
    </>
  )
}
