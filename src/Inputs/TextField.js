import React, { Component } from 'react';
import { View, Text, ViewPropTypes, StyleSheet } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import PhoneInput from 'react-native-phone-number-input';
import TextFormat from '../Utils/TextFormat';

import PropTypes from 'prop-types';
export default class TextField extends Component {
  constructor(props) {
    super(props);
    let autoCapitalize = props.autoCapitalize;
    if (props.type === 'email' || props.type === 'password') {
      autoCapitalize = 'none';
    }
    this.state = {
      placeholder: props.placeholder,
      type: props.type,
      containerStyle: props.containerStyle,
      viewContainerStyle: props.viewContainerStyle,
      textStyle: props.textStyle,
      maxLength: props.maxLength,
      multiline: props.multiline,
      autoCapitalize: autoCapitalize,
      value: props.value ? props.value.toString() : null,
      _hasFocus: false,
      error: null,
      secureTextEntry: props.type === 'password',
      isDisabled: props.isDisabled,
      strictPassword: props.strictPassword,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    let value = nextProps.value ? nextProps.value.toString() : nextProps.value;
    return { ...nextProps, value };
  }
  
  clear() {
    if (this.input) {
      this.input.clear();
    }
    if (this.phone) {
      this.phone.clear();
    }
    this.setState({value: null});
  }

  focus() {
    if (this.input) {
      this.input.focus();
      return;
    }
    if (this.phone) {
      this.input.focus();
      return;
    }
  }

  blur() {
    if (this.input) {
      this.input.blur();
      return;
    }
    if (this.phone) {
      this.phone.blur();
      return;
    }
  }
  
  _isShowHideButtonEnabled() {
    return this.state.type === 'password';
  }

  isValid() {
    this.state.error = '';
    if (this.props.validate === false) {
      return true;
    }

    if (this.state.type === 'phone') {
      return this._isValidPhoneNumber();
    }

    if (!this.state.value || this.state.value === '') {
      if (this.props.label) {
        let message =
          TextFormat.capitalizeFirst(this.props.label) + ' is required.';
        this.setState({ error: message });
      } else {
        this.setState({ error: 'Please enter something' });
      }
      return false;
    }
    if (this.state.type === 'email') {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(this.state.value) === false) {
        this.setState({ error: 'Please enter a valid email address' });
        return false;
      }
    } else if (this.state.type === 'password') {
      if (
        !this.state.strictPassword &&
        (this.state.value == null || this.state.value.length < 6)
      ) {
        this.setState({ error: 'Password must have 6 or more characters' });
        return false;
      }
      if (this.state.strictPassword) {
        if (this.state.value == null || this.state.value.length < 8) {
          this.setState({ error: 'Password must have 8 or more characters' });
          return false;
        }
        var reg = /[0-9]+/;
        if (!reg.test(this.state.value)) {
          this.setState({ error: 'Password must contain at least one number' });
          return false;
        }

        reg = /[A-Z]+/;
        if (!reg.test(this.state.value)) {
          this.setState({
            error: 'Password must contain at least one uppercase character',
          });
          return false;
        }

        reg = /[a-z]+/;
        if (!reg.test(this.state.value)) {
          this.setState({
            error: 'Password must contain at least one lowercase character',
          });
          return false;
        }

        reg = /[^a-zA-Z0-9]+/;
        if (!reg.test(this.state.value)) {
          this.setState({
            error: 'Password must contain at least one special character',
          });
          return false;
        }
      }
    }
    return true;
  }

  _isValidPhoneNumber() {
    let isValid = true;
    if (this.phone.getCallingCode() == null) {
      this.setState({ error: 'Please select a valid country code' });
      isValid = false;
    } else if (!this.phone.isValidNumber(this.state.value)) {
      this.setState({ error: 'Please enter a valid phone number' });
      isValid = false;
    }
    return isValid;
  }

  _getKeyboardType() {
    switch (this.state.type) {
      case 'text':
        return 'default';
      case 'email':
        return 'email-address';
      case 'phone':
        return 'phone-pad';
      case 'number':
        return 'numeric';
      default:
        return 'default';
    }
  }

  _isSecureTextEntry() {
    return this.state.type === 'password';
  }

  _onBlur() {
    this.setState({ _hasFocus: false });
  }

  _onFocus() {
    this.setState({ _hasFocus: true, error: null });
  }

  _underlineColor() {
    return this.state._hasFocus ? this.props.underlineColor : 'lightgray';
  }

  _handleOnChangePhoneNumber() {
    if (this.phone.getCountryCode() == null) {
      this.props.onChangePhoneNumber('', '');
      return;
    }

    let countryCode = this.phone.getCallingCode()
      ? '+' + this.phone.getCallingCode()
      : '';
    let phoneNumber = this.phone.getNumberAfterPossiblyEliminatingZero();
    this.props.onChangePhoneNumber(countryCode, phoneNumber.number);
  }

