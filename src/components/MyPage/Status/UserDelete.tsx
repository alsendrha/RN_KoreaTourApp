import React from 'react';
import {StyleSheet, View} from 'react-native';
import {iWidth} from '../../../../globalStyle';
import IButton from '../../IButton';

type UserDeleteProps = {
  setUserDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserDelete = ({setUserDelete}: UserDeleteProps) => {
  return (
    <View style={styles.container}>
      <IButton
        buttonStyle="more"
        title="회원탈퇴"
        onPress={() => {
          setUserDelete(true);
        }}
      />
    </View>
  );
};

export default UserDelete;

const styles = StyleSheet.create({
  container: {
    padding: iWidth * 16,
  },
});
