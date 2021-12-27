import React, { Component } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Dimensions,
  ViewPropTypes,
} from 'react-native';
import { Line, Svg } from 'react-native-svg';
const { width } = Dimensions.get('screen');
import PropTypes from 'prop-types';

const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default class SlidingExpandingDotIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: props.scrollX,
      scrollOffset: new Animated.Value(0),
      data: props.data,
      spacing: props.spacing,
      dotSize: props.dotSize,
      inActiveDotColor: props.inActiveDotColor,
      activeDotColor: props.activeDotColor,
      inActiveDotOpacity: props.inActiveDotOpacity,
      activeDotOpacity: props.activeDotOpacity,
      slidingIndicatorColor: props.slidingIndicatorColor,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  _renderIndicators() {
    let {
      scrollX,
      scrollOffset,
      data,
      spacing,
      inActiveDotColor,
      activeDotColor,
      slidingIndicatorColor,
      inActiveDotOpacity,
      activeDotOpacity,
      dotSize,
    } = this.state;
    const inputRange = [0, width, width * 2];
    const translateBack = new Animated.Value(0);
    Animated.timing(translateBack, {
      toValue: scrollOffset.interpolate({
        inputRange: [0, width],
        outputRange: [
          this.props.dotSize / 2,
          this.props.dotSize + spacing + (spacing + this.props.dotSize / 2),
        ],
      }),
      duration: 100,
      useNativeDriver: false,
    }).start();
    const translateFront = scrollX.interpolate({
      inputRange,
      outputRange: [
        this.props.dotSize / 2,
        this.props.dotSize + spacing * 2 + this.props.dotSize / 2,
        (this.props.dotSize + spacing * 2) * 2 + this.props.dotSize / 2,
      ],
    });

    return (
      <View style={[{ height: dotSize }, styles.mainContainer]}>
        {data.map((_item, index) => {
          return (
            <View
              key={index}
              style={{
                opacity: this.props.inActiveDotOpacity,
                width: this.props.dotSize,
                height: this.props.dotSize,
                borderRadius: this.props.dotSize / 2,
                marginHorizontal: spacing,
                backgroundColor: inActiveDotColor,
              }}
            />
          );
        })}
        <AnimatedSvg style={styles.svg}>
          <AnimatedLine
            x1={translateFront}
            y1={this.props.dotSize / 2}
            x2={translateBack}
            y2={this.props.dotSize / 2}
            stroke={activeDotColor}
            strokeWidth={this.props.strokeWidth}
            strokeLinecap="round"
            translateX={spacing}
          />
        </AnimatedSvg>
      </View>
    );
  }

  render() {
    let { data } = this.state;
    if (!data) {
      return null;
    }
    return (
      <View style={[styles.containerStyle, this.props.containerStyle]}>
        {this._renderIndicators()}
      </View>
    );
  }
}

SlidingExpandingDotIndicator.propTypes = {
  /**
   * The horizontal position of the scrollView/FlatList currently being animated.
   */
  scrollX: PropTypes.object.isRequired,

  /**
   * Used to render the number of dot indicators and to animate the scrolling.
   */
  data: PropTypes.array.isRequired,

  /**
   * The color of the inactive indicator dots.
   */
  inActiveDotColor: PropTypes.string,

  /**
   * The color of the active indicator dot.
   */
  activeDotColor: PropTypes.string,

  /**
   * The opacity of the inactive indicator dots. Default value is 1.
   */
  inActiveDotOpacity: PropTypes.number,

  /**
   * The opacity of the active indicator dots. Default value is 1.
   */
  activeDotOpacity: PropTypes.number,

  /**
   * The size of the dot indicators.
   */
  dotSize: PropTypes.number,

  /**
   * The spacing between the dot indicators.
   */
  spacing: PropTypes.number,

  /**
   * The style of the main view container.
   */
  containerStyle: ViewPropTypes.style,

  /**
   * The style of the dot indicators
   */
  dotStyle: ViewPropTypes.style,

  /**
   * The style of the dot indicators
   */
  slidingIndicatorStyle: ViewPropTypes.style,

  /**
   * The style of the sliding dot indicator
   */
  slidingIndicatorColor: PropTypes.string,
};

SlidingExpandingDotIndicator.defaultProps = {
  dotSize: 30,
  spacing: 0,
  activeDotColor: 'gray',
  inActiveDotColor: 'gray',
  slidingIndicatorColor: 'gray',
  inActiveDotOpacity: 1,
  activeDotOpacity: 1,
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  containerStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingBottom: 50,
  },
  dotContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slidingIndicatorStyle: {
    position: 'absolute',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
