import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { height } = Dimensions.get('screen');

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;

export default class GetStartedButton extends Component {
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
      <View pointerEvents="box-none" style={styles.buttonContainer}>
        <View style={styles.line(colors)} />
        <TouchableOpacity
          onPress={() => this.props.onPress()}
          style={styles.button(colors)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText(colors)}>Continue!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
