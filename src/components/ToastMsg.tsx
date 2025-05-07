import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast, {ToastConfig} from 'react-native-toast-message';
import {colors, iWidth, normalizeFont} from '../../globalStyle';

const ToastMsg = () => {
  const config: ToastConfig = {
    selectedToast: ({text1}) => (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          width: '85%',
          height: iWidth * 60,
          backgroundColor: 'rgba(0,0,0,0.6)',
          paddingVertical: iWidth * 10,
          paddingLeft: iWidth * 20,
          borderRadius: iWidth * 20,
        }}>
        <Text
          style={{
            color: colors.white,
            fontSize: normalizeFont(14),
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
