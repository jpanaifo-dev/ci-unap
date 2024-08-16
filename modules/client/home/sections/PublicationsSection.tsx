'use client'
import { IPublicationFile, IResApi } from '@/types'
import { Button } from '@nextui-org/button'
import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules'

import { CardPublication } from '@/modules/client'

interface IProps {
  listPublications: IResApi<IPublicationFile>
}

export const PublicationsSection = (props: IProps) => {
  const { listPublications } = props

  return (
    <>
      {listPublications?.results?.length > 0 && (
        <main className="container section flex flex-col items-center">
          <header className="flex flex-col justify-center items-center gap-2">
            <h1 className="text-3xl lg:text-4xl">
              El CIUNAP trabajando al servicio de sus alumnos
            </h1>
            <h3>Publicaciones del centro de idiomas</h3>
          </header>
          <section className="lg:py-10 lg:px-16 w-full">
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
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
              modules={[Pagination, Navigation, Autoplay]}
              className="mySwiper"
            >
              {listPublications?.results.map((publication) => (
                <SwiperSlide key={publication.id}>
                  <CardPublication {...publication} />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
          <section>
            <div className="">
              <Button
                variant="solid"
                endContent={<IconArrowRight stroke={1} />}
                as={Link}
                href="/publicaciones"
                radius="full"
                color="success"
                className="text-white"
              >
                Ver todas las publicaciones
              </Button>
            </div>
          </section>
        </main>
      )}
    </>
  )
}
