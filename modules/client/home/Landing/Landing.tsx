'use client'
import { IPublicationFile } from '@/types'
import { isFile, isImage } from './validateTypeFile'
import { TFiles, TImages } from '../templates'

interface IProps {
  publication: IPublicationFile
}

export const Landing = (props: IProps) => {
  const { publication } = props

  const fileImage = isImage(publication?.archivo)

  const fileArchive = isFile(publication?.archivo)

  return (
    <>
      {fileImage && (
        <TImages
          publication={publication}
          subtitle="Conoce más sobre esta publicación"
        />
      )}
      {fileArchive && (
        <TFiles
          publication={publication}
          subtitle="Conoce más sobre esta publicación"
        />
      )}
    </>
  )
}
