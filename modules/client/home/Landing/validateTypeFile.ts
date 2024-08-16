function isImage(file: string): boolean {
  const imageExtensions = ['jpg', 'png', 'jpeg', 'gif', 'webp']
  const fileExtension = file.split('.').pop()?.toLowerCase()
  return fileExtension ? imageExtensions.includes(fileExtension) : false
}

function isFile(file: string): boolean {
  const fileExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx']
  const fileExtension = file.split('.').pop()?.toLowerCase()
  return fileExtension ? fileExtensions.includes(fileExtension) : false
}

export { isImage, isFile }
