import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {iHeight} from '../../../globalStyle';
import IButton from '../IButton';

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
    color: 'black',
  },

  signUpContainer: {
    paddingBottom: iHeight * 10,
    height: iHeight * 57,
    justifyContent: 'flex-end',
  },
});
