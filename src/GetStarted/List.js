import React, { Component } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;
const { height } = Dimensions.get('screen');

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      showText: props.showText,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  scrollToOffset(event) {
    this.list.scrollToOffset({
      offset: event.offset,
      animated: event.animated,
    });
  }

  render() {
    let { data, showText } = this.state;
    return (
      <Animated.FlatList
        {...this.props}
        ref={(list) => (this.list = list)}
        data={data}
        scrollEnabled={!showText}
        scrollEventThrottle={16}
        bounces={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle(showText)}
        keyExtractor={(item) => `${item.icon}`}
        renderItem={({ item, index }) => this.props.renderItem(item, index)}
        onMomentumScrollEnd={(event) => {
          const activeIndex = Math.round(
            event.nativeEvent.contentOffset.y / ITEM_HEIGHT
          );
          this.props.onItemIndexChange(activeIndex);
        }}
      />
    );
  }
}

List.propTypes = {
  showText: PropTypes.bool,
  data: PropTypes.array,
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
  contentContainerStyle: (showText) => ({
    paddingTop: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
    paddingBottom: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
    paddingHorizontal: 20,
  }),
});
