import React, { Component } from 'react';
import { View, StyleSheet, ViewPropTypes, TextStyle } from 'react-native';
import Text from 'react-native-text';
import RNPickerSelect from 'react-native-picker-select';

import PropTypes from 'prop-types';

export default class InLinePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      selectedItem: props.selectedItem,
      title: props.title,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    let items = nextProps.items ? nextProps.items : this.state.items;
    return items;
  }

  _getSelectedValueLabel() {
    const { items, selectedItem } = this.state;
    if (selectedItem == null) {
      return this.props.placeholder.label;
    }

    for (var key in items) {
      let item = items[key];
      if (item.value === selectedItem) {
        return item.label;
      }
    }
    return this.props.placeholder.label;
  }

  _getSelectedValueLabelColor() {
    if (this._getSelectedValueLabel() === this.props.placeholder.label) {
      return 'gray';
    }
    return this.props.selectedTextColor || 'black';
  }

  render() {
    let selectedItemColor = this._getSelectedValueLabelColor();
    return (
      <View style={[styles.mainContainer, this.props.containerStyle]}>
        <Text style={[styles.titleTextStyle, this.props.titleTextStyle]}>
          {this.state.title + ':'}
        </Text>
        <View
          style={[styles.pickerContainerStyle, this.props.pickerContainerStyle]}
        >
          <RNPickerSelect
            items={this.state.items}
            onValueChange={(selectedItem) => {
              this.setState({ selectedItem });
              this.props.onItemSelected(selectedItem);
            }}
            style={this.props.pickerStyle}
            value={this.state.selectedItem}
            hideIcon={true}
          >
            <Text
              style={[
                styles.selectedItemStyle(selectedItemColor),
                this.props.selectedItemStyle,
              ]}
            >
              {this._getSelectedValueLabel()}
            </Text>
          </RNPickerSelect>
        </View>
      </View>
    );
  }
}

InLinePicker.propTypes = {
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
  selectedItemStyle: TextStyle,

  /**
   ** The view containing the picker label.
   */
  pickerContainerStyle: ViewPropTypes.style,

  /**
   ** Style for the title text.
   */
  titleTextStyle: TextStyle,

  /**
   ** Style for the outermost view container.
   */
  containerStyle: ViewPropTypes.style,

  /**
   ** The placeholder label for the picker. Default is { label: 'Select an item'
   */
  placeholder: PropTypes.object,
};

InLinePicker.defaultProps = {
  placeholder: { label: 'Select an item' },
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleTextStyle: { fontSize: 18 },
  pickerContainerStyle: { flexGrow: 1, alignItems: 'flex-end' },
  selectedItemStyle: (color) => ({
    fontSize: 18,
    textAlign: 'right',
    color: color,
  }),
});
