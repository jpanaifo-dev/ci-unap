'use client'
import { useState } from 'react'
import { DrawerCustom } from '@/modules/admin'
import { IPayments, IPublicationFile } from '@/types'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { ContentList } from './ContentList'

export const ContentData = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<IPublicationFile>()

  const handleSelectValue = (value: any) => {
    setValue('publicacion', value)
    setIsOpen(false)
  }

  return (
    <>
      <Controller
        control={control}
        name="publicacion"
        rules={{
          required: 'Seleccione un contenido para la publicación',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="publicacion"
            label="Contenido de la publicación"
            labelPlacement="outside"
            placeholder="Seleccione un contenido para la publicación"
            radius="sm"
            variant="bordered"
            value={value?.id as unknown as string}
            onChange={onChange}
            isInvalid={errors.publicacion !== undefined}
            errorMessage={errors.publicacion?.message as string}
            endContent={
              <div>
                <Button
                  size="sm"
                  radius="sm"
                  startContent={<IconLink size={16} />}
                  onPress={() => setIsOpen(true)}
                >
                  Seleccionar
                </Button>
              </div>
            }
          />
        )}
      />
      <DrawerCustom
        isOpen={isOpen}
        setOpen={setIsOpen}
        title="Seleccionar contenido"
        content={<ContentList onSelectValue={handleSelectValue} />}
      />
    </>
  )
}
