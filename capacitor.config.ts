import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lifeworkspace.app',
  appName: '全能生活工作台',
  webDir: 'www',
  server: {
    // 允许在原生 WebView 中访问本地资源（全离线，无需联网）
    androidScheme: 'http'
  },
  plugins: {}
};

export default config;
