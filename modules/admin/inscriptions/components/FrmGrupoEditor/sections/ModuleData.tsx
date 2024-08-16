'use client'
import { useState } from 'react'
import { IGroup } from '@/types'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { DrawerCustom } from '@/modules/admin'
import { ModuleList } from './ModuleList'

export const ModuleData = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<IGroup>()

  const handleSelectModule = (modulo: any) => {
    setValue('modulo', modulo)
    setIsOpen(false)
  }

  return (
    <>
      <Controller
        control={control}
        name="modulo"
        rules={{
          required: 'Seleccione un módulo',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="Program"
            label="Modulo"
            labelPlacement="outside"
            placeholder="Seleccionar un módulo"
            radius="sm"
            variant="bordered"
            value={value?.nombre}
            onValueChange={onChange}
            isRequired
            errorMessage="Seleccione un módulo"
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
        title="Seleccionar un módulo"
        content={<ModuleList onSelectModule={handleSelectModule} />}
      />
    </>
  )
}
