import React, { Component } from 'react';
import { Animated, StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      countInterval: null,
      counter: new Animated.Value(0),
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  currentProgress() {
    let { count } = this.state;
    return count;
  }

  decreaseProgress(newValue) {
    let { count, counter } = this.state;
    let value = count - newValue;
    if (count <= 0) {
      this.setState({ count: 0 });
      return;
    }
    this.setState({ count: value });
    Animated.timing(counter, {
      toValue: value,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  increaseProgress(newValue) {
    let { count, counter } = this.state;
    if (count >= 100) {
      this.setState({ count: 100 });
      return;
    }
    let value = count + newValue;
    this.setState({ count: value });
    Animated.timing(counter, {
      toValue: value,
      duration: this.props.duration,
      useNativeDriver: false,
    }).start();
  }

  render() {
    let { counter } = this.state;
    const width = counter.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    });
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={[styles.progressBar, this.props.progressBarStyle]}>
          <Animated.View
            style={
              ([StyleSheet.absoluteFill],
              { backgroundColor: this.props.progressBarColor, width })
            }
          />
        </View>
      </View>
    );
  }
}

ProgressBar.defaultProps = {
  progressBarColor: 'black',
  duration: 500,
};

ProgressBar.propTypes = {
  progressBarColor: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  progressBarStyle: ViewPropTypes.style,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
  },
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
  },
});

export default ProgressBar;
