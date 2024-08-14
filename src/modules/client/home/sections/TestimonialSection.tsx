'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules'

import { Avatar, Card, CardBody } from '@nextui-org/react'
import { IResApi, ITestimony } from '@/types'
import { imgLogoUnap } from '@/assets'
import { RenderStar } from '@/modules/core'

interface IProps {
  listTestimonials: IResApi<ITestimony>
}

export const TestimonialSection = (props: IProps) => {
  const { listTestimonials } = props
  return (
    <>
      {listTestimonials && listTestimonials.results.length > 0 ? (
        <section className="container section flex flex-col gap-6">
          <main className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-3xl">Nos cuentan sus experiencias</h1>
              <p>
                Conoce lo que nuestros estudiantes opinan de nuestros programas
              </p>
            </div>
            <div className="w-full lg:py-10 lg:px-16">
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                navigation={true}
                autoplay={{
                  delay: 5000,
                }}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                  },
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
              >
                {listTestimonials?.results.map((testimonial) => (
                  <SwiperSlide key={testimonial.id}>
                    <div key={testimonial.id}>
                      <Card
                        shadow="none"
                        className="text-gray-900"
                      >
                        <CardBody className="p-6">
                          <div className="flex flex-col gap-3">
                            <header className="flex gap-3">
                              <Avatar
                                src={imgLogoUnap.src}
                                alt="avatar"
                              />
                              <div>
                                <h1 className="font-semibold">
                                  {testimonial.persona?.nombres +
                                    ' ' +
                                    testimonial.persona?.apellido_paterno +
                                    ' ' +
                                    testimonial.persona?.apellido_materno}
                                </h1>
                                <p className="text-gray-500 text-xs sm:text-sm">
                                  Estudiante
                                </p>
                              </div>
                            </header>
                            <main>
                              <p className="text-gray-400">
                                {testimonial.contenido}
                              </p>
                            </main>
                            <footer className="flex gap-2 items-center">
                              <p className="text-gray-500 text-xs sm:text-sm">
                                Mi valoración al CIUNAP es:
                              </p>
                              <RenderStar value={testimonial.valoracion} />
                            </footer>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </main>
        </section>
      ) : (
        <></>
      )}
    </>
  )
}
