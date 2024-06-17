export default function Layout({
  children,
  publications,
}: {
  children: React.ReactNode
  publications: React.ReactNode
}) {
  return (
    <>
      <main className="flex gap-5 container items-start py-6">
        <article className="w-full">{children}</article>
        <aside className="max-w-sm hidden lg:block w-full sticky top-16">
          {publications}
        </aside>
      </main>
    </>
  )
}