  _renderPhoneErrorMessage() {
    if (this.state.type === 'phone' && this.state.error) {
      return (
        <View>
          <Text style={[styles.phoneErrorStyle, this.props.phoneErrorStyle]}>
            {this.state.error}
          </Text>
        </View>
      );
    }
  }

  _renderInput() {
    let underlineColor = this._underlineColor();
    let isSecure = this._isSecureTextEntry();
    if (this.state.type === 'phone') {
      return this._renderPhoneInput();
    }
    return (
      <>
        {this.props.label && (
          <Text style={[styles.labelStyle, this.props.labelStyle]}>
            {this.props.label}
          </Text>
        )}
        <Input
          ref={input => (this.input = input)}
          placeholder={this.state.placeholder}
          placeholderTextColor={this.props.placeholderTextColor}
          value={this.state.value}
          onEndEditing={() => {
            // if (Platform.OS != 'ios') {
            //   return;
            // }
            // let { value } = this.state;
            // if (this.state.type === 'number') {
            //   let stringValue = value.toString().replaceAll(',', '.');
            //   this.setState({ stringValue });
            //   this.props.onChangeText(stringValue);
            // }
          }}
          onChangeText={(value) => {
            this.setState({ value });
            this.props.onChangeText(value);
          }}
          containerStyle={[styles.containerStyle, this.props.containerStyle]}
          inputContainerStyle={[
            this.props.inputType === 'border'
              ? {
                  ...styles.borderedInputContainerStyle(underlineColor),
                }
              : {
                  ...styles.inputContainerStyle(underlineColor),
                },
            this.props.inputContainerStyle,
          ]}
          inputStyle={[
            this.props.inputType === 'border'
              ? {
                  ...styles.borderInputStyle(isSecure, this.props.label),
                }
              : {
                  ...styles.inputStyle(isSecure, this.props.label),
                },

            this.props.inputStyle,
          ]}
          onBlur={() => this._onBlur()}
          onFocus={() => this._onFocus()}
          keyboardType={this._getKeyboardType()}
          returnKeyLabel="Done"
          returnKeyType="done"
          secureTextEntry={this.state.secureTextEntry}
          maxLength={this.state.maxLength}
          multiline={this.state.multiline}
          autoCapitalize={this.state.type === 'text' ? 'sentences' : 'none'}
          editable={!this.state.isDisabled}
          errorMessage={this.state.error}
          leftIcon={this.props.leftIcon}
          rightIcon={this._renderRightIcon()}
          errorStyle={[styles.errorStyle, this.props.errorStyle]}
          renderErrorMessage={this.state.error}
        />
      </>
    );
  }
  
  _renderRightIcon() {
    let {secureTextEntry} = this.state;
    let {rightIcon, rightIconStyle} = this.props;
    if (rightIcon) {
      return <Image source={rightIcon} style={rightIconStyle} />;
    }
    if (this._isShowHideButtonEnabled()) {
      return (
        <Icon
          name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'}
          size={this.props.iconSize}
          color={this.props.passwordIconColor}
          type="material-community"
          style={{marginRight: 5}}
          onPress={() => this.setState({secureTextEntry: !secureTextEntry})}
        />
      );
    }

    return null;
  }

  _renderPhoneInput() {
    let underlineColor = this._underlineColor();
    return (
      <>
        {this.props.label && (
          <Text style={[styles.labelStyle, this.props.labelStyle]}>
            {this.props.label}
          </Text>
        )}
        <PhoneInput
          {...this.props}
          ref={(phone) => (this.phone = phone)}
          value={this.state.value}
          defaultCode="IE"
          layout="first"
          onChangeCountry={() => {
            this._handleOnChangePhoneNumber();
          }}
          onChangeText={(value) => {
            this.setState({ value }, () => {
              this._handleOnChangePhoneNumber();
            });
          }}
          onChangeFormattedText={(value) => {
            this.setState({ value }, () => {
              this._handleOnChangePhoneNumber();
            });
          }}
          containerStyle={[
            this.props.inputType === 'border'
              ? {
                  ...styles.borderedPhoneInputStyle(
                    underlineColor,
                    this.props.label
                  ),
                }
              : {
                  ...styles.phoneInputStyle(underlineColor, this.props.label),
                },
            this.props.inputContainerStyle,
          ]}
          textInputProps={{
            onBlur: () => this._onBlur(),
            onFocus: () => this._onFocus(),
            placeholder: this.state.placeholder,
            placeholderTextColor: this.props.placeholderTextColor,
          }}
          codeTextStyle={this.props.codeTextStyle}
          textInputStyle={this.props.textInputStyle}
          textContainerStyle={[
            this.props.inputType === 'border'
              ? {
                  ...styles.borderedPhoneTextStyle(
                    underlineColor,
                    this.props.label
                  ),
                }
              : {
                  ...styles.phoneTextStyle(underlineColor, this.props.label),
                },
            this.props.phoneTextContainerStyle,
          ]}
        />
      </>
    );
  }

