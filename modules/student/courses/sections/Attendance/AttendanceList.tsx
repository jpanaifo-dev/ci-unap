/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useAttendance } from '@/modules/student'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { IAsistencia, IInscriptions, IResApi } from '@/types'
import { Skeleton } from '@nextui-org/react'

interface IProps {
  dataInscriptions?: IInscriptions
}

export const AttendanceList = (props: IProps) => {
  const { dataInscriptions } = props
  const { getAttendance, listAttendaces, loading } = useAttendance()
  const { id } = useParams()

  useEffect(() => {
    getAttendance({
      inscripcion__grupo__id: Number(id),
      inscripcion__grupo__docente__id: dataInscriptions?.grupo?.docente?.id,
      inscripcion__id: dataInscriptions?.id,
      inscripcion__matricula__id: dataInscriptions?.matricula?.id,
      inscripcion__matricula__expediente__id:
        dataInscriptions?.matricula?.expediente?.id,
    })
  }, [])

  const asistencia: IResApi<IAsistencia> =
    listAttendaces as IResApi<IAsistencia>

  return (
    <main className="flex flex-col gap-3">
      <section className="pb-4">
        <h1 className="text-xl font-bold text-gray-800">
          Mis asistencias registradas
        </h1>
        <p className="text-xs text-gray-500">
          Lista de asistencias registradas en este curso
        </p>
      </section>
      <section>
        {loading && (
          <div className="flex flex-col gap-4">
            <Skeleton className="w-full p-4 rounded-xl h-24" />
            <Skeleton className="w-full p-4 rounded-xl h-24" />
          </div>
        )}
        {asistencia?.results.length === 0 && (
          <>
            <section className="p-4 border rounded-lg">
              <h1 className="font-bold">
                No hay asistencias registradas en este curso
              </h1>
              <p className="text-sm text-gray-500">
                No se ha registrado ninguna asistencia en este curso, por favor
                contacta al docente para más información
              </p>
            </section>
          </>
        )}
      </section>
    </main>
  )
}
