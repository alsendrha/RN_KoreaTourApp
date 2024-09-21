import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IButton from '../../IButton';

type UserDeleteProps = {
  setUserDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserDelete = ({setUserDelete}: UserDeleteProps) => {
  return (
    <View style={styles.deleteAccountContainer}>
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
  deleteAccountContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});
