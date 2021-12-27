import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import TitleTicker from '../Text/TitleTicker';

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;
export default class Gallery2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: new Animated.Value(0),
      loadingIndicatorColor: props.loadingIndicatorColor,
      data: props.data,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  render() {
    let { data, scrollX } = this.state;
    if (!data) {
      return (
        <ActivityIndicator
          size="large"
          animated={true}
          color={this.state.loadingIndicatorColor}
        />
      );
    }
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <TitleTicker data={data} scrollX={scrollX} />
        <Animated.FlatList
          ref={(mainGallery) => (this.mainGallery = mainGallery)}
          data={this.state.data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            const previous = (index - 1) * width;
            const current = index * width;
            const next = (index + 1) * width;
            const inputRange = [previous, current, next];
            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [-width * 0.7, 0, width * 0.7],
            });
            return (
              <View style={[styles.itemContainer, this.props.itemContainer]}>
                <View
                  style={[
                    styles.outerImageContainer,
                    this.props.outerImageContainer,
                  ]}
                >
                  <View
                    style={[styles.imageContainer, this.props.imageContainer]}
                  >
                    <Animated.Image
                      source={{ uri: item.photo }}
                      style={[
                        styles.image,
                        {
                          transform: [
                            {
                              translateX,
                            },
                          ],
                        },
                      ]}
                    />
                  </View>
                  {this.props.showAvatar && (
                    <Image
                      source={{ uri: item.avatar_url }}
                      style={[styles.avatar, this.props.avatarStyle]}
                    />
                  )}
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}
Gallery2.defaultProps = {
  showAvatar: true,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerImageContainer: {
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
    borderRadius: 18,
    elevation: 16,
    padding: 12,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 14,
  },
  image: {
    width: ITEM_WIDTH * 1.2,
    height: ITEM_HEIGHT,
    resizeMode: 'cover',
    borderRadius: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 5,
    position: 'absolute',
    bottom: -25,
    right: 60,
  },
});
