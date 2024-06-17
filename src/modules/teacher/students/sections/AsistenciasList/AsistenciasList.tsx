'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { IColumns, IRows, TableCustom } from '@/modules/admin'
import { HeaderPage, IAsistencias } from '@/modules/teacher'
import { RenderActionColum } from './RenderActionColum'
import { usePathname } from 'next/navigation'
import { NotStudents } from '@/modules/core'

const col: IColumns[] = [
  {
    key: 'num',
    label: '#',
    align: 'center',
  },
  {
    key: 'date',
    label: 'Fecha',
    align: 'center',
  },
  {
    key: 'presents',
    label: 'Presentes',
    align: 'center',
  },
  {
    key: 'absents',
    label: 'Ausentes',
    align: 'center',
  },
  {
    key: 'justified',
    label: 'Justificados',
    align: 'center',
  },
  {
    key: 'assing',
    label: 'Asistencia',
    align: 'center',
  },
]

interface IProps {
  asistencias: IAsistencias
}

function findDateNow(list: IAsistencias, date: Date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const mes = month.toString().padStart(2, '0')
  const year = date.getFullYear()

  const foundDate = list.asistencias.find(
    (item) => item.fecha.toString() === `${day}-${mes}-${year}`
  )
  return foundDate !== undefined
}

export const AsistenciasList = (props: IProps) => {
  const { asistencias } = props
  const pathname = usePathname()

  const dateNow = new Date()
  const isDateNow = findDateNow(asistencias, dateNow)

  const data: IRows[] = asistencias?.asistencias.map((asistencia, i) => ({
    key: i,
    num: i + 1,
    date: asistencia?.fecha,
    presents: asistencia?.presentes,
    absents: asistencia?.ausentes,
    justified: asistencia?.justificados,
    assing: <RenderActionColum date={asistencia.fecha} />,
  }))

  return (
    <>
      {data.length > 0 ? (
        <main className="w-full">
          <HeaderPage
            title="Asistencias"
            description="Listado de asistencias registradas en el curso"
            isButton={!isDateNow}
            labelButton="Registrar asistencia"
            path={`${pathname}/nuevo`}
          />
          <section>
            <TableCustom
              columns={col}
              rows={data}
              disableInputSearch
            />
          </section>
        </main>
      ) : (
        <main className="flex flex-col items-center justify-center h-full sm:pt-14">
          <NotStudents />
        </main>
      )}
    </>
  )
}
