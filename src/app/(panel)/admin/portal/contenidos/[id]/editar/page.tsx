import { FrmContentEditor, FrmPublicationEditor } from '@/modules/admin'
import { IPublicationFileList, IResApi } from '@/types'
import { fetchPublicationsFileList } from '@/api'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  let dataPublication: IPublicationFileList = {} as IPublicationFileList

  try {
    const data = await fetchPublicationsFileList({ id: Number(id) })

    if (data?.ok) {
      const dataRes: IResApi<IPublicationFileList> =
        (await data.json()) as IResApi<IPublicationFileList>

      dataPublication = dataRes.results[0]
    }
  } catch (error) {
    console.log(error)
  }

  return <FrmContentEditor dataDeafult={dataPublication} />
}
