import { useState } from 'react'
import { IInscriptions } from '@/types'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { DrawerCustom } from '@/modules/admin'
import { ListMatricula } from './ListMatricula'

export const    MatriculaData = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<IInscriptions>()

  const handleSelectProgram = (matricula: any) => {
    setValue('matricula', matricula)
    setIsOpen(false)
  }

  return (
    <>
      <Controller
        control={control}
        name="matricula"
        rules={{
          required: 'Seleccione un programa',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="Matricula"
            label="Matricula"
            labelPlacement="outside"
            placeholder="Seleccione una matricula activa"
            radius="sm"
            variant="bordered"
            description="Selecione una matrícula válida"
            value={
              value?.expediente
                ? value?.expediente?.persona?.nombres +
                  ' ' +
                  value?.expediente?.persona?.apellido_materno +
                  ' ' +
                  value?.expediente?.persona?.apellido_paterno
                : ''
            }
            onValueChange={onChange}
            isInvalid={errors.matricula !== undefined}
            errorMessage={errors.matricula?.message as string}
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
        title="Seleccionar matricula"
        content={<ListMatricula onSelectProgram={handleSelectProgram} />}
      />
    </>
  )
}
