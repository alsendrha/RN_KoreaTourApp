import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors, iHeight} from '../../globalStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import IButton from './IButton';

type IInputProps = {
  value: string;
  deleteValue?: () => void;
  deleteIcon?: boolean;
  editable?: boolean;
  lengthView?: boolean;
  height?: number;
  textColor?: string;
  placeholder?: string;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search';
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
  maxLength = 20,
  height,
  deleteValue,
  textColor,
  editable = true,
  deleteIcon = true,
  multiline = false,
  titleEnable = false,
  titleText,
  keyboardType = 'default',
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

  const handleDeleteValue = () => {
    if (deleteValue) {
      deleteValue();
    }
    setTextLength(0);
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
      <View style={styles.inputAndIconContainer}>
        <TextInput
          style={[
            styles.textInputStyle,
            {
              height: height,
              borderRadius: borderRadius,
              fontSize: fontSize,
              color: !editable ? 'black' : textColor,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.gray}
          value={value}
          editable={editable}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onChangeText={handleOnChangeText}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
          numberOfLines={numberOfLines}
          multiline={multiline}
        />
        {value && (
          <View style={styles.iconContainer}>
            <IButton buttonStyle="delete" onPress={handleDeleteValue}>
              {deleteIcon && (
                <Icon name="close-circle-outline" size={20} color="gray" />
              )}
            </IButton>
          </View>
        )}
      </View>
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

  inputAndIconContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -10.5}],
    right: 8,
  },

  textInputStyle: {
    width: '100%',
    borderWidth: 0.5,
    paddingLeft: 18,
    paddingRight: 30,
    textAlignVertical: 'top',
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
