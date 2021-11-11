import React, { Component } from 'react';
import { View, Platform, ViewPropTypes, Text } from 'react-native';

import { Picker } from '@react-native-community/picker';

import { WheelPicker } from 'react-native-wheel-picker-android';

import PropTypes from 'prop-types';

export default class ModalInlinePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _render(picker, selectedValue, index, selectedValues) {
    if (Platform.OS === 'ios') {
      return this._renderIOS(picker, selectedValue, index, selectedValues);
    } else {
      return this._renderAndroid(picker, selectedValue, index, selectedValues);
    }
  }

  _renderIOS(picker, selectedValue, index, selectedValues) {
    return (
      <Picker
        testID="iosPicker"
        selectedValue={selectedValue}
        style={styles.pickerStyle(this.props.height)}
        onValueChange={(itemValue, itemIndex) => {
          selectedValues = selectedValues || [];
          selectedValues[index] = itemValue;
          this.props.onValuesChange(selectedValues);
        }}
        itemStyle={this.props.itemStyle}
      >
        {picker.items.map((item) => {
          return <Picker.Item label={item.label} value={item.value} />;
        })}
      </Picker>
    );
  }

  _renderAndroid(picker, selectedValue, index, selectedValues) {
    let labels = picker.items.map((item) => item.label);
    let selectedItemIndex = picker.items.findIndex(
      (item) => item.value === selectedValue
    );

    let wheelPickerWidth = this.state.containerWidth
      ? this.state.containerWidth / this.props.data.length
      : null;
    let wheelPickerStyle = {
      height: 150,
      marginTop: 30,
    };
    if (wheelPickerWidth) {
      wheelPickerStyle.width = wheelPickerWidth;
    }

    let textSize = this.props.itemStyle ? this.props.itemStyle.fontSize : 22;
    return (
      <View style={styles.androidContainer}>
        <WheelPicker
          key={selectedValue}
          initPosition={selectedItemIndex}
          data={labels}
          indicatorColor={this.props.androidIndicatorColor}
          selectedItemTextSize={textSize}
          selectedItemTextColor={this.props.androidSelectedTextColor}
          itemTextSize={textSize}
          onItemSelected={(itemIndex) => {
            selectedValues = selectedValues || [];
            let selectedItem = picker.items[itemIndex];
            selectedValues[index] = selectedItem ? selectedItem.value : null;
            this.props.onValuesChange(selectedValues);
          }}
          style={wheelPickerStyle}
        />
      </View>
    );
  }
  _renderPickers() {
    let { data, selectedValues } = this.props;

    return data.map((picker, index) => {
      let selectedValue = null;
      if (selectedValues) {
        selectedValue = selectedValues[index];
      }
      return (
        <View style={[styles.column, this.props.columnStyle]}>
          {picker.label && (
            <Text style={[styles.pickerLabel, this.props.labelStyle]}>
              {picker.label}
            </Text>
          )}
          {this._render(picker, selectedValue, index, selectedValues)}
        </View>
      );
    });
  }

  render() {
    return (
      <View
        style={styles.container}
        onLayout={(event) => {
          var { width } = event.nativeEvent.layout;
          this.setState({ containerWidth: width });
        }}
      >
        {this._renderPickers()}
      </View>
    );
  }
}

ModalInlinePicker.defaultProps = {
  placeholder: null,
  items: [],
  mode: 'primary',
  onValuesChange: () => {},
  height: 180,
  labelStyle: {
    fontSize: 20,
  },
  androidIndicatorColor: '#555555',
  androidSelectedTextColor: '#222222',
};

ModalInlinePicker.propTypes = {
  /**
   ** This function is called when the picker item changes. Returns the value from the items array.
   */
  onItemSelected: PropTypes.func.isRequired,

  /**
   ** An array of items to display in the picker.
   */
  items: PropTypes.array.isRequired,

  /**
   ** The text displayed inline with the picker. Will show as undefined if not set.
   */
  title: PropTypes.string,

  /**
   ** Style for the picker.
   */
  pickerStyle: ViewPropTypes.style,

  /**
   ** Style for the text label of the selected item.
   */
  selectedItemStyle: Text.propTypes.style,

  /**
   ** The view containing the picker label.
   */
  pickerContainerStyle: ViewPropTypes.style,

  /**
   ** Style for the title text.
   */
  titleTextStyle: Text.propTypes.style,

  /**
   ** Style for the outermost view container.
   */
  containerStyle: ViewPropTypes.style,

  /**
   ** The placeholder label for the picker. Default is { label: 'Select an item'
   */
  placeholder: PropTypes.object,
};

const styles = {
  container: {
    flexDirection: 'row',
  },
  pickerStyle: (height) => ({
    height: height,
    width: '100%',
  }),
  column: {
    flexDirection: 'column',
    flex: 1,
  },
  pickerLabel: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
  androidContainer: {
    alignItems: 'center',
    flex: 1,
  },
};
