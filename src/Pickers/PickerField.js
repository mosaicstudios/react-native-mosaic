import React, { Component } from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

import PropTypes from 'prop-types';

type Props = {};

export default class PickerField extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: props.placeholder,
      items: props.items,
      value: props.selectedItemValue,
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

    if (this.state.value === null || this.state.value === '') {
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

  _underlineColor() {
    return this.state._hasFocus ? 'black' : 'lightgray';
  }

  _renderErrorMessage() {
    if (this.state.error === null || this.state.error === '') {
      return null;
    }

    return (
      <Text labelStyle={[styles.error, this.props.errorTextStyle]}>
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
            onValueChange={(value) => {
              this._onFocus();
              this.setState({ value });
              this.props.onValueChange(value);
            }}
            style={
              this.props.pickerStyle ? this.props.pickerStyle : pickerStyle
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

const pickerStyle = {
  inputIOS: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
  inputAndroid: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    marginLeft: 0,
    marginRight: -50,
    underline: {
      height: 0,
    },
  },
};

const styles = StyleSheet.create({
  mainContainer: { width: '100%' },
  pickerContainerStyle: {
    marginTop: 20,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  error: { color: 'red', marginLeft: 0 },
});
