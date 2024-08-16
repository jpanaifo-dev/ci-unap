'use client'
import { Button } from '@nextui-org/button'
import { useForm } from 'react-hook-form'
import { IInscriptions } from '@/types'
import { fetchCore } from '@/api'
import { toast } from 'react-toastify'
import { isDisabledScore } from './calcDateExpirate'
import { useRouter } from 'next/navigation'
interface IProps {
  defaulData?: IInscriptions
}

export const FrmScoreEditor = (props: IProps) => {
  const { defaulData } = props
  const { register, handleSubmit } = useForm<IInscriptions>({
    defaultValues: defaulData,
  })
  const router = useRouter()

  const date =
    defaulData?.fecha_cierre_acta !== null
      ? new Date(defaulData?.fecha_cierre_acta as string)
      : new Date()

  const isDisabled = isDisabledScore(date, 2)

  const handleExit = () => {
    router.back()
  }

  const onSubmit = async (data: IInscriptions) => {
    const { grupo, matricula, ...res } = data

    const newData = {
      ...res,
      grupo: grupo?.id,
      matricula: matricula?.id,
    }

    const response = await fetchCore(`gestor/Inscripcion/${defaulData?.id}/`, {
      method: 'PUT',
      body: JSON.stringify(newData),
    })

    if (response.ok) {
      toast.success('Notas guardadas correctamente')
      handleExit()
    } else {
      toast.error('Error al guardar las notas')
    }
  }

  return (
    <>
      <article className="w-full max-w-3xl flex flex-col gap-4 border rounded-lg p-4">
        <header>
          <h1 className="text-sm uppercase text-center text-gray-500">
            Asignar notas
          </h1>
          <p className="font-bold text-lg text-center uppercase">
            Alumno:
            {defaulData?.matricula?.expediente?.persona?.nombres}{' '}
            {defaulData?.matricula?.expediente?.persona?.apellido_paterno}{' '}
            {defaulData?.matricula?.expediente?.persona?.apellido_materno}
          </p>
        </header>
        {isDisabled && (
          <section className="p-4 rounded-md border border-warning-500 bg-warning-50">
            <h1 className="text-sm font-semibold text-warning-500">
              Las notas no se pueden modificar - Fecha fuera de rango
            </h1>
          </section>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <main className="w-full">
            <section className="border rounded-md">
              <header className="p-2 bg-gray-50 rounded-t-lg">
                <h1 className="font-bold text-center uppercase text-sm text-gray-500">
                  Notas del estudiante
                </h1>
              </header>
              <table className="w-full">
                <thead className="text-white bg-gray-800 font-light w-full">
                  <tr>
                    <th className="p-2 text-sm">Nota (50%)</th>
                    <th className="p-2 text-sm">Nota final (100%)</th>
                    <th className="p-2 text-sm">Promedio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 text-center border-l">
                      <input
                        placeholder="10"
                        className="w-32 py-2 px-6 text-xl text-center"
                        {...register('notaavance1')}
                      />
                    </td>
                    <td className="p-2 text-center border-l">
                      <input
                        placeholder="10"
                        className="w-32 py-2 px-6 text-xl text-center"
                        {...register('notaavance2')}
                      />
                    </td>
                    <td className="p-2 text-center border-l">
                      <input
                        placeholder="10"
                        className="w-32 py-2 px-6 text-xl text-center"
                        {...register('promedio')}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
            <footer className="pt-4 flex justify-end gap-3">
              <Button
                radius="sm"
                onPress={handleExit}
              >
                {isDisabled ? 'Cerrar' : 'Cancelar'}
              </Button>
              {!isDisabled && (
                <Button
                  type="submit"
                  radius="sm"
                  className="text-white button-dark"
                >
                  Guardar
                </Button>
              )}
            </footer>
          </main>
        </form>
      </article>
    </>
  )
}
