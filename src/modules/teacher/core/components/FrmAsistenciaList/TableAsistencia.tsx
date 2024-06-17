'use client'
import { Radio, RadioGroup } from '@nextui-org/react'
import { IAlumno, IAsistenciaSave, IGroupData } from '@/types'
import { Controller, useFormContext } from 'react-hook-form'

interface IProps {
  alumnos: IAlumno[] | undefined
  isDisabled?: boolean
}

export const TableAsistencia = (props: IProps) => {
  const { alumnos, isDisabled } = props
  const methods = useFormContext<IAsistenciaSave>()

  return (
    <>
      <table
        className="w-full"
        aria-label="Asistencias de los alumnos"
      >
        <thead className="bg-success-800 ">
          <tr className="text-white text-sm">
            <th className="p-2">N° Documento</th>
            <th className="p-2">Alumno</th>
            <th className="p-2">Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {alumnos?.map((alumno, index) => (
            <tr
              key={alumno.id}
              className="text-sm font-medium border-b border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out"
            >
              <td className="px-4 py-3">{alumno.numero_documento}</td>
              <td className="px-4 py-3">
                {alumno.nombre} {alumno.apellidos}
              </td>
              <td className="px-4 py-3 flex flex-col items-center">
                <Controller
                  key={alumno.id}
                  name={`asistencias.${index}.asistencia`}
                  rules={{ required: true }}
                  control={methods.control}
                  render={({ field: { value, onChange } }) => (
                    <RadioGroup
                      className="flex gap-2"
                      orientation="horizontal"
                      onValueChange={onChange}
                      value={value}
                      isDisabled={isDisabled}
                    >
                      <Radio value="P">Presente</Radio>
                      <Radio value="F">Falta</Radio>
                      <Radio value="J">Justificado</Radio>
                    </RadioGroup>
                  )}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
