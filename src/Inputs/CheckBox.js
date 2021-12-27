import React, { Component } from 'react';
import CheckBox from '@react-native-community/checkbox';

export default class TextField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <CheckBox {...this.props} />;
  }
}
