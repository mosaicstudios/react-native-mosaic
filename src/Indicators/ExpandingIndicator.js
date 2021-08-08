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

export default class ExpandingIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: props.scrollX,
      data: props.data,
      inActiveDotColor: props.inActiveDotColor,
      activeDotColor: props.activeDotColor,
      inActiveDotOpacity: props.inActiveDotOpacity,
      activeDotOpacity: props.activeDotOpacity,
      dotWidth: props.dotWidth,
      expandingDotWidth: props.expandingDotWidth,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  _renderIndicators() {
    let {
      activeDotColor,
      inActiveDotColor,
      inActiveDotOpacity,
      activeDotOpacity,
      expandingDotWidth,
      dotWidth,
      data,
      scrollX,
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
            outputRange: [
              inActiveDotOpacity,
              activeDotOpacity,
              inActiveDotOpacity,
            ],
            extrapolate: 'clamp',
          });
          const expand = scrollX.interpolate({
            inputRange,
            outputRange: [dotWidth, expandingDotWidth, dotWidth],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={[
                styles.dotStyle,
                this.props.dotStyle,
                { width: expand },
                { opacity },
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

ExpandingIndicator.propTypes = {
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
   * The width the active indicator dot expands to when changing to active/inactive. Default value is 20.
   */
  expandingDotWidth: PropTypes.number,

  /**
   * The width of all inactive indicator dots. Default value is 10.
   */
  dotWidth: PropTypes.number,

  /**
   * The style of the main view container.
   */
  containerStyle: ViewPropTypes.style,

  /**
   * The style of the dot indicators
   */
  dotStyle: ViewPropTypes.style,
};

ExpandingIndicator.defaultProps = {
  inActiveDotColor: 'gray',
  activeDotColor: 'gray',
  inActiveDotOpacity: 1,
  activeDotOpacity: 1,
  expandingDotWidth: 20,
  dotWidth: 10,
  data: {},
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
