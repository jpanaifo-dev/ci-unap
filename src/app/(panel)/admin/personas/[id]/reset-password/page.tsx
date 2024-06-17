import { FrmResetPassword } from '@/modules/admin'

interface IProps {
  params: {
    id: string
  }
}

export default function Page(props: IProps) {
  const { id } = props.params

  return (
    <main className="w-full flex flex-col gap-3 items-center">
      <FrmResetPassword id={id} />
    </main>
  )
}
