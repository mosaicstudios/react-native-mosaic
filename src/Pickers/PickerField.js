import React, { Component } from 'react';
import { View, TouchableOpacity, ViewPropTypes, Text } from 'react-native';
import Modal from 'react-native-modal';

import { Icon } from 'react-native-elements';

import ModalInlinePicker from './ModalInlinePicker';

import PropTypes from 'prop-types';

export default class PickerField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: props.isVisible,
      placeholder: props.placeholder,
      items: props.items,
      value: props.selectedItemValue,
      doneTitle: props.doneTitle,
      _hasFocus: false,
      error: null,
    };
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

  _hide() {
    this.setState({ isVisible: false });
  }

  _onPressLabel() {
    let { selectedValues, data } = this.props;
    let fireOnValuesChange = false;
    if (this.props.setInitialValueOnShowIfNull) {
      data.forEach((entry, index) => {
        if (selectedValues == null) {
          selectedValues = [];
        }
        if (selectedValues[index] == null) {
          selectedValues[index] = data[index].items[0].value;
          fireOnValuesChange = true;
        }
      });
    }

    this.setState(
      {
        isVisible: true,
        selectedValues,
      },
      () => {
        if (fireOnValuesChange) {
          this.props.onValuesChange(selectedValues);
        }
      }
    );
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <TouchableOpacity onPress={() => this._onPressLabel()}>
          {this.props.label && (
            <Text style={styles.labelText}>{this.props.label}</Text>
          )}
          <View style={[styles.pickerStyle, { ...this.props.pickerStyle }]}>
            <Text style={this.props.valueStyle} numberOfLines={1}>
              {this.props.value}
            </Text>
            {this.props.showArrow && (
              <Icon
                name={'chevron-down'}
                size={this.props.iconSize || 20}
                containerStyle={styles.iconContainerStyle}
                color={this.props.iconColor || '#A0A4A8'}
                type="entypo"
              />
            )}
          </View>
        </TouchableOpacity>

        <Modal
          isVisible={this.state.isVisible}
          onBackdropPress={() => this._hide()}
          onBackButtonPress={() => this._hide()}
          useNativeDriver={true}
          style={styles.modalStyle}
        >
          <View style={[styles.pickerContainer, this.props.pickerContainer]}>
            <Text
              style={[styles.doneButton, this.props.doneButtonStyle]}
              onPress={() => this._hide()}
            >
              {this.props.doneTitle || 'Done'}
            </Text>
            <ModalInlinePicker
              data={this.props.data}
              labelStyle={styles.labelStyle}
              itemStyle={this.props.textStyle}
              selectedValues={this.props.selectedValues}
              onValuesChange={(values) => this.props.onValuesChange(values)}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
  pickerContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'white',
    paddingBottom: 30,
  },
  pickerStyle: {
    borderWidth: 1,
    paddingHorizontal: 20,
    padding: 10,
    borderColor: 'lightgray',
    borderRadius: 0,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    marginTop: 20,
    width: '100%',
  },
  doneButton: {
    textAlign: 'right',
    color: '#3786FB',
    fontSize: 16,
    padding: 15,
  },
  labelStyle: {
    fontSize: 18,
  },
  labelText: {
    marginBottom: 10,
    color: 'black',
    fontSize: 15,
  },
  iconContainerStyle: { justifyContent: 'center' },
  modalStyle: { margin: 0 },
};

PickerField.propTypes = {
  /**
   ** This function is called when the picker item changes. Returns the value from the items array.
   */
  onValuesChange: PropTypes.func.isRequired,

  /**
   ** This function can be called to validate if the picker has a selected item. Returns a boolean value.
   */
  isValid: PropTypes.func,

  /**
   ** Current selected item in the picker. Also used to show the placeholder value.
   */
  value: PropTypes.string.isRequired,

  /**
   ** An array of items to display in the picker.
   */
  data: PropTypes.array.isRequired,

  /**
   ** Style for the picker.
   */
  pickerStyle: ViewPropTypes.style,

  /**
   ** Style for the error text.
   */
  errorTextStyle: Text.propTypes.style,

  /**
   ** Style for the outermost view container.
   */
  containerStyle: ViewPropTypes.style,

  /**
   ** String to show to close button for the picker.
   */
  doneTitle: PropTypes.string,

  /**
   ** Boolean value to show a chevron arrow on the right of the picker
   */
  showArrow: PropTypes.bool,
};

PickerField.defaultProps = {
  textStyle: {
    color: 'black',
    fontSize: 18,
  },
  items: [],
  showArrow: false,
  setInitialValueOnShowIfNull: false,
};
