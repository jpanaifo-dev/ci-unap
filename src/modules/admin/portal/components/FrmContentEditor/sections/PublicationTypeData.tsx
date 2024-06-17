'use client'
import { useState } from 'react'
import { DrawerCustom } from '@/modules/admin'
import { IPublication } from '@/types'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { ListPublicationsType } from './ListPublicationType'

export const PublicationTypeData = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<IPublication>()

  const handleSelectValue = (exp: any) => {
    setValue('tipo', exp)
    setIsOpen(false)
  }

  return (
    <>
      <Controller
        control={control}
        name="tipo"
        rules={{
          required: 'Seleccione el tipo de publicación',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="type"
            label="Tipo de publicación"
            labelPlacement="outside"
            placeholder="Seleccione un tipo"
            radius="sm"
            variant="bordered"
            value={value?.nombre ?? ''}
            onChange={onChange}
            description="Seleccione el tipo de publicación al que pertenece el contenido"
            isInvalid={errors.tipo !== undefined}
            errorMessage={errors.tipo?.message as string}
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
        title="Seleccionar tipo de publicación"
        content={<ListPublicationsType onSelectValue={handleSelectValue} />}
      />
    </>
  )
}
