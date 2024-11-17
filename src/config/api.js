const API_CONFIG = {
  baseUrl:
    process.env.NEXT_PUBLIC_API_URL ||
    'https://network-analysis-module-backend.onrender.com',
  aiProvider: process.env.NEXT_PUBLIC_DEFAULT_AI_PROVIDER || 'mistral',
  enableAiAnalysis: process.env.NEXT_PUBLIC_ENABLE_AI_ANALYSIS === 'true',
};

export default API_CONFIG;
