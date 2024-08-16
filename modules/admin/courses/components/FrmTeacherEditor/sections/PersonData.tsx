'use client'
import { useState } from 'react'
import { DrawerCustom } from '@/modules/admin'
import { ITeach } from '@/types'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { ListPersons } from './ListPersons'

export const PersonData = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<ITeach>()

  const handleSelectPerson = (person: any) => {
    setValue('persona', person)
    setIsOpen(false)
  }

  return (
    <>
      <Controller
        control={control}
        name="persona"
        rules={{
          required: 'Seleccione una persona',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="persona"
            label="Persona"
            labelPlacement="outside"
            placeholder="Seleccionar una persona"
            radius="sm"
            variant="bordered"
            value={value?.nombres}
            onChange={onChange}
            description="Seleccione persona para asignarle el rol de docente"
            isInvalid={errors.persona !== undefined}
            errorMessage={errors.persona?.message as string}
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
        title="Seleccionar una persona"
        content={<ListPersons onSelectPerson={handleSelectPerson} />}
      />
    </>
  )
}
