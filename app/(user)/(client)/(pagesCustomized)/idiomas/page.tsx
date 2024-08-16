import type { Metadata } from 'next'
import { Banner, ProgramsList } from '@/modules/client'

export const metadata: Metadata = {
  title: 'CENTRO DE IDIOMAS | Nuestros programas',
  description: 'Conoce nuestros programas de idiomas',
}
export default function Idiomas() {
  return (
    <>
      <Banner />
      <main className="container">
        <section className="section">
          <ProgramsList />
        </section>
      </main>
    </>
  )
}
