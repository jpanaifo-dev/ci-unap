'use client'
import { useState } from 'react'
import { DrawerCustom } from '@/modules/admin'
import { IPayments } from '@/types'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { ListPaymemtConcept } from './ListPaymentConcept'

export const PaymentsConceptsData = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<IPayments>()

  const handleSelectExp = (exp: any) => {
    setValue('concepto', exp)
    setIsOpen(false)
  }

  return (
    <>
      <Controller
        control={control}
        name="concepto"
        rules={{
          required: 'Seleccione un concepto de pago',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="Concepto de pago"
            label="Concepto de pago"
            labelPlacement="outside"
            placeholder="Seleccione un concepto de pago"
            radius="sm"
            variant="bordered"
            value={value?.codigo as unknown as string}
            onChange={onChange}
            description="Seleccione un concepto de pago"
            isInvalid={errors.concepto !== undefined}
            errorMessage={errors.concepto?.message as string}
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
        content={<ListPaymemtConcept onSelectExp={handleSelectExp} />}
      />
    </>
  )
}
