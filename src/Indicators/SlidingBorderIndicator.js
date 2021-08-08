import React, { Component } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Dimensions,
  ViewPropTypes,
} from 'react-native';
const { width } = Dimensions.get('screen');
import PropTypes from 'prop-types';

export default class SlidingBorderIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: props.scrollX,
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
      data,
      spacing,
      inActiveDotColor,
      activeDotColor,
      slidingIndicatorColor,
      inActiveDotOpacity,
      activeDotOpacity,
      dotSize,
    } = this.state;
    const inputRange = [-width, 0, width];
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-dotSize + spacing, 0, dotSize + spacing],
    });

    return (
      <View style={[{ height: dotSize }, styles.mainContainer]}>
        <Animated.View
          style={[
            {
              width: dotSize + spacing,
              height: dotSize + spacing,
              borderRadius: (dotSize + spacing) / 2,
              borderColor: slidingIndicatorColor,
            },
            styles.slidingIndicatorStyle,
            {
              transform: [{ translateX }],
            },
            this.props.slidingIndicatorStyle,
          ]}
        />
        {data.map((_, index) => {
          const itemInputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const colour = scrollX.interpolate({
            inputRange: itemInputRange,
            outputRange: [inActiveDotColor, activeDotColor, inActiveDotColor],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange: itemInputRange,
            outputRange: [
              inActiveDotOpacity,
              activeDotOpacity,
              inActiveDotOpacity,
            ],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={index}
              style={[
                {
                  width: dotSize + spacing,
                },
                styles.dotContainerStyle,
                this.props.dotContainerStyle,
              ]}
            >
              <Animated.View
                style={[
                  {
                    width: dotSize / 2,
                    height: dotSize / 2,
                    borderRadius: dotSize / 4,
                    backgroundColor: colour,
                    opacity,
                  },
                  this.props.dotStyle,
                ]}
              />
            </Animated.View>
          );
        })}
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

SlidingBorderIndicator.propTypes = {
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

SlidingBorderIndicator.defaultProps = {
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
