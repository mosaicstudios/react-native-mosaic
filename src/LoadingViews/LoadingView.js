import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

export default class LoadingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: props.isLoading,
      size: props.size,
      indicatorColor: props.indicatorColor,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    if (!this.state.isLoading) {
      return null;
    }

    return (
      <View style={[styles.main, this.props.style]}>
        <ActivityIndicator
          {...this.props}
          color={this.state.indicatorColor}
          size={this.state.size}
        />
      </View>
    );
  }
}

LoadingView.defaultProps = {
  indicatorColor: 'white',
  isLoading: false,
  size: 'large',
};

LoadingView.propTypes = {
  /**
   * Color of the activity indicator. Default value is 'white'.
   */
  indicatorColor: PropTypes.string,

  /**
   * To display the loading view. Default value is 'false'.
   */
  isLoading: PropTypes.bool.isRequired,

  /**
   * To set the size of the activity indicator. Default value is 'large'.
   */
  size: PropTypes.string,
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
