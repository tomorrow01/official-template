// 从Nuxt运行时配置获取API基地址
import { useRuntimeConfig } from '#app';

export const API_BASE = useRuntimeConfig().public.apiBase;