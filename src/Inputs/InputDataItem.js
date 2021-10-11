import React, { Component } from 'react';
import { View, StyleSheet, Text, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

export default class InputDataItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.label,
      value: props.value,
      highlight: props.highlight,
      color: props.highlight || 'black',
    };
  }
  render() {
    return (
      <View style={[styles.containerStyle, this.props.containerStyle]}>
        <Text style={[styles.textStyle, this.props.textStyle]}>
          {this.state.label}
        </Text>
        {/* FIXME: layout is messed up for Android and iOS pickers */}
        <View
          style={[styles.inputContainerStyle, this.props.inputContainerStyle]}
        >
          {this.props.inputView()}
        </View>
      </View>
    );
  }
}

InputDataItem.propTypes = {
  /**
   * Main container style
   */
  containerStyle: ViewPropTypes.style,
  /**
   * Text style for the label text.
   */
  textStyle: Text.propTypes.style,
  /**
   * Container style for the input view
   */
  inputContainerStyle: ViewPropTypes.style,
  /**
   * Label for the input view
   */
  label: PropTypes.string,
  /**
   * Render function to render the inline input item
   */
  inputView: PropTypes.func,
};

InputDataItem.defaultProps = {
  highlight: false,
  textStyle: {},
  containerStyle: {},
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
  textStyle: { fontSize: 18 },
  inputContainerStyle: { flexGrow: 1, alignItems: 'flex-end' },
});
