import React, { Component } from 'react';
import {
  FlatList,
  Image,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

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

const { width, height } = Dimensions.get('screen');
const HALF_SCREEN_WIDTH = width / 2;
const SPACING = 10;

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
      activeIndex: 0,
      selectorPositionStyle: props.selectorPositionStyle,
      selectorImageSize: props.selectorImageSize,
      verticalPosition: props.verticalPosition,
      loadingIndicatorColor: props.loadingIndicatorColor,
      activeImageBorderColor: props.activeImageBorderColor,
      inactiveImageBorderColor: props.inactiveImageBorderColor,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  _getSelectorPosition() {
    let { selectorPositionStyle, verticalPosition } = this.state;
    if (typeof selectorPositionStyle === 'object') {
      return selectorPositionStyle;
    }
    if (selectorPositionStyle === 'top') {
      return styles.top(verticalPosition);
    } else {
      return styles.bottom(verticalPosition);
    }
  }

  _scrollSelectedToCenter(index) {
    let { selectorImageSize } = this.state;
    let activeImage = index * (selectorImageSize + SPACING);
    let imageCenter = selectorImageSize / 2;
    this.thumbGallery?.scrollToOffset({
      offset: activeImage - HALF_SCREEN_WIDTH + imageCenter,
      animated: true,
    });
  }

  _scrollToStart() {
    this.thumbGallery?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  }

  _scrollToActiveIndex(index) {
    let { selectorImageSize } = this.state;
    this.setState({ activeIndex: index });
    this.mainGallery?.scrollToOffset({ offset: index * width, animated: true });
    let activeImage = index * (selectorImageSize + SPACING);
    let imageCenter = selectorImageSize / 2;
    if (activeImage - imageCenter > HALF_SCREEN_WIDTH) {
      this._scrollSelectedToCenter(index);
    } else {
      this._scrollToStart();
    }
  }

  _renderMainGallery() {
    let { images } = this.state;
    return (
      <FlatList
        ref={(mainGallery) => (this.mainGallery = mainGallery)}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ ...this.props.mainContainerStyle }}
        keyExtractor={(item) => item.toString()}
        onMomentumScrollEnd={(event) => {
          let index = Math.floor(event.nativeEvent.contentOffset.x / width);
          this._scrollToActiveIndex(index);
        }}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item }}
                style={[
                  StyleSheet.absoluteFillObject,
                  { ...this.props.mainImageStyle },
                ]}
              />
              {this.props.renderMainImageOverlay(item, index)}
            </View>
          );
        }}
      />
    );
  }

  _renderGallerySlider() {
    let {
      images,
      activeImageBorderColor,
      inactiveImageBorderColor,
      selectorImageSize,
      activeIndex,
    } = this.state;
    return (
      <FlatList
        ref={(thumbGallery) => (this.thumbGallery = thumbGallery)}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={[
          { paddingHorizontal: SPACING },
          { ...this.props.selectorContainerStyle },
        ]}
        style={this._getSelectorPosition()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => this._scrollToActiveIndex(index)}>
              <Image
                source={{ uri: item }}
                style={[
                  styles.selectorImageStyle(selectorImageSize),
                  {
                    borderColor:
                      activeIndex === index
                        ? activeImageBorderColor
                        : inactiveImageBorderColor,
                  },
                  { ...this.props.selectorImageStyle },
                ]}
              />
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  render() {
    let { images } = this.state;
    if (!images) {
      return (
        <ActivityIndicator
          size="large"
          animated={true}
          color={this.state.loadingIndicatorColor}
        />
      );
    }
    return (
      <View style={{ ...this.props.containerStyle }}>
        {this._renderMainGallery()}
        {this._renderGallerySlider()}
      </View>
    );
  }
}

Gallery.defaultProps = {
  images: images,
  renderMainImageOverlay: () => {},
  selectorImageSize: 80,
  verticalPosition: 50,
  activeImageBorderColor: 'white',
  inactiveImageBorderColor: 'transparent',
};

const styles = StyleSheet.create({
  top: (verticalPosition) => ({
    position: 'absolute',
    top: verticalPosition,
  }),
  bottom: (verticalPosition) => ({
    position: 'absolute',
    bottom: verticalPosition,
  }),
  selectorImageStyle: (selectorImageSize) => ({
    width: selectorImageSize,
    height: selectorImageSize,
    borderRadius: 5,
    marginRight: SPACING,
    borderWidth: 2,
  }),
});
