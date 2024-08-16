'use client'
import { useState } from 'react'
import { DrawerCustom } from '@/modules/admin'
import { IProceeding } from '@/types'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { ListDiscounts } from './ListDiscounts'

export const DiscountData = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { control, setValue } = useFormContext<IProceeding>()

  const handleSelectProgram = (discount: any) => {
    setValue('descuento', discount)
    setIsOpen(false)
  }

  return (
    <>
      <Controller
        control={control}
        name="descuento"
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="Descount"
            label="Descuento"
            labelPlacement="outside"
            placeholder="Seleccionar descuento"
            radius="sm"
            variant="bordered"
            value={value?.descripcion}
            onChange={onChange}
            description="Seleccione si el estudiante tiene descuento"
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
        title="Seleccionar descuento"
        content={<ListDiscounts onSelectDiscount={handleSelectProgram} />}
      />
    </>
  )
}
