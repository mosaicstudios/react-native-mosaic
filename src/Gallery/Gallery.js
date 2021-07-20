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

import Backend from '../../utils/Backend';

const { width, height } = Dimensions.get('screen');
const HALF_SCREEN_WIDTH = width / 2;
const SPACING = 10;

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  componentDidMount() {
    this._getImagesFromPexels();
  }

  _getImagesFromPexels() {
    Backend.getImagesFromPexels()
      .then((response) => {
        this.setState({ images: response.photos });
      })
      .catch((error) => {
        console.log('err', error);
      });
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
        keyExtractor={(item) => item.id.toString()}
        onMomentumScrollEnd={(event) => {
          let index = Math.floor(event.nativeEvent.contentOffset.x / width);
          this._scrollToActiveIndex(index);
        }}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item.src.portrait }}
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
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          { paddingHorizontal: SPACING },
          { ...this.props.selectorContainerStyle },
        ]}
        style={this._getSelectorPosition()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => this._scrollToActiveIndex(index)}>
              <Image
                source={{ uri: item.src.portrait }}
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
