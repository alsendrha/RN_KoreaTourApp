import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import React, {useState} from 'react';

type IInputProps = {
  value: string;
  lengthView?: boolean;
  height?: number;
  placeholder?: string;
  multiline?: boolean;
  borderRadius?: number;
  maxLength?: number;
  numberOfLines?: number;
  onChangeText?: (value: string) => void;
  onSubmitEditing?: (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  returnKeyType?:
    | 'default'
    | 'done'
    | 'go'
    | 'next'
    | 'search'
    | 'send'
    | 'emergency-call'
    | 'google'
    | 'join'
    | 'route'
    | 'previous'
    | 'yahoo';
};

const IInput = ({
  value,
  lengthView = false,
  placeholder,
  maxLength = 0,
  height,
  multiline = false,
  borderRadius,
  returnKeyType = 'default',
  numberOfLines = 1,
  onChangeText,
  onSubmitEditing,
}: IInputProps) => {
  const [textLength, setTextLength] = useState(0);
  const handleOnChangeText = (value: string) => {
    setTextLength(value.length);
    onChangeText && onChangeText(value);
  };
  return (
    <View style={styles.inputContainer}>
      {lengthView && <Text> {`${textLength}/${maxLength}`}</Text>}
      <TextInput
        style={[
          styles.textInputStyle,
          {height: height, borderRadius: borderRadius},
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={handleOnChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
        multiline={multiline}
      />
    </View>
  );
};

export default IInput;

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'flex-end',
    marginHorizontal: 15,
  },

  textInputStyle: {
    width: '100%',
    borderWidth: 0.5,
    paddingHorizontal: 18,
    textAlignVertical: 'top',
    fontSize: 18,
  },
});
