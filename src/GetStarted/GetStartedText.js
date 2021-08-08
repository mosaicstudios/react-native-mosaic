import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ViewPropTypes,
} from 'react-native';

import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('screen');

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;

export default class GetStartedText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: props.colors,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  render() {
    let { colors } = this.props;
    return (
      <View style={[styles.textContainer, this.props.textContainer]}>
        <Text style={styles.text(colors)}>Get Started with...</Text>
      </View>
    );
  }
}

GetStartedText.propTypes = {
  textContainer: ViewPropTypes.style,
  colors: PropTypes.object,
};

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    top: height / 2 - ITEM_HEIGHT * 2.5,
    width: width * 0.7,
    paddingHorizontal: 14,
  },
  text: (colors) => ({
    color: colors.light,
    fontSize: 52,
    fontWeight: '700',
    lineHeight: 52,
  }),
});
