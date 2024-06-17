import Image from 'next/image'
import arrowDown from '@/assets/svg/arrow-down.svg'

export const SloganSection = () => {
  return (
    <>
      <section className="container section flex gap-4 justify-center items-center">
        <Image
          src={arrowDown}
          alt="Reglamento"
          width={67}
          height={59}
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-slate-950 text-[32px] font-medium max-w-screen-md">
            El mejor ecosistema de aprendizaje para llegar cada vez más lejos!
          </h1>
          <p className="text-slate-600 text-sm md:text-base font-medium">
            Mira cómo serán tus clases en el Centro de Idiomas UNAP
          </p>
        </div>
      </section>
    </>
  )
}
