'use client'
import { useState } from 'react'
import { DrawerCustom } from '@/modules/admin'
import { IPublicationFileList } from '@/types'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { ListPublicationsType } from './ListPublicationType'

export const PublicationTypeData = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { control, setValue } = useFormContext<IPublicationFileList>()

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
          required: 'Seleccione el tipo de multimedia',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="type"
            labelPlacement="outside"
            placeholder="Seleccione un tipo"
            radius="sm"
            variant="bordered"
            value={value?.nombre || ''}
            onChange={onChange}
            required
            errorMessage="Seleccione el tipo de multimedia"
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
        title="Seleccionar tipo archivo multimedia"
        content={<ListPublicationsType onSelectValue={handleSelectValue} />}
      />
    </>
  )
}