  render() {
    return (
      <View style={[styles.viewContainerStyle, this.state.viewContainerStyle]}>
        {this._renderInput()}
        {this._renderPhoneErrorMessage()}
      </View>
    );
  }
}

TextField.propTypes = {
  /**
   * A callback function which will pass back the value entered.
   */
  onChangeText: PropTypes.func.isRequired,

  /**
   * A callback function which will pass back the country code and the phone number entered.
   */
  onChangePhoneNumber: PropTypes.func,

  /**
   ** This function can be called to validate if the picker has a selected item. Returns a boolean value.
   */
  isValid: PropTypes.func,

  /**
   * To set a placeholder. Blank by default.
   */
  placeholder: PropTypes.string,

  /**
   * The value to display in the input.
   */
  value: PropTypes.string,

  /**
   * Placeholder text color.
   */
  placeholderTextColor: PropTypes.string,

  /**
   * Will display a text label. If not set a label will not show.
   */
  label: PropTypes.string,

  /**
   * The type of input to display. Default is set to 'text'.
   */
  type: PropTypes.oneOf(['text', 'email', 'password', 'phone', 'number']),

  /**
   * Base style for container.
   */
  viewContainerStyle: ViewPropTypes.style,

  /**
   * Styling for Input Component Container.
   */
  inputContainerStyle: ViewPropTypes.style,

  /**
   * Style that will be passed to the style props of the React Native TextInput.
   */
  inputStyle: ViewPropTypes.style,

  /**
   * Style for the error message when isValid function is triggered.
   */
  errorStyle: ViewPropTypes.style,

  /**
   * Style for the phone error message when isValid function is triggered.
   */
  phoneErrorStyle: ViewPropTypes.style,

  /**
   * Style that will be passed to the style props of the React Native TextInput.
   */
  phoneInputStyle: ViewPropTypes.style,

  /**
   * Disables the input component.
   */
  isDisabled: PropTypes.bool,

  /**
   * The maximum number of characters that can be entered.
   */
  maxLength: PropTypes.number,

  /**
   * If true, the text input can be multiple lines. The default value is false.
   */
  multiline: PropTypes.bool,

  /**
   * Enforce strict password validation requiring an uppercase character, lowercase character, special character and one number.
   */
  strictPassword: PropTypes.bool,
};

TextField.defaultProps = {
  inputType: 'underline',
  color: 'lightgray',
  placeholderTextColor: 'gray',
  underlineColor: 'black',
  placeholder: '',
  type: 'text',
  containerStyle: {},
  viewContainerStyle: {},
  textStyle: {},
  onChangeText: () => {},
  maxLength: 999999,
  multiline: false,
  isRequired: true,
  autoCapitalize: 'sentences',
  strictPassword: false,
  iconSize: 24,
  passwordIconColor: '#000'
};

const styles = StyleSheet.create({
  viewContainerStyle: { width: '100%' },
  phoneInputStyle: (color, label) => ({
    borderBottomWidth: 1,
    width: '100%',
    marginTop: label ? 10 : 20,
    marginHorizontal: 0,
    borderColor: color,
  }),
  borderedPhoneInputStyle: (color, label) => ({
    width: '100%',
    borderWidth: 1,
    borderBottomWidth: 1,
    marginTop: label ? 10 : 10,
    paddingLeft: 5,
    backgroundColor: 'transparent',
    borderColor: color,
  }),
  borderedPhoneTextStyle: (color, label) => ({
    color: 'black',
    paddingLeft: 5,
    borderLeftWidth: 1,
    padding: 0,
    backgroundColor: 'transparent',
    borderColor: color,
  }),
  phoneTextStyle: (color, label) => ({
    fontSize: 17,
    borderLeftWidth: 1,
    paddingLeft: 5,
    borderColor: color,
    backgroundColor: 'transparent',
    color: 'black',
  }),
  containerStyle: {
    width: '100%',
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  inputContainerStyle: (color) => ({
    width: '100%',
    borderBottomColor: color,
  }),
  borderedInputContainerStyle: (color) => ({
    width: '100%',
    marginTop: 10,
    borderWidth: 1,
    height: 55,
    borderColor: color,
  }),
  labelStyle: {
    color: 'black',
    fontSize: 15,
    marginTop: 20,
  },
  textStyle: { fontSize: 17, color: 'black' },
  inputStyle: (isSecure, label) => ({
    width: '100%',
    paddingHorizontal: 0,
    height: 55,
    marginTop: label ? 0 : 20,
  }),
  borderInputStyle: (isSecure, label) => ({
    width: '100%',
    marginLeft: 15,
    paddingHorizontal: 0,
  }),
  errorStyle: { marginLeft: 0, fontSize: 14 },
  phoneErrorStyle: { color: 'red', paddingLeft: 10, marginTop: 5 },
});
