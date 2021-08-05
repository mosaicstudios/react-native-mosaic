import React, { Component } from 'react';
import { View, Text, StyleSheet, ViewPropTypes, TextStyle } from 'react-native';

import PropTypes from 'prop-types';

import Button from '../Buttons/Button';

export default class NoResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderButton() {
    if (this.props.onPress) {
      return (
        <Button
          {...this.props}
          title={this.props.title}
          style={[styles.buttonStyle, this.props.buttonStyle]}
          onPress={() => this.props.onPress()}
        />
      );
    }
  }

  _renderText() {
    if (!this.props.onPress) {
      return (
        <Text style={[styles.textStyle, this.props.textStyle]}>
          {this.props.title}
        </Text>
      );
    }
  }

  render() {
    return (
      <View style={[styles.containerStyle, this.props.containerStyle]}>
        {this._renderButton()}
        {this._renderText()}
      </View>
    );
  }
}

NoResults.propTypes = {
  /**
   * Set the buttons title or text title.
   */
  title: PropTypes.string.isRequired,

  /**
   * This is called when clicking button. Adding this will show the button.
   */
  onPress: PropTypes.func,

  /**
   * Base style for container.
   */
  containerStyle: ViewPropTypes.style,

  /**
   * Style for text title.
   */
  textStyle: TextStyle,

  /**
   *  Style for button.
   */
  buttonStyle: ViewPropTypes.style,
};

NoResults.defaultProps = {
  title: 'No results found.',
};

const styles = StyleSheet.create({
  containerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#909090',
  },
  buttonStyle: { marginTop: 0, marginBottom: 0, marginHorizontal: 20 },
});
