// 扩展 Nuxt 配置类型，包含 elementPlus、css、app 和 runtimeConfig 属性
declare module '@nuxt/schema' {
  interface NuxtConfig {
    /** Element Plus Nuxt 模块配置项 */
    elementPlus?: {
      icon?: string;
      importStyle?: 'css' | 'scss';
    };
    /** 全局 CSS 文件配置 */
    css?: string[];
    /** 应用级配置（如头部信息、布局等） */
    app?: {
      head?: {
        title?: string;
        meta?: Array<{ name?: string; content?: string }>;
        link?: Array<{ rel?: string; type?: string; href?: string }>;
      };
      // 可根据需要补充更多 app 子配置项
    };
    /** 运行时配置（用于环境变量或服务端配置） */
    runtimeConfig?: {
      public?: Record<string, any>;
      [key: string]: any;
    };
  }
}

// 确保类型被正确识别（无需修改）
export {};