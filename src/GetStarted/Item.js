import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: props.icon,
      color: props.color,
      name: props.name,
      showText: props.showText,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  render() {
    let { icon, color, name, showText } = this.state;
    return (
      <View style={styles.itemContainer}>
        {showText ? (
          <Text style={[styles.itemText, { color }]}>{name}</Text>
        ) : (
          // Required to keep spacing
          <View />
        )}
        <Icon name={icon} color={color} size={ICON_SIZE} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: ITEM_HEIGHT,
  },
  itemText: {
    fontSize: 26,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
});
