import {Alert} from 'react-native';

type HandleDeleteProps = {
  onPress: () => void;
};

export const handleDelete = ({onPress}: HandleDeleteProps) => {
  Alert.alert('리뷰를 삭제하시겠습니까?', '', [
    {
      text: '취소',
      onPress: () => {},
    },
    {
      text: '확인',
      onPress: onPress,
    },
  ]);
};
