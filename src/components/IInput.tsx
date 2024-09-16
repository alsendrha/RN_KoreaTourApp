import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../globalStyle';

type IInputProps = {
  value: string;
  lengthView?: boolean;
  height?: number;
  placeholder?: string;
  errorMsg?: boolean;
  titleEnable?: boolean;
  fontSize?: number;
  secureTextEntry?: boolean;
  titleText?: string;
  errorText?: string;
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
  titleEnable = false,
  titleText,
  fontSize = 18,
  errorMsg = false,
  secureTextEntry = false,
  errorText,
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
      <View
        style={[
          styles.textContainer,
          {
            justifyContent: !titleEnable ? 'flex-end' : 'space-between',
          },
        ]}>
        {titleEnable && (
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{titleText}</Text>
          </View>
        )}

        {lengthView && <Text> {`${textLength}/${maxLength}`}</Text>}
      </View>
      <TextInput
        style={[
          styles.textInputStyle,
          {height: height, borderRadius: borderRadius, fontSize: fontSize},
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={handleOnChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
        multiline={multiline}
      />
      {errorMsg && (
        <View style={styles.errorTextContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}
    </View>
  );
};

export default IInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 15,
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titleContainer: {
    marginBottom: 2,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  textInputStyle: {
    width: '100%',
    borderWidth: 0.5,
    paddingHorizontal: 18,
    textAlignVertical: 'top',
    fontSize: 18,
  },
  errorTextContainer: {
    marginVertical: 1,
    width: '100%',
    justifyContent: 'flex-start',
  },
  errorText: {
    color: colors.error,
  },
});
