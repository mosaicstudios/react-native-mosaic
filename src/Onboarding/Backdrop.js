import React, { Component } from 'react';
import { Animated, View, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('screen');

import PropTypes from 'prop-types';
export default class Backdrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: props.scrollX,
      backgroundColors: props.backgroundColors,
      singleBackgroundColor: props.singleBackgroundColor,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  _renderStaticBackground() {
    let { singleBackgroundColor } = this.state;
    return (
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: singleBackgroundColor,
          },
        ]}
      />
    );
  }

  render() {
    let { backgroundColors, scrollX, singleBackgroundColor } = this.state;
    if (singleBackgroundColor) {
      return this._renderStaticBackground();
    }
    if (!backgroundColors) {
      return null;
    }
    const backgroundColor = scrollX.interpolate({
      inputRange: backgroundColors.map((_, index) => index * width),
      outputRange: backgroundColors.map((color) => color),
    });
    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor,
          },
        ]}
      />
    );
  }
}

Backdrop.propTypes = {
  scrollX: PropTypes.object.isRequired,
};
