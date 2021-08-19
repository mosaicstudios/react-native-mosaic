import React, { Component } from 'react';
import { StyleSheet, ViewPropTypes } from 'react-native';

import PropTypes from 'prop-types';

import Button from 'apsl-react-native-button';

type Props = {};

const FONT_SIZE = 18;
export const styles = StyleSheet.create({
  base: {
    borderRadius: 20,
    width: '100%',
  },
  solid: {
    borderWidth: 0,
    backgroundColor: 'black',
  },
  solidText: {
    color: 'white',
    fontSize: FONT_SIZE,
  },
  clear: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  clearText: {
    color: 'black',
    fontSize: FONT_SIZE,
  },
  outline: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'transparent',
  },
  outlineText: {
    color: 'black',
    fontSize: FONT_SIZE,
  },
});

export default class CustomButton extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      type: props.type,
      style: props.style,
      textStyle: props.textStyle,
      isLoading: props.isLoading,
      isDisabled: props.isDisabled,
      activityIndicatorColor: props.activityIndicatorColor,
    };
  }
  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }
  _getTextStyle() {
    switch (this.state.type) {
      case 'solid':
        return styles.solidText;
      case 'clear':
        return styles.clearText;
      case 'outline':
        return styles.outlineText;
      default:
    }
  }
  render() {
    return (
      <Button
        {...this.props}
        style={[styles.base, styles[this.props.type], this.state.style]}
        textStyle={[this._getTextStyle(), this.state.textStyle]}
        onPress={this.props.onPress}
        isLoading={this.state.isLoading}
        isDisabled={this.state.isDisabled}
      >
        {this.state.title}
      </Button>
    );
  }
}

CustomButton.propTypes = {
  /**
   * Set the buttons title.
   */
  title: PropTypes.string.isRequired,

  /**
   * Color of the activity indicator. Default value is 'gray'.
   */
  activityIndicatorColor: PropTypes.string,

  /**
   * To display the loading indicator. Default value is 'false'.
   */
  isLoading: PropTypes.bool,

  /**
   * To prevent user interaction. Opacity is reduce to show the disabled effect. Default value is 'false'.
   */
  isDisabled: PropTypes.bool,

  /**
   * To set the size of the activity indicator. Default value is 'large'.
   */
  type: PropTypes.oneOf(['solid', 'clear', 'outline']),

  /**
   * Base style for button container.
   */
  style: ViewPropTypes.style,

  /**
   * Text style for the title text.
   */
  textStyle: ViewPropTypes.style,
};

CustomButton.defaultProps = {
  type: 'solid',
  style: {},
  textStyle: {},
  isLoading: false,
  isDisabled: false,
  activityIndicatorColor: 'gray',
};
