'use client'
import { useState } from 'react'
import { HeaderSection } from '@/modules/admin'
import { IPublicationFileType } from '@/types'
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'

import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { DialogAction } from '@/components'
import { postOrUpdPublicationFileType } from '@/api'

//To alert
import { toast } from 'react-toastify'

interface IProps {
  dataDeafult?: IPublicationFileType
}

export const FrmPublicationFileTypeEditor = (props: IProps) => {
  const { dataDeafult } = props
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<IPublicationFileType>({
    defaultValues: dataDeafult,
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IPublicationFileType> = async (
    data: IPublicationFileType
  ) => {
    setLoading(true)
    setOpen(false)

    const successMessage = dataDeafult?.id
      ? 'Tipo de archivo multimedia actualizado correctamente'
      : 'Tipo de archivo multimedia creado correctamente'
    const errorMessage = dataDeafult?.id
      ? 'Error al actualizar el tipo de archivo multimedia'
      : 'Error al crear un nuevo tipo de archivo multimedia'

    const res = await postOrUpdPublicationFileType(data)

    try {
      if (res.ok) {
        toast.success(successMessage)
        router.refresh()
        handleExit()
      } else {
        toast.error(errorMessage)
      }
    } catch (error) {
      console.error(error)
      toast.error(errorMessage)
    }

    setLoading(false)
  }

  const subtitle = dataDeafult
    ? 'Editar los datos del tipo de publicación'
    : 'Agrega los datos del tipo de publicación'

  const handleExit = () => {
    router.push('/admin/portal/tipo-contenido/multimedia')
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
                title="Tipo de publicación"
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
                <main className="flex flex-col gap-5">
                  <Controller
                    control={methods.control}
                    name="nombre"
                    render={({ field: { value, onChange } }) => (
                      <Input
                        aria-label="name"
                        value={value || ''}
                        onValueChange={onChange}
                        variant="bordered"
                        radius="sm"
                        label="Tipo de archivo multimedia"
                        placeholder="Ejemplo: Imagen, Video, Audio"
                        labelPlacement="outside"
                        isInvalid={
                          methods?.formState.errors.nombre !== undefined
                        }
                        errorMessage={
                          methods.formState.errors.nombre?.message as string
                        }
                      />
                    )}
                  />
                  {dataDeafult?.id && (
                    <Controller
                      control={methods.control}
                      name="is_active"
                      render={({ field: { value, onChange } }) => (
                        <Checkbox
                          aria-label="Activo"
                          color="default"
                          isSelected={value}
                          onChange={onChange}
                        >
                          Activo
                        </Checkbox>
                      )}
                    />
                  )}
                </main>
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
