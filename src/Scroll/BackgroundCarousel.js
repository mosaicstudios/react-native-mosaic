import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Image,
  Platform,
} from 'react-native';

import Shape from './Shape';
import SlidingIndicator from '../Indicators/SlidingIndicator';

import Color from '../Utils/Color';

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;

export default class BackgroundCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: new Animated.Value(0),
      loadingIndicatorColor: props.loadingIndicatorColor,
      data: props.data,
      backgroundColors: props.backgroundColors,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  _getBackgroundColors() {
    let { backgroundColors, data } = this.state;
    if (!backgroundColors) {
      var randomColor =
        '#' + (Math.random() * 0xffffff < 0).toString(16).padStart(6, '0');
      backgroundColors = [];
      data.map(() => {
        backgroundColors.push(randomColor);
      });
    }
    return backgroundColors;
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
    let backgroundColors = this._getBackgroundColors();
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <Shape
          backgroundColors={backgroundColors}
          scrollX={scrollX}
          type={this.props.backgroundShape}
          useAnimation={this.props.backgroundShapeAnimation}
        />
        <View style={styles.rightIconContainer}>
          <Text style={styles.classTitle}>Classes</Text>
          {this.props.renderRightIcons && (
            <View style={styles.row}>{this.props.renderRightIcons()}</View>
          )}
        </View>
        <Animated.FlatList
          ref={(mainGallery) => (this.mainGallery = mainGallery)}
          data={this.state.data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            let shadowColor = Color.shadeColor(backgroundColors[index], -20);
            return (
              <View style={[styles.itemContainer, this.props.itemContainer]}>
                <View
                  style={[
                    styles.outerImageContainer(
                      backgroundColors[index],
                      shadowColor
                    ),
                    this.props.outerImageContainer,
                  ]}
                >
                  <View
                    style={[styles.imageContainer, this.props.imageContainer]}
                  >
                    <Image
                      source={{ uri: item.photo }}
                      style={[styles.image]}
                    />
                  </View>
                  <View style={styles.titleContainer(backgroundColors[index])}>
                    <Text numberOfLines={1} style={styles.title}>
                      {index + 1}. {item.title}
                    </Text>
                    <Text numberOfLines={1} style={styles.subtitle}>
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
        <SlidingIndicator
          data={data}
          scrollX={scrollX}
          activeDotColor="black"
          inActiveDotColor="black"
          inActiveDotOpacity={0.5}
          activeDotOpacity={1}
          dotSize={12}
          indicatorSpacing={5}
          containerStyle={this.props.indicatorContainerStyle}
          dotStyle={this.props.dotStyle}
          slidingIndicatorStyle={this.props.slidingIndicatorStyle}
        />
      </View>
    );
  }
}
BackgroundCarousel.defaultProps = {
  backgroundShape: 'circle',
  backgroundShapeAnimation: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  itemContainer: {
    width: width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerImageContainer: (color, shadowColor) => ({
    shadowColor: shadowColor,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    borderRadius: 18,
    elevation: 16,
    backgroundColor: color,
  }),
  imageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    overflow: 'hidden',
    alignItems: 'center',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: 'cover',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
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
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 5,
    color: 'rgba(255,255,255, 0.7)',
    fontSize: 22,
    fontWeight: '400',
  },
  rightIconContainer: {
    marginTop: Platform.OS === 'ios' ? 54 : StatusBar.currentHeight + 10,
    marginHorizontal: 40,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: { flexDirection: 'row' },
  classTitle: { fontSize: 35, fontWeight: '700' },
  titleContainer: (color) => ({
    height: 100,
    width: ITEM_WIDTH,
    backgroundColor: color,
    padding: 20,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  }),
});
