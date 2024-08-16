import Image from 'next/image'
import { imgLogoUnap, imgFlags } from '@/assets'

export const BannerSection = () => {
  return (
    <>
      <main className="relative w-full h-60">
        <Image
          src={imgFlags.src}
          alt="Banderas de diferentes países"
          width={1820}
          height={240}
          priority
          className="h-full object-cover rounded-lg"
        />
        <main className="bg-success-800/90 w-full p-4 rounded-lg absolute top-0 bottom-0 grid grid-cols-6">
          <div className="col-span-1"></div>
          <section className="h-full flex flex-col justify-end col-span-5">
            <h1 className="text-3xl font-bold text-white">
              Centro de idiomas de la Universidad Nacional de la Amazonía
              Peruana - (CIUNAP)
            </h1>
          </section>
        </main>
        <Image
          src={imgLogoUnap.src}
          alt="Logo de la Universidad Nacional de la Amazonía Peruana"
          width={160}
          height={160}
          priority
          className="rounded-full absolute -bottom-10 left-6 shadow-lg"
        />
      </main>
    </>
  )
}
