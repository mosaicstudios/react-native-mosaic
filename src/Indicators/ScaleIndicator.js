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

export default class ScaleIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: props.scrollX,
      data: props.data,
      inActiveDotColor: props.inActiveDotColor,
      activeDotColor: props.activeDotColor,
      inActiveDotOpacity: props.inActiveDotOpacity,
      activeDotScale: props.activeDotScale,
      inactiveDotScale: props.inactiveDotScale,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  _renderIndicators() {
    let {
      data,
      scrollX,
      inActiveDotColor,
      activeDotColor,
      inActiveDotOpacity,
      activeDotScale,
      inactiveDotScale,
    } = this.state;

    return (
      <View style={[styles.containerStyle, this.props.containerStyle]}>
        {data.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const colour = scrollX.interpolate({
            inputRange,
            outputRange: [inActiveDotColor, activeDotColor, inActiveDotColor],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [inActiveDotOpacity, 1, inActiveDotOpacity],
            extrapolate: 'clamp',
          });
          const scale = scrollX.interpolate({
            inputRange: inputRange,
            outputRange: [inactiveDotScale, activeDotScale, inactiveDotScale],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={[
                styles.dotStyle,
                { opacity },
                { transform: [{ scale }] },
                this.props.dotStyle,
                { backgroundColor: colour },
              ]}
            />
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
    return this._renderIndicators();
  }
}

ScaleIndicator.propTypes = {
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
   * The size a dot indicator will scale to when becoming active. Default value is 1.4.
   */
  activeDotScale: PropTypes.number,

  /**
   * The size a dot indicator will scale to when becoming inactive. Default value is 1.
   */
  inactiveDotScale: PropTypes.number,

  /**
   * The style of the main view container.
   */
  containerStyle: ViewPropTypes.style,

  /**
   * The style of the dot indicators
   */
  dotStyle: ViewPropTypes.style,
};

ScaleIndicator.defaultProps = {
  inActiveDotColor: 'gray',
  activeDotColor: 'gray',
  inActiveDotOpacity: 1,
  activeDotScale: 1.4,
  inactiveDotScale: 1,
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingBottom: 50,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});
