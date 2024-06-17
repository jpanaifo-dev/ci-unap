interface IProps {
  title: string
  content?: React.ReactNode
}

export const DetailsHeader = (props: IProps) => {
  const { title, content } = props
  return (
    <header className="w-full flex flex-col gap-1">
      <div>
        <h1 className="font-bold text-2xl text-white">{title}</h1>
      </div>
      <div>{content}</div>
    </header>
  )
}
