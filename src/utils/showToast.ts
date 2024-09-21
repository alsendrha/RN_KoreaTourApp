import Toast from 'react-native-toast-message';

type ToastProps = {
  text: string;
  milliseconds: number;
  fontSize: number;
};

export const showToast = ({text, milliseconds, fontSize}: ToastProps) => {
  Toast.show({
    type: 'selectedToast',
    text1: text,
    visibilityTime: milliseconds,
    position: 'bottom',
    text1Style: {fontSize: fontSize},
  });
};
