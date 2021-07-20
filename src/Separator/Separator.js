import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {};
export default class Hr extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color,
      width: props.width,
    };
  }
  render() {
    return <View style={[styles.hr(this.state.color), this.props.style]} />;
  }
}

Hr.defaultProps = {
  width: '100%',
  color: '#d6d6d6',
};

const styles = StyleSheet.create({
  hr: (color) => ({
    height: 1,
    backgroundColor: color,
    width: this.state.width,
  }),
});
