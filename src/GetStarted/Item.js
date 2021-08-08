import React, { Component } from 'react';
import { Text, View, StyleSheet, ViewPropTypes, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';

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
      iconSize: props.iconSize,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  render() {
    let { icon, color, name, showText, iconSize } = this.state;
    return (
      <View style={[styles.itemContainer, this.props.itemContainer]}>
        {showText ? (
          <Text style={[styles.itemText, { color }, this.props.itemText]}>
            {name}
          </Text>
        ) : (
          // Required to keep spacing
          <View />
        )}
        <Icon name={icon} color={color} size={iconSize} />
      </View>
    );
  }
}

Item.propTypes = {
  /**
   * Base container style.
   */
  itemContainer: ViewPropTypes.style,

  /**
   * Text style.
   */
  itemText: ViewPropTypes.style,

  /**
   * Color of the icon.
   */
  color: PropTypes.string,

  /**
   * Title of the item.
   */
  name: PropTypes.string,

  /**
   * Icon name to be rendered.
   */
  icon: PropTypes.string,

  /**
   * Boolean value to show text or not.
   */
  showText: PropTypes.bool,
};

Item.defaultProps = {
  iconSize: ICON_SIZE,
};

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
