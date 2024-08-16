import { fetchCore } from '@/api'
import {
  BannerHomeSection,
  IndicatorsSection,
  LanguagesNativeSection,
  LanguagesSection,
  ModulesSection,
  TestimonialSection,
  PublicationsSection,
  MessagesSection,
} from '@/modules/client'
import { ILanguages, IPublicationFile, IResApi, ITestimony } from '@/types'

export default async function Home() {
  const resPrograms = await fetchCore('gestor/Programa/?is_active=true', {
    method: 'GET',
    cache: 'no-cache',
  })

  const resTestimonials = await fetchCore(
    'portal/TestimonioList/?is_public=true',
    {
      method: 'GET',
      cache: 'no-cache',
    }
  )

  const resPublications = await fetchCore('portal/PublicacionFileList/', {
    method: 'GET',
    cache: 'no-cache',
  })

  const resPubliBanner = await fetchCore(
    'portal/PublicacionFileList/?&is_active=true&publicacion__is_banner=true',
    {
      method: 'GET',
      cache: 'no-cache',
    }
  )

  if (!resPrograms.ok) {
    return <></>
  }
  const data: IResApi<ILanguages> =
    (await resPrograms.json()) as IResApi<ILanguages>

  if (!resTestimonials.ok) {
    return <></>
  }

  const dataTestimonials: IResApi<ITestimony> =
    (await resTestimonials.json()) as IResApi<ITestimony>

  if (!resPublications.ok) {
    return <></>
  }

  const dataPublications: IResApi<IPublicationFile> =
    (await resPublications.json()) as IResApi<IPublicationFile>

  const dataPubliBanner: IResApi<IPublicationFile> =
    (await resPubliBanner.json()) as IResApi<IPublicationFile>

  return (
    <main>
      <BannerHomeSection publications={dataPubliBanner} />
      <IndicatorsSection />
      <MessagesSection />
      <LanguagesSection listPrograms={data?.results} />
      <LanguagesNativeSection />
      <ModulesSection />
      <TestimonialSection listTestimonials={dataTestimonials} />
      <PublicationsSection listPublications={dataPublications} />
    </main>
  )
}
