import React, { Component } from 'react';
import { Animated, Text, View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;
const HEIGHT = 40;
export default class TitleTicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      scrollX: props.scrollX,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  render() {
    let { data, scrollX } = this.props;
    const inputRange = [-width, 0, width];
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [HEIGHT, 0, -HEIGHT],
    });
    return (
      <View style={[styles.titleContainer, this.props.titleContainer]}>
        <Animated.View style={{ transform: [{ translateY }] }}>
          {data.map(({ title }, index) => {
            return (
              <Text key={index.toString()} style={styles.text}>
                {title}
              </Text>
            );
          })}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    position: 'absolute',
    top: ITEM_HEIGHT * 0.3,
    left: 35,
    right: 35,
    overflow: 'hidden',
    height: HEIGHT,
  },
  text: {
    fontSize: HEIGHT,
    lineHeight: HEIGHT,
    fontWeight: '800',
  },
});
