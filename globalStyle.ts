import {Dimensions, PixelRatio} from 'react-native';

export const colors = {
  // primary: '#EC8B57',
  primary: '#3DB7E8',
  // secondary: '#F2C94C',
  secondary: '#B3E4F7',
  yellow: '#ffca42',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#9B9B9B',
  lightGray: '#F2F2F2',
  darkGray: '#4F4F4F',
  error: '#E53935',
  success: '#00FF00',
  warning: '#F21616',
  info: '#0000FF',
};

const BASE_WIDTH = 360 as const;
const BASE_HEIGHT = 760 as const;

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
// ✅ 가로, 세로 스케일
export const iWidth = SCREEN_WIDTH / BASE_WIDTH;
export const iHeight = SCREEN_HEIGHT / BASE_HEIGHT;

// ✅ 폰트 스케일 (접근성 무시)
export const normalizeFont = (size: number) => {
  return (iWidth * size) / PixelRatio.getFontScale();
};
