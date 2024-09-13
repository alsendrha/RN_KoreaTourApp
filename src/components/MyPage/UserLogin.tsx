import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {iHeight, iWidth} from '../../../globalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import IButton from '../IButton';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

const UserLogin = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <View style={styles.userLogin}>
      <IButton buttonStyle="more" onPress={() => navigation.navigate('signIn')}>
        <View style={styles.loginContainer}>
          <Text style={styles.loginTextTitle}>로그인을 해주세요</Text>
          <Icon name="arrow-forward-outline" size={18} />
        </View>
      </IButton>
      <View style={styles.signUpContainer}>
        <IButton
          buttonStyle="more"
          title="회원가입"
          titleColor="#4e8df2"
          onPress={() => navigation.navigate('signUp')}
        />
      </View>
    </View>
  );
};

export default UserLogin;

const styles = StyleSheet.create({
  userLogin: {
    paddingTop: iHeight * 30,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 4,
  },

  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  loginTextTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  signUpContainer: {
    paddingBottom: iHeight * 10,
    height: iHeight * 57,
    justifyContent: 'flex-end',
  },
});
