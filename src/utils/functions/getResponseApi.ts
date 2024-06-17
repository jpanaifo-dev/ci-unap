interface ErrorResponse {
  status: number
  message: string
}

export async function extractErrorInfo(
  response: Response
): Promise<ErrorResponse> {
  const errorInfo: ErrorResponse = {
    status: response.status,
    message: '',
  }

  // Si el estado es diferente de 200 (éxito), intentamos extraer el mensaje de error del cuerpo de la respuesta
  if (!response.ok) {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      // Si el tipo de contenido es JSON, intentamos analizar el cuerpo de la respuesta para obtener el mensaje de error
      try {
        const data = await response.json()
        if (data && data.message) {
          errorInfo.message = data.message
        } else {
          errorInfo.message = 'Error desconocido'
        }
      } catch (error) {
        errorInfo.message = 'Error desconocido'
      }
      return errorInfo
    } else {
      // Si no es JSON, simplemente devolvemos el estado de la respuesta
      errorInfo.message = 'Error desconocido'
      return errorInfo
    }
  } else {
    // Si el estado es 200, indicamos que no hay error
    errorInfo.message = 'No hay error'
    return errorInfo
  }
}

// Ejemplo de uso:
const response = {
  status: 500,
  ok: false,
  headers: new Headers(),
  json: () => Promise.resolve({ message: 'Error interno del servidor' }),
}

extractErrorInfo(response as unknown as Response)
  .then((errorInfo) => {
    console.log('Estado:', errorInfo.status)
    console.log('Mensaje de error:', errorInfo.message)
  })
  .catch((err) => {
    console.error('Ocurrió un error al extraer la información de error:', err)
  })
