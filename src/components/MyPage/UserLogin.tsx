import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, iWidth} from '../../../globalStyle';
import customNavigation from '../../hooks/customNavigation';
import IButton from '../IButton';
import IText from '../IText';

const UserLogin = () => {
  const navigation = customNavigation();

  return (
    <View style={styles.container}>
      <IButton buttonStyle="more" onPress={() => navigation.navigate('signIn')}>
        <View style={styles.loginContainer}>
          <IText fontStyle="fB" fontSize={20} text={'로그인을 해주세요'} />
          <Icon name="arrow-forward-outline" size={iWidth * 18} />
        </View>
      </IButton>
      <IButton
        buttonStyle="more"
        title="회원가입"
        titleColor="#4e8df2"
        onPress={() => navigation.navigate('signUp')}
      />
    </View>
  );
};

export default UserLogin;

const styles = StyleSheet.create({
  container: {
    paddingVertical: iWidth * 20,
    alignItems: 'center',
    backgroundColor: colors.white,
    elevation: 2,
    gap: iWidth * 12,
  },

  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: iWidth * 4,
  },
});
