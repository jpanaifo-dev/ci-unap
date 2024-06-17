'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'

import { IPublicationFile, IResApi } from '@/types'
import { Image } from '@nextui-org/react'

interface IProps {
  publicationFiles: IResApi<IPublicationFile>
}

export const ImagesSection = (props: IProps) => {
  const { publicationFiles } = props

  //filtar solo archivos de imagen
  const images = (publicationFiles.results = publicationFiles.results?.filter(
    (file) =>
      file.archivo?.includes('.jpg') ||
      file.archivo?.includes('.jpeg') ||
      file.archivo?.includes('.png') ||
      file.archivo?.includes('.webp')
  ))

  return (
    <>
      <section id="image-section w-full">
        {images.length === 0 && (
          <>
            <Image
              src="https://imgmedia.elpopular.pe/640x358/elpopular/original/2022/05/27/62918a299c8d6a305a60573f.webp"
              alt="image"
              removeWrapper
              className="w-full lg:h-[524px] object-cover rounded-md"
            />
            <div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-500">
                Centro de idiomas de la Universidad Nacional de la Amazonía
                Peruana
              </p>
            </div>
          </>
        )}
        {images.length > 0 && (
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
            {images?.map((file, index) => (
              <SwiperSlide
                key={index}
                className="w-full lg:h-[524px] object-cover rounded-md"
              >
                <Image
                  src={file.archivo || ''}
                  alt="image"
                  removeWrapper
                  className="w-full lg:h-[524px] object-cover rounded-md"
                />
                <div className="pt-3">
                  <p className="text-sm sm:text-base lg:text-lg text-gray-500">
                    {file.descripcion}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    </>
  )
}
