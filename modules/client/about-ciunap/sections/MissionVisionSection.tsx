import arrowIcon from '@/assets/svg/arrow-icon.svg'
import flag1Icon from '@/assets/svg/flag.svg'
import flag2Icon from '@/assets/svg/flag2.svg'
import { Divider } from '@nextui-org/react'

import Image from 'next/image'

export const MissionAndVisionSection = () => {
  return (
    <>
      <section className="container section">
        <div className="flex-col justify-start items-start gap-8 inline-flex">
          <header className="self-stretch justify-start items-center gap-3 inline-flex">
            <Image
              src={arrowIcon}
              alt="arrow"
              width={67}
              height={47}
            />
            <div className="grow shrink basis-0 text-slate-950 text-[32px] font-medium">
              Lo que nos mueve{' '}
            </div>
          </header>
          <main className="self-stretch flex-col justify-start items-start gap-10 flex">
            <section className="lg:self-stretch justify-start items-start gap-8 lg:inline-flex">
              <div className="sm:w-0 md:w-0 lg:w-[420px] text-white text-base font-medium"></div>
              <main className="grow shrink basis-0 p-8 bg-warning-500 rounded-lg flex-col justify-center items-end gap-4 inline-flex">
                <h2 className="self-stretch text-white text-4xl font-bold">
                  Nuestra Misión
                </h2>
                <div className="w-full">
                  <Divider className="max-w-64 p-[1.3px] bg-white " />
                </div>
                <p className="self-stretch text-white text-base font-medium">
                  La Universidad Nacional de la Amazonía Peruana – UNAP, es una
                  institución pública que forma profesionales con calidad y
                  excelencia, enmarcada en sus fines y principios de enseñanza,
                  investigación científica, tecnológica y proyección social, con
                  énfasis en el desarrollo sostenible y sustentable de la
                  Amazonía, a fin de contribuir al progreso de la Región y
                  Nación.
                </p>
                <Image
                  src={flag1Icon}
                  alt="flag"
                  width={52}
                  height={52}
                />
              </main>
            </section>
            <section className="self-stretch justify-start items-start gap-8 lg:inline-flex">
              <div className="grow shrink basis-0 p-8 bg-greenCiunap-500 rounded-lg flex-col justify-center items-end gap-4 inline-flex">
                <h2 className="self-stretch text-white text-4xl font-bold">
                  Nuestra Visión
                </h2>
                <div className="w-full">
                  <Divider className="max-w-64 p-[1.3px] bg-white " />
                </div>
                <p className="self-stretch text-white text-base font-medium">
                  Ser reconocidos como institución líder, académica, científica,
                  tecnológica y cultural, generadora del desarrollo sostenible y
                  sustentable de la Amazonía, integrada al mundo.
                </p>
                {/* <div className="w-[52px] h-[52px] relative" /> */}
                <Image
                  src={flag2Icon}
                  alt="flag"
                  width={52}
                  height={52}
                />
              </div>
              <div className="sm:w-0 md:w-0 lg:w-[420px] text-white text-base font-medium font-['Inter']"></div>
            </section>
          </main>
        </div>
      </section>
    </>
  )
}
