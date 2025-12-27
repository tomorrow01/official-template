import { config } from '@vue/test-utils';
import ElementPlus from 'element-plus';

// 配置 Vue Test Utils
config.global.plugins = [ElementPlus];
config.global.mocks = {
  $t: (key: string) => key, // 模拟 i18n
};
