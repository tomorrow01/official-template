export const useApiConfig = () => { 
  const runtimeConfig = useRuntimeConfig(); 
  return { apiBase: runtimeConfig.public.apiBase }; 
}; 