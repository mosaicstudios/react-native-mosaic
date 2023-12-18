import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('screen');

import RNPickerSelect from 'react-native-picker-select';

import PropTypes from 'prop-types';

type Props = {};

export default class PickerField extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: props.placeholder,
      items: props.items,
      value: props.value,
      _hasFocus: false,
      error: null,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  isValid() {
    this.state.error = '';
    if (this.props.validate === false) {
      return true;
    }

    if (!this.state.value || this.state.value === '') {
      this.setState({ error: 'Please select something' });
      return false;
    }

    return true;
  }

  _onBlur() {
    this.setState({ _hasFocus: false });
  }

  _onFocus() {
    this.setState({ _hasFocus: true, error: null });
  }

  _getPickerStyle() {
    if (this.props.pickerStyle) {
      return this.props.pickerStyle;
    }
    return {
      inputIOS: {
        marginLeft: 15,
        color: this.state.value ? 'black' : 'gray',
        fontSize: 18,
      },
      inputAndroid: {
        color: this.state.value ? 'black' : 'gray',
        fontSize: 18,
        marginLeft: 15,
        width: width - 40,
        underline: {
          height: 0,
        },
      },
    };
  }

  _underlineColor() {
    return this.state._hasFocus ? 'black' : 'lightgray';
  }

  _renderErrorMessage() {
    if (!this.state.error || this.state.error === '') {
      return null;
    }

    return (
      <Text style={[styles.error, this.props.errorTextStyle]}>
        {this.state.error}
      </Text>
    );
  }

  render() {
    return (
      <View style={[styles.mainContainer, this.props.containerStyle]}>
        <View
          style={[styles.pickerContainerStyle, this.props.pickerContainerStyle]}
        >
          <RNPickerSelect
            placeholder={
              this.state.placeholder ? { label: this.state.placeholder } : {}
            }
            value={this.state.value}
            items={this.state.items}
            useNativeAndroidPickerStyle={false}
            onValueChange={(value) => {
              this._onFocus();
              this.setState({ value });
              this.props.onValueChange(value);
            }}
            style={
              this.props.pickerStyle
                ? this.props.pickerStyle
                : this._getPickerStyle()
            }
            hideIcon={true}
          />
        </View>

        {this._renderErrorMessage()}
      </View>
    );
  }
}

PickerField.propTypes = {
  /**
   ** This function is called when the picker item changes. Returns the value from the items array.
   */
  onValueChange: PropTypes.func.isRequired,

  /**
   ** This function can be called to validate if the picker has a selected item. Returns a boolean value.
   */
  isValid: PropTypes.func,

  /**
   ** Current selected item in the picker.
   */
  value: PropTypes.string.isRequired,

  /**
   ** An array of items to display in the picker.
   */
  items: PropTypes.array.isRequired,

  /**
   ** Style for the picker.
   */
  pickerStyle: ViewPropTypes.style,

  /**
   ** The view containing the picker label.
   */
  pickerContainerStyle: ViewPropTypes.style,

  /**
   ** Style for the error text.
   */
  errorTextStyle: Text.propTypes.style,

  /**
   ** Style for the outermost view container.
   */
  containerStyle: ViewPropTypes.style,

  /**
   ** The placeholder label for the picker. Default is { label: 'Select an item'}
   */
  placeholder: PropTypes.object,
};

PickerField.defaultProps = {
  placeholder: null,
  items: [],
  onValueChange: () => {},
};

const styles = StyleSheet.create({
  mainContainer: { width: '100%' },
  pickerContainerStyle: {
    marginTop: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 0,
  },
  error: { color: 'red', marginLeft: 0 },
  pickerStyle: {},
});
