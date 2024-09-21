import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Toast, {ToastConfig} from 'react-native-toast-message';

const ToastMsg = () => {
  const config: ToastConfig = {
    selectedToast: ({text1}) => (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          width: '85%',
          height: 60,
          backgroundColor: 'rgba(0,0,0,0.6)',
          paddingVertical: 10,
          paddingLeft: 20,
          borderRadius: 20,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
          }}>
          {text1}
        </Text>
      </View>
    ),
  };

  return <Toast config={config} />;
};

export default ToastMsg;

const styles = StyleSheet.create({});
