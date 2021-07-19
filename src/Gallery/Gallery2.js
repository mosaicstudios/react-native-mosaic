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

const images = [
  'https://images.unsplash.com/photo-1551316679-9c6ae9dec224?w=800&q=80',
  'https://images.unsplash.com/photo-1562569633-622303bafef5?w=800&q=80',
  'https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80',
  'https://images.unsplash.com/photo-1555096462-c1c5eb4e4d64?w=800&q=80',
  'https://images.unsplash.com/photo-1517957754642-2870518e16f8?w=800&q=80',
  'https://images.unsplash.com/photo-1546484959-f9a381d1330d?w=800&q=80',
  'https://images.unsplash.com/photo-1548761208-b7896a6ff225?w=800&q=80',
  'https://images.unsplash.com/photo-1511208687438-2c5a5abb810c?w=800&q=80',
  'https://images.unsplash.com/photo-1548614606-52b4451f994b?w=800&q=80',
  'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&q=80',
];

export default class Gallery2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: new Animated.Value(0),
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  componentDidMount() {
    this._setData();
  }

  _setData() {
    let data = images.map((image, index) => ({
      id: index.toString(),
      photo: image,
      title: 'Test ' + index,
      avatar_url: `https://randomuser.me/api/portraits/women/${Math.floor(
        Math.random() * 40
      )}.jpg`,
    }));
    this.setState({ data });
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
      <View style={styles.container}>
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
              <View style={styles.itemContainer}>
                <View style={styles.outerImageContainer}>
                  <View style={styles.imageContainer}>
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
                  <Image
                    source={{ uri: item.avatar_url }}
                    style={styles.avatar}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

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
    width: ITEM_WIDTH * 1.4,
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
