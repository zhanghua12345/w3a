import { defineConfig } from '@unocss/vite';
import presetUno from '@unocss/preset-uno';
import transformerDirectives from '@unocss/transformer-directives';
const spacing = () => {
  let spacArr = {};
  for (let i = 0; i <= 375; i++) {
    spacArr[2 * i] = 2 * i + 'px';
  }
  spacArr = {
    ...spacArr,
    '100vh': '100vh',
    '30b': '-30rpx',
    2000: '2000rpx'
  };
  return spacArr;
};
export default defineConfig({
  content: {
    pipeline: {
      exclude: [
        'node_modules',
        'dist',
        '.git',
        '.husky',
        '.vscode',
        'public',
        'build',
        'mock',
        './stats.html'
      ]
    }
  },
  presets: [presetUno({ dark: 'class' })],
  transformers: [transformerDirectives()],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-col-center': 'flex-center flex-col',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'i-flex-center': 'inline-flex justify-center items-center',
    'i-flex-x-center': 'inline-flex justify-center',
    'i-flex-y-center': 'inline-flex items-center',
    'flex-col': 'flex flex-col',
    'flex-col-stretch': 'flex-col items-stretch',
    'i-flex-col': 'inline-flex flex-col',
    'i-flex-col-stretch': 'i-flex-col items-stretch',
    'flex-1-hidden': 'flex-1 overflow-hidden',
    'absolute-lt': 'absolute left-0 top-0',
    'absolute-lb': 'absolute left-0 bottom-0',
    'absolute-rt': 'absolute right-0 top-0',
    'absolute-rb': 'absolute right-0 bottom-0',
    'absolute-tl': 'absolute-lt',
    'absolute-tr': 'absolute-rt',
    'absolute-bl': 'absolute-lb',
    'absolute-br': 'absolute-rb',
    'absolute-center': 'absolute-lt flex-center wh-full',
    'fixed-lt': 'fixed left-0 top-0',
    'fixed-lb': 'fixed left-0 bottom-0',
    'fixed-rt': 'fixed right-0 top-0',
    'fixed-rb': 'fixed right-0 bottom-0',
    'fixed-tl': 'fixed-lt',
    'fixed-tr': 'fixed-rt',
    'fixed-bl': 'fixed-lb',
    'fixed-br': 'fixed-rb',
    'fixed-center': 'fixed-lt flex-center wh-full',
    'nowrap-hidden': 'whitespace-nowrap overflow-hidden',
    'ellipsis-text': 'nowrap-hidden text-ellipsis',
    'page-card': 'flex-col overflow-hidden p-5 rounded color-text bg-card',
    'transition-base': 'transition-all duration-300 ease-in-out'
  },
  theme: {
    spacing: { ...spacing(), main: '28rpx' },
    colors: {
      primary: 'var(--el-color-primary)',
      primary_dark: 'var(--el-color-primary-light-5)',
      info: 'var(--el-color-info)',
      success: 'var(--el-color-success)',
      warning: 'var(--el-color-warning)',
      error: 'var(--el-color-error)',
      fill: 'var(--el-fill-color-light)',
      text: 'var(--el-text-color-primary)',
      card: 'var(--el-bg-color-overlay)',
      background: 'var(--el-bg-color)',
      borderColor: 'var(--el-border-color-lighter)',
      'main-1': 'rgb(252, 67, 50)',
      'main-2': 'rgb(0, 185, 107)',
      bg: '#f8f8f8',
      main: '#cf5d38',
      tip: '#9c9c9c',
      line: '#f0f0f0',
      'main-sub': '#b3ecff',
      'main-vip': '#805844',
      f0f0f0: '#f0f0f0',
      d6f4fa: '#d6f4fa',
      '1c1c1e': '#1c1c1e',
      '000': '#000',
      131313: '#131313',
      141414: '#141414',
      252525: '#252525',
      '5e3d05': '#5e3d05',
      '444-8': 'rgba(4,4,4,.8)',
      fff: '#fff',
      'fff-9': 'rgba(255, 255, 255, 0.9)',
      '000-9': 'rgba(0,0,0,.9)',
      'f8f8f8-5': 'rgba(248, 248, 248, 0.5)',
      'fff-8': 'rgba(255, 255, 255, 0.8)',
      '000-8': 'rgba(0,0,0,.8)',
      'fff-7': 'rgba(255, 255, 255, 0.7)',
      '000-7': 'rgba(0,0,0,.7)',
      'fff-6': 'rgba(255, 255, 255, 0.6)',
      '000-6': 'rgba(0,0,0,.6)',
      'fff-5': 'rgba(255, 255, 255, 0.5)',
      '000-5': 'rgba(0,0,0,.5)',
      'fff-4': 'rgba(255, 255, 255, 0.4)',
      '000-4': 'rgba(0,0,0,.4)',
      'fff-2': 'rgba(255, 255, 255, 0.2)',
      '000-2': 'rgba(0,0,0,.2)',
      'fff-16': 'rgba(255, 255, 255, 0.16)',
      '000-16': 'rgba(0,0,0,.16)',
      'fff-12': 'rgba(255, 255, 255, 0.12)',
      '000-12': 'rgba(0,0,0,.12)',
      'fff-1': 'rgba(255, 255, 255, 0.1)',
      '000-1': 'rgba(0,0,0,.1)',
      'fff-08': 'rgba(255, 255, 255, 0.08)',
      '000-08': 'rgba(0,0,0,.08)',
      'fff-06': 'rgba(255, 255, 255, 0.06)',
      '000-06': 'rgba(0,0,0,.06)',
      'fff-05': 'rgba(255, 255, 255, 0.05)',
      '000-05': 'rgba(0,0,0,.05)',
      'fff-04': 'rgba(255, 255, 255, 0.04)',
      '000-04': 'rgba(0,0,0,.04)',
      'fff-0': 'rgba(255, 255, 255, 0)',
      '000-0': 'rgba(0,0,0,0)',
      fdf2e0: '#fdf2e0',
      f9ebea: '#f9ebea',
      f5f4d6: '#f5f4d6',
      linear: 'linear-gradient(135deg, #FE5351 0%, #FE345B 51%, #FE3964 100%)',
      ddd: '#ddd',
      ccc: '#ccc',
      eee: '#eee',
      secondary: {
        '000': 'linear-gradient(red, yellow, blue)',
        linear: 'linear-gradient(135deg, #FE5351 0%, #FE345B 51%, #FE3964 100%)'
      }
    }
  }
});
