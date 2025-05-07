import React from 'react';
import {StyleSheet, View} from 'react-native';
import Toast, {ToastConfig} from 'react-native-toast-message';
import {iWidth} from '../../globalStyle';
import IText from './IText';

const ToastMsg = () => {
  const config: ToastConfig = {
    selectedToast: ({text1}) => (
      <View style={styles.container}>
        <IText fontStyle="fR" fontSize={14} text={text1} />
      </View>
    ),
  };

  return <Toast config={config} />;
};

export default ToastMsg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    height: iWidth * 60,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: iWidth * 10,
    paddingLeft: iWidth * 20,
    borderRadius: iWidth * 20,
  },
});
