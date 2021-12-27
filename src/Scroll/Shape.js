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
      backgroundColors: props.backgroundColors,
      type: props.type,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  render() {
    let { scrollX, useAnimation, rotation, backgroundColors, type } =
      this.state;
    if (!backgroundColors) {
      return null;
    }
    const backgroundColor = scrollX.interpolate({
      inputRange: backgroundColors.map((_, index) => index * width),
      outputRange: backgroundColors.map((color) => color),
    });
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
      outputRange: ['0deg', rotation, '0deg'],
    });
    const translateX = modulo.interpolate({
      inputRange,
      outputRange: [-height, 0, -height],
    });
    console.log('height ', height);
    console.log('height + height / 4.5', height + height / 4.5);
    return (
      <Animated.View
        style={[
          styles.base(type),
          {
            width: height / 3,
            height: height / 3,
            backgroundColor,
            top: -40,
            left: height * 1.24,
            transform: useAnimation
              ? [
                  {
                    rotate,
                  },
                  {
                    translateX,
                  },
                ]
              : [{ rotate: '0deg' }, { translateX: -height }],
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
