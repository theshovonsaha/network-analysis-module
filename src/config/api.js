const API_CONFIG = {
  baseUrl:
    process.env.NEXT_PUBLIC_API_URL ||
    'https://network-analysis-module-backend.onrender.com',
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
};

export const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...API_CONFIG.defaultHeaders,
        ...options.headers,
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export default API_CONFIG;
