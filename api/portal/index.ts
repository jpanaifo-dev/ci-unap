import { fetchPublicationsList } from './publication'
import {
  fetchPublicationsTypes,
  postOrUpdPublicationType,
  fetchPublicationTypeById,
} from './publicationType'
import { fetchPublicationsFileList } from './publicationFile'
import {
  fetchPublicationsFilesTypes,
  fetchPublicationFileTypeById,
  postOrUpdPublicationFileType,
} from './PublicationFileType'
import { fetchTipo, fetchTipoById, postOrUpdateTipo } from './tipo'
import { fetchFileList, createOrUpdateFile } from './file'
import { fetchTestimonioList } from './testimonio'

export {
  fetchPublicationsList,
  fetchPublicationsTypes,
  fetchPublicationsFileList,
  fetchPublicationsFilesTypes,
  fetchTipo,
  fetchFileList,
  fetchTestimonioList,
  postOrUpdPublicationType,
  fetchPublicationTypeById,
  fetchPublicationFileTypeById,
  postOrUpdPublicationFileType,
  fetchTipoById,
  postOrUpdateTipo,
  createOrUpdateFile,
}
