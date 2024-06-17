import { useState } from 'react'
import { IPerson, IProceeding, ITestimony } from '@/types'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { DrawerCustom } from '@/modules/admin'
import { ListPersonas } from './ListPerson'

export const PersonData = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<ITestimony>()

  const handleSelectProgram = (person: any) => {
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
            aria-label="Persona"
            label="Persona"
            labelPlacement="outside"
            placeholder="Seleccionar persona"
            radius="sm"
            variant="bordered"
            value={value?.nombres}
            onValueChange={onChange}
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
        title="Seleccionar persona"
        content={<ListPersonas onSelectProgram={handleSelectProgram} />}
      />
    </>
  )
}
