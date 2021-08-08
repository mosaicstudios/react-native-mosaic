import React, { Component } from 'react';

import { StyleSheet, View, Alert } from 'react-native';
import { Onboarding } from 'react-native-mosaic';

const bgs = ['#A5BBFF', '#A0E5A5', '#C56551', '#FF947E'];

const DATA = [
  {
    id: 1,
    title: 'Multi-lateral intermediate moratorium',
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit vestibulum felis!',
    image: 'https://image.flaticon.com/icons/png/512/1864/1864475.png',
  },
  {
    id: 2,
    title: 'Automated radical data-warehouse',
    subtitle:
      'Phasellus quis turpis diam. Suspendisse potenti. Vivamus eu sem risus!',
    image: 'https://image.flaticon.com/icons/png/512/3069/3069172.png',
  },
  {
    id: 3,
    title: 'Inverse attitude-oriented system engine',
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit vestibulum felis!',
    image: 'https://image.flaticon.com/icons/png/512/616/616412.png',
  },
  {
    id: 4,
    title: 'Monitored global data-warehouse',
    subtitle: 'Phasellus quis turpis diam. Suspendisse potenti!',
    image: 'https://image.flaticon.com/icons/png/512/1864/1864589.png',
  },
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Onboarding
        data={DATA}
        showPrevButton
        showNextButton
        showDoneButton
        backgroundShape="circle"
        backgroundShapeAnimation
        backgroundColors={bgs}
        onDonePressed={() =>
          Alert.alert('Onboarding Complete', 'Congratulations!')
        }
      />
    );
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
