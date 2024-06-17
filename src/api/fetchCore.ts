const isProduction = process.env.NODE_ENV === 'production';
const urlLocal = process.env.API_URL_DEV;
const urlProd = process.env.API_URL_PROD;

const urlBase = isProduction ? urlProd : urlLocal;

export async function fetchCore(
  path: string,
  options: RequestInit,
  nextConfig?: { [key: string]: any }
) {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const newOptions = {
      ...options,
      headers: { ...headers, ...(options?.headers || {}) },
      ...nextConfig,
    };

    const url = `${urlBase}${path}`;

    const response = await fetch(url, newOptions);

    if (!response.ok) {
      // throw new Error(`HTTP error! Status: ${response.status}`);
      return response;
    }

    return response;
  } catch (error) {
    console.error('An error occurred during fetchCore:', error);
    throw error;
  }
}
