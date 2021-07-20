import React, { Component } from 'react';
import { Text, Image, View, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('screen');

export default class IntroScrollerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      item: props.item,
      data: props.data,
      showPrevButton: props.showPrevButton,
      showNextButton: props.showNextButton,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  render() {
    let { item } = this.state;
    if (!item) {
      return null;
    }
    return (
      <View style={[styles.mainContainer, this.props.mainContainer]}>
        <View
          style={[styles.imageContainerStyle, this.props.imageContainerStyle]}
        >
          <Image
            source={{ uri: item.image }}
            style={[styles.imageStyle, this.props.imageStyle]}
          />
        </View>
        <View style={[styles.textContainer, this.props.textContainer]}>
          <Text style={[styles.title, this.props.titleTextStyle]}>
            {item.title}
          </Text>
          <Text style={[styles.subtitle, this.props.subtitleTextStyle]}>
            {item.subtitle}
          </Text>
        </View>
      </View>
    );
  }
}

IntroScrollerItem.defaultProps = {
  showPrevButton: false,
  showNextButton: false,
};

const styles = StyleSheet.create({
  mainContainer: { width, alignItems: 'center', padding: 20 },
  imageStyle: {
    width: width / 2,
    height: width / 2,
    resizeMode: 'contain',
  },
  imageContainerStyle: { flex: 0.7, justifyContent: 'center' },
  textContainer: { flex: 0.3 },
  title: {
    color: 'white',
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
  },
  subtitle: { color: 'white', fontWeight: '300', fontSize: 15 },
});
