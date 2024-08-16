'use client'
import { Divider } from '@nextui-org/react'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <article className="flex flex-col items-center">
      <main className="flex flex-col gap-3 w-full max-w-5xl border p-6 rounded-lg">
        <header className="w-full flex flex-col gap-3">
          <div>
            <h2 className="text-slate-950 text-2xl font-bold">Perfil</h2>
            <p className="text-slate-500 text-sm font-normal">
              Gestiona tu información personal, de contacto y de la cuenta.
            </p>
          </div>
          <Divider aria-label="divider" />
        </header>
        <main className="w-full ">{children}</main>
      </main>
    </article>
  )
}
