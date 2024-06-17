import { fetchCore } from '@/api'
import { Banner, ContactAside, DetailsProgram } from '@/modules/client'
import { ILanguages, IModality, IModule, IResApi } from '@/types'
import type { Metadata } from 'next'

interface IProps {
  params: {
    lang: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

function decodeQueryParam(param: string): string {
  return decodeURIComponent(param.replace(/%20/g, ' '))
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  // read route params
  const lang = params.lang
  const name = decodeQueryParam(lang)

  const programRes = await fetchCore(
    `gestor/Programa/?nombre__icontains=${name.toLowerCase()}`,
    {
      method: 'GET',
      cache: 'no-cache',
      next: {
        revalidate: 1,
      },
    }
  )

  if (!programRes.ok) {
    return {
      title: `CIUNAP | ${name.toUpperCase()}`,
      description: 'Conoce nuestros programas de idiomas',
    }
  }

  let openGraph = {}

  const programData: IResApi<ILanguages> =
    (await programRes.json()) as IResApi<ILanguages>

  if (programData.results.length === 0 && programData.results[0].image) {
    openGraph = {
      title: `CIUNAP | ${name.toUpperCase()}`,
      description: 'Conoce nuestros programas de idiomas',
      type: 'website',
      locale: 'es_ES',
      url: `https://www.ciunap.edu.ec/idiomas/${lang}`,
      images: [`${programData.results[0].image ?? ''}`],
    }
  } else {
    openGraph = {
      title: `CIUNAP | ${name.toUpperCase()}`,
      description: 'Conoce nuestros programas de idiomas',
    }
  }

  return {
    title: `CIUNAP | ${name.toUpperCase()}`,
    // description: data.results[0].modalidad.programa.descripcion,
    description: 'Conoce nuestros programas de idiomas',
    openGraph: openGraph,
  }
}

export default async function Page(props: IProps) {
  const { lang } = props.params
  const {
    searchParams: { modalidad },
  } = props

  const name = decodeQueryParam(lang)

  //Consultar programa
  const programRes = await fetchCore(
    `gestor/Programa/?nombre__icontains=${name}`,
    {
      method: 'GET',
      cache: 'no-cache',
      next: {
        revalidate: 1,
      },
    }
  )

  if (!programRes.ok) {
    return (
      <>
        <div>Error</div>
      </>
    )
  }

  const programData: IResApi<ILanguages> =
    (await programRes.json()) as IResApi<ILanguages>

  //Consultar modalidades
  const modalitiesRes = await fetchCore(
    `gestor/Modalidad/?programa__id=${programData.results[0]?.id}`,
    {
      method: 'GET',
    }
  )

  const modalities: IResApi<IModality> =
    (await modalitiesRes.json()) as IResApi<IModality>

  //modalidad default
  const modalidadDefault = modalidad || modalities.results[0]?.id

  //Consultar modulos
  const modulesRes = await fetchCore(
    `gestor/ModuloNivel/?modalidad__programa__id=${programData.results[0].id}&modalidad__id=${modalidadDefault}`,
    {
      method: 'GET',
    }
  )

  const modules: IModule[] = (await modulesRes.json()) as IModule[]

  return (
    <>
      <Banner
        image={programData.results[0].image ?? ''}
        subtitle="Conoce nuestros programas de idiomas"
      />
      <main className="container section flex flex-col lg:flex-row gap-5">
        <DetailsProgram
          image={programData.results[0].image ?? ''}
          program={programData.results[0]}
          modalities={modalities}
          modules={modules}
        />
        <aside className="w-full max-w-sm">
          <ContactAside />
        </aside>
      </main>
    </>
  )
}
