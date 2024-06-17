'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'

// import Image from 'next/image'
import { imgStudents } from '@/assets'
import { Divider, Image } from '@nextui-org/react'

export const ModulesSection = () => {
  return (
    <>
      <section className="container">
        <main className="lg:p-6">
          {/* <header className="flex flex-col justify-center items-center gap-2">
            <h1 className="text-3xl lg:text-4xl">
              Matricúlate en cualquiera de nuestros programas disponibles
            </h1>
            <h3>Programas disponibles en el CIUNAP</h3>
          </header> */}
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
              <CustonSlider
                title="Aprendizaje Juvenil"
                description='Nuestros programas "Juniors" en el Centro de Idiomas de la UNAP ofrecen una experiencia de aprendizaje dinámica y divertida para adolescentes en su viaje hacia la fluidez lingüística.'
                className="bg-danger-400"
                image="https://s3.amazonaws.com/files.pucp.edu.pe/homepucp/uploads/2020/05/26123547/afc_curso-ingles-junior.png"
              />
            </SwiperSlide>
            <SwiperSlide>
              <CustonSlider
                title="Aventura Lingüística"
                description="Únete a la emocionante aventura del aprendizaje con nuestros programas Kids en el Centro de Idiomas de la UNAP, diseñados específicamente para los más jóvenes con actividades interactivas y educativas."
                className="bg-success-600"
              />
            </SwiperSlide>
            <SwiperSlide>
              <CustonSlider
                title="Inmersión Rápida"
                description="Sumérgete en el idioma con nuestros programas intensivos en el Centro de Idiomas de la UNAP, ideales para un aprendizaje acelerado y profundo."
                className="bg-warning-500"
              />
            </SwiperSlide>
            <SwiperSlide>
              <CustonSlider
                title="Conoce un nuevo idioma"
                description="Obtén una sólida base lingüística con nuestros cursos regulares en el Centro de Idiomas de la UNAP, diseñados para un progreso gradual y efectivo."
                className="bg-primary-500"
              />
            </SwiperSlide>
          </Swiper>
        </main>
      </section>
    </>
  )
}

interface IProps {
  title: string
  description: string
  image?: string
  className: string
}

const CustonSlider = (props: IProps) => {
  const { title, description, image, className } = props

  return (
    <>
      <main className="relative w-full pt-56 px-4 lg:p-6">
        <section
          className={`px-6 pb-8 pt-12 lg:p-16 w-full rounded-xl text-white grid grid-cols-1 sm:grid-cols-2 gap-4 ${className}`}
        >
          <main className="flex flex-col gap-3">
            <header>
              <p className="text-sm">Nuestras modalidades</p>
              <h1 className="text-4xl lg:font-bold">{title}</h1>
              <Divider className="bg-white m-2 p-[1px] max-w-72" />
            </header>
            <div>
              <p>{description}</p>
            </div>
          </main>
        </section>
        <div className="absolute top-0 right-0 z-10">
          <Image
            src={image ?? imgStudents.src}
            alt="image"
            width={600}
            height={600}
            className="rounded-xl"
          />
        </div>
      </main>
    </>
  )
}
