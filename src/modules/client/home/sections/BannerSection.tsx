'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { TEvents } from '../templates'
import { IPublicationFile, IResApi } from '@/types'
import { Landing } from '../Landing'

interface IProps {
  publications: IResApi<IPublicationFile>
}

export const BannerHomeSection = (props: IProps) => {
  const { publications } = props

  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      loop={true}
      autoplay={{
        delay: 8000,
      }}
      modules={[Pagination, EffectFade, Navigation, Autoplay]}
      className="mySwiper"
      navigation={false}
    >
      <SwiperSlide>
        <TEvents
          title="CENTRO DE IDIOMAS - CIUNAP"
          subtitle="Bienvenido al centro de idiomas de la Universidad Nacional de la Amazonía Peruana, descubre todo lo que tenemos para ti"
          descriptionImage="Descripción de la imagen del evento"
          href="/idiomas"
          image="https://lh5.googleusercontent.com/p/AF1QipMm97-0QqmHju7mIImTrWF1AgYAWrltOVmUNkWX"
        />
      </SwiperSlide>
      {publications?.results.length > 0 && (
        <>
          {publications.results.map((publication, index) => (
            <SwiperSlide key={index}>
              <Landing publication={publication} />
            </SwiperSlide>
          ))}
        </>
      )}
    </Swiper>
  )
}
