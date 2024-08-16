'use client'
import { useState } from 'react'
import { DrawerCustom } from '@/modules/admin'
import { IEnrollment } from '@/types'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { ListExpedientes } from './ListExpedientes'

export const ExpedienteData = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { control, setValue } = useFormContext<IEnrollment>()

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
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="Expediente"
            label="Expediente"
            labelPlacement="outside"
            placeholder="Seleccione un expediente"
            radius="sm"
            variant="bordered"
            value={value?.expediente || ''}
            onChange={onChange}
            description="Seleccione un expediente para la matricula"
            isRequired
            errorMessage="Seleccione un expediente"
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
