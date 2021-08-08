import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ViewPropTypes,
  TextStyle,
} from 'react-native';

import PropTypes from 'prop-types';

const { height } = Dimensions.get('screen');

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;

export default class GetStartedButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: props.colors,
      title: props.title,
      activeOpacity: props.activeOpacity,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  render() {
    let { colors, activeOpacity, title } = this.state;
    return (
      <View
        pointerEvents="box-none"
        style={[styles.buttonContainer, this.props.containerStyle]}
      >
        <View style={styles.line(colors)} />
        <TouchableOpacity
          onPress={() => this.props.onPress()}
          style={styles.button(colors)}
          activeOpacity={activeOpacity}
        >
          <Text style={styles.buttonText(colors)}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

GetStartedButton.propTypes = {
  onPress: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  title: PropTypes.string,
  activeOpacity: PropTypes.number,
  colors: PropTypes.object,
};

GetStartedButton.defaultProps = {
  activeOpacity: 0.8,
  title: 'Continue!',
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    top: height / 2 + ITEM_HEIGHT / 2,
    paddingHorizontal: 14,
  },
  line: (colors) => ({
    height: ITEM_HEIGHT * 2,
    width: 4,
    marginLeft: 10,
    backgroundColor: colors.light,
  }),
  button: (colors) => ({
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  buttonText: (colors) => ({
    fontSize: 32,
    fontWeight: '800',
    color: colors.dark,
  }),
});
