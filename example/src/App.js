import React, { Component } from 'react';

import { StyleSheet, View, Alert } from 'react-native';
import { Gallery2 } from 'react-native-mosaic';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Gallery2 />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  containerStyle: {
    backgroundColor: 'transparent',
    padding: 0,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 18,
  },
  activeSegment: {
    borderRadius: 20,
    backgroundColor: 'blue',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  segmentControl: {
    borderRadius: 20,
    backgroundColor: '#f3e3ff',
  },
  selectedText: { color: 'white', fontSize: 16 },
  unselectedText: {
    color: 'red',
    fontSize: 16,
  },
});
