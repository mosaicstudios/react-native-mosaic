import React, { Component } from 'react';

import { StyleSheet, Alert, View, Text, ScrollView } from 'react-native';
import { LocationSearch } from 'react-native-mosaic';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          <Text style={{ marginBottom: 20, fontSize: 25, textAlign: 'center' }}>
            Enter Your Address{' '}
          </Text>
          <LocationSearch
            ref={(locationField) => (this.locationField = locationField)}
            gmapsKey="AIzaSyCKLLo-qnKup_TD0emmNnjgkcf17yoePL8"
            manualAddress={false}
            onPlaceSelected={(data) => {
              this.setState({ data });
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    margin: 20,
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
