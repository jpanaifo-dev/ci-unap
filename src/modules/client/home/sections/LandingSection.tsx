'use client'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'
import { Image } from '@nextui-org/react'
import { imgLanding1, imgLanding2 } from '@/assets'

import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'

export const LandingSection = () => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      loop={true}
      autoplay={{
        delay: 5000,
      }}
      modules={[Pagination, EffectFade, Navigation, Autoplay]}
      className="mySwiper"
      navigation={false}
    >
      <SwiperSlide>
        <section className="container bg-white h-screen max-h-[calc(100vh-4rem)] flex flex-col sm:flex-row items-center relative">
          <div className="absolute right-0 bottom-0  lg:bottom-none  lg:pr-12 lg:max-h-[calc(100vh-4rem)]">
            <Image
              src={imgLanding1.src}
              alt="landin01"
              removeWrapper
              className="object-cover h-full  lg:h-[22rem] xl:h-full lg:max-h-[calc(100vh-4rem)]"
            />
          </div>
          <main className="flex items-center absolute bottom-0 top-0 z-20 p-4">
            <div className="flex gap-4">
              <div className="flex flex-col gap-4 max-w-2xl lg:min-w-xl">
                <h1 className="text-4xl sm:text-6xl font-bold">
                  Cursos Flexibles para Todos:
                  <span className="text-warning-500"> Desde Jóvenes </span>
                  hasta <span className="text-warning-500"> Adultos </span>
                </h1>
                <p className="font-medium">
                  Explora Nuestros Programas de Idiomas Extranjeros
                </p>
                <div className="pt-4">
                  <Button
                    size="lg"
                    variant="shadow"
                    color="warning"
                    radius="full"
                    className="text-white"
                    as={Link}
                    href="/idiomas"
                    endContent={<IconArrowRight />}
                  >
                    Ver aquí{' '}
                  </Button>
                </div>
              </div>
              <div></div>
            </div>
          </main>
        </section>
      </SwiperSlide>
      <SwiperSlide>
        <section className="container bg-white h-screen max-h-[calc(100vh-4rem)] flex flex-col sm:flex-row items-center relative">
          <main className="flex items-center absolute bottom-0 top-0 z-20 p-4">
            <div className="flex gap-4">
              <div className="flex flex-col gap-4 max-w-2xl lg:min-w-xl">
                <h1 className="text-4xl sm:text-6xl font-bold">
                  Cursos Flexibles para Todos:
                  <span className="text-warning-500"> para niños </span>
                  de{' '}
                  <span className="text-warning-500"> todas las edades </span>
                </h1>
                <p className="font-medium">
                  Explora Nuestros Programas de Idiomas Extranjeros
                </p>
                <div>
                  <Button
                    size="lg"
                    variant="shadow"
                    color="warning"
                    radius="full"
                    className="text-white"
                    as={Link}
                    href="/idiomas"
                    endContent={<IconArrowRight />}
                  >
                    Ver aquí{' '}
                  </Button>
                </div>
              </div>
              <div></div>
            </div>
          </main>
          <div className="absolute right-0 bottom-0  lg:bottom-none  lg:pr-12 lg:max-h-[calc(100vh-4rem)]">
            <Image
              src={imgLanding2.src}
              alt="landin02"
              removeWrapper
              className="object-cover sm:w-full h-[20rem] lg:h-[22rem] xl:h-full max-h-[calc(100vh-4rem)]"
            />
          </div>
        </section>
      </SwiperSlide>
    </Swiper>
  )
}
