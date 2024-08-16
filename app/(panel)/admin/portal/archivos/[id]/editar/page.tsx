import { FrmFileEditor } from '@/modules/admin'
import { IPortalFileList, IResApi } from '@/types'
import { fetchFileList } from '@/api'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  let data: IPortalFileList = {} as IPortalFileList

  try {
    const response = await fetchFileList({ id: parseInt(id) })
    if (response.ok) {
      const dataRes: IResApi<IPortalFileList> =
        (await response.json()) as IResApi<IPortalFileList>
      data = dataRes.results[0]
    }
  } catch (error) {
    console.error('Error:', error)
  }

  return (
    <>
      <FrmFileEditor data={data} />
    </>
  )
}
