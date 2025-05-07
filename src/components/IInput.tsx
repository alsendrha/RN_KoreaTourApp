import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, iWidth, normalizeFont} from '../../globalStyle';
import IButton from './IButton';
import IText from './IText';

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
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
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
  textAlignVertical = 'center',
  titleText,
  keyboardType = 'default',
  fontSize = 16,
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
    <View style={styles.container}>
      <View
        style={[
          styles.textContainer,
          {
            justifyContent: !titleEnable ? 'flex-end' : 'space-between',
          },
        ]}>
        {titleEnable && <IText fontStyle="fB" fontSize={16} text={titleText} />}

        {lengthView && (
          <IText
            fontStyle="fR"
            fontSize={14}
            text={`${textLength}/${maxLength}`}
          />
        )}
      </View>
      <View style={styles.inputAndIconContainer}>
        <TextInput
          style={[
            styles.textInputStyle,
            {
              height: height,
              borderRadius: borderRadius,
              fontSize: normalizeFont(fontSize),
              color: !editable ? colors.black : textColor,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.gray}
          value={value}
          textAlignVertical={textAlignVertical}
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
                <Icon
                  name="close-circle-outline"
                  size={iWidth * 20}
                  color="gray"
                />
              )}
            </IButton>
          </View>
        )}
      </View>
      {errorMsg && (
        <View style={styles.errorTextContainer}>
          <IText
            fontStyle="fR"
            fontSize={14}
            textColor={colors.error}
            text={errorText}
          />
        </View>
      )}
    </View>
  );
};

export default IInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: iWidth * 16,
    gap: iWidth * 4,
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inputAndIconContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: iWidth * -10.5}],
    right: iWidth * 8,
  },

  textInputStyle: {
    width: '100%',
    borderWidth: 0.5,
    paddingLeft: iWidth * 18,
    paddingRight: iWidth * 30,
    fontFamily: 'Pretendard-Regular',
  },
  errorTextContainer: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  errorText: {
    color: colors.error,
  },
});
