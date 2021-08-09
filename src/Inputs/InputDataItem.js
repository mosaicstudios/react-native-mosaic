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
   * Current selected item of array.
   */
  containerStyle: ViewPropTypes.style,
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
