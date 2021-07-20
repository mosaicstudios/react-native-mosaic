import React, { Component } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

import PropTypes from 'prop-types';
export default class Shape extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: props.scrollX,
      useAnimation: props.useAnimation,
      rotation: props.rotation,
      color: props.color,
      type: props.type,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  render() {
    let { scrollX, useAnimation, rotation, color, type } = this.state;
    const inputRange = [0, 0.5, 1];
    const modulo = Animated.modulo(
      Animated.divide(
        Animated.modulo(scrollX, width),
        new Animated.Value(width)
      ),
      1
    );
    const rotate = modulo.interpolate({
      inputRange,
      outputRange: [rotation, '0deg', rotation],
    });
    const translateX = modulo.interpolate({
      inputRange,
      outputRange: [0, -height, 0],
    });
    return (
      <Animated.View
        style={[
          styles.base(type),
          {
            width: height,
            height: height,
            backgroundColor: color,
            top: -height * (type === 'square' ? 0.6 : 0.5),
            left: -height * 0.3,
            transform: useAnimation
              ? [
                  {
                    rotate,
                  },
                  {
                    translateX,
                  },
                ]
              : [{ rotate: rotation }],
          },
        ]}
      />
    );
  }
}

Shape.propTypes = {
  scrollX: PropTypes.object.isRequired,
};

Shape.defaultProps = {
  type: 'square',
  color: 'white',
  rotation: '40deg',
};
const styles = StyleSheet.create({
  base: (type) => ({
    position: 'absolute',
    borderRadius: type === 'square' ? 86 : height / 2,
  }),
});
