interface LayoutTestimonioProps {
  children: React.ReactNode
  aside?: React.ReactNode
}

export const LayoutTestimonio = (props: LayoutTestimonioProps) => {
  const { children, aside } = props
  return (
    <main className="grid grid-cols-2 gap-4 items-start h-full">
      <article className="w-full h-full">{children}</article>
      <aside className="w-full">{aside}</aside>
    </main>
  )
}
