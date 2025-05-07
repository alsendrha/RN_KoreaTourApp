import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

const customNavigation = () => {
  return useNavigation<NavigationProp<ParamListBase>>();
};

export default customNavigation;

const styles = StyleSheet.create({});
