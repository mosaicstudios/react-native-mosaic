import React, { Component } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';

import GetStartedButton from './GetStartedButton';
import GetStartedText from './GetStartedText';
import Item from './Item';
import List from './List';

import Socials from '../Utils/Socials';

const { width, height } = Dimensions.get('screen');

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;
const CENTER = height / 2 - ITEM_HEIGHT / 2;

export default class GetStarted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      activeItem: this.props.activeItem,
      colors: this.props.colors,
      scrollY: new Animated.Value(0),
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  handleScroll(event) {
    if (this.darkRef) {
      this.darkRef.scrollToOffset({
        offset: event.nativeEvent.contentOffset.y,
        animated: false,
      });
    }
  }

  render() {
    let { data, scrollY, activeItem, colors } = this.state;
    const onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      {
        useNativeDriver: true,
        listener: (event) => this.handleScroll(event),
      }
    );
    return (
      <View style={styles.container(colors)}>
        <GetStartedText colors={colors} />
        <List
          onScroll={onScroll}
          scrollEventThrottle={16}
          ref={(lightRef) => (this.lightRef = lightRef)}
          data={data}
          showText={false}
          renderItem={(item, index) => {
            return (
              <Item icon={item.icon} name={item.name} color={colors.light} />
            );
          }}
          onItemIndexChange={(activeIndex) =>
            this.setState({ activeItem: data[activeIndex] })
          }
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.darkList(colors)} pointerEvents="none">
          <List
            ref={(darkRef) => (this.darkRef = darkRef)}
            data={data}
            showText={true}
            renderItem={(item, index) => {
              return (
                <Item
                  icon={item.icon}
                  name={item.name}
                  color={colors.dark}
                  showText
                />
              );
            }}
          />
        </View>
        <GetStartedButton
          colors={colors}
          onPress={() => Alert.alert('Connect with:', activeItem.name)}
        />
      </View>
    );
  }
}

GetStarted.defaultProps = {
  colors: {
    light: '#ffc873',
    dark: '#2D2D2D',
  },
  activeItem: Socials.ALL[0],
  data: Socials.ALL,
};

const styles = StyleSheet.create({
  container: (colors) => ({
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.dark,
  }),
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  darkList: (colors) => ({
    position: 'absolute',
    backgroundColor: colors.light,
    width,
    height: ITEM_HEIGHT,
    top: CENTER,
  }),
});
