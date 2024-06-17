'use client'
import { useState } from 'react'
import { DrawerCustom } from '@/modules/admin'
import { IPayments } from '@/types'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { ListExpedientes } from './ListExpedientes'

export const ExpedienteData = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<IPayments>()

  const handleSelectExp = (exp: any) => {
    setValue('expediente', exp)
    setIsOpen(false)
  }

  return (
    <>
      <Controller
        control={control}
        name="expediente"
        rules={{
          required: 'Seleccione un expediente',
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="Expediente"
            label="Expediente"
            labelPlacement="outside"
            placeholder="Seleccione un expediente"
            radius="sm"
            variant="bordered"
            value={value?.persona as unknown as string}
            onChange={onChange}
            description="Seleccione un expediente para la matricula"
            isInvalid={errors.expediente !== undefined}
            errorMessage={errors.expediente?.message as string}
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
        title="Seleccionar expediente"
        content={<ListExpedientes onSelectExp={handleSelectExp} />}
      />
    </>
  )
}
