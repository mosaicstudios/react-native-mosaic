import React, { Component } from 'react';
import { StyleSheet, ViewPropTypes } from 'react-native';

import PropTypes from 'prop-types';

import { SearchBar } from 'react-native-elements';

const TYPING_TIMEOUT = 800;
export default class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      throttle: props.throttle,
      searchTerm: props.searchTerm,
    };
    this.typingTimeout = 0;
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  _onBlur() {
    this.setState({ _hasFocus: false });
  }

  _onFocus() {
    this.setState({ _hasFocus: true, error: null });
  }

  _borderColor() {
    return this.state._hasFocus ? this.props.focusColor : 'lightgray';
  }

  _onChangeText(searchTerm) {
    let { throttle } = this.state;
    if (!throttle) {
      this.props.onChangeText(searchTerm);
      clearTimeout(this.typingTimeout);
      return;
    }

    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }

    this.typingTimeout = setTimeout(() => {
      this.props.onChangeText(searchTerm);
    }, this.props.timeout);
  }

  _getSearchIconProps() {
    if (this.props.isSearching) {
      return {
        type: 'evilicon',
        name: 'spinner',
      };
    }
    return { name: 'search' };
  }

  render() {
    let borderColor = this._borderColor();
    return (
      <SearchBar
        lightTheme
        containerStyle={[styles.containerStyle, this.props.containerStyle]}
        inputContainerStyle={[
          styles.inputContainerStyle(borderColor),
          this.props.inputContainerStyle,
        ]}
        leftIconContainerStyle={this.props.leftIconContainerStyle}
        inputStyle={[styles.inputStyle, this.props.inputStyle]}
        searchIcon={this.props.searchIcon}
        placeholder={this.props.placeholder}
        onChangeText={(searchTerm) => {
          this.setState({ searchTerm });
          this._onChangeText(searchTerm);
        }}
        value={this.state.searchTerm}
        onBlur={() => this._onBlur()}
        onFocus={() => this._onFocus()}
        returnKeyType="search"
      />
    );
  }
}

SearchField.propTypes = {
  /**
   * The string to be searched.
   */
  searchTerm: PropTypes.string.isRequired,

  /**
   * If this prop is set to true the input while wait a period of time after the user has stopped typing. If false the onChangeText will trigger immediately.
   */
  throttle: PropTypes.bool,

  /**
   * Base style for container.
   */
  containerStyle: ViewPropTypes.style,

  /**
   * Base style for the input container.
   */
  inputContainerStyle: ViewPropTypes.style,

  /**
   * Style for the left icon view.
   */
  leftIconContainerStyle: ViewPropTypes.style,

  /**
   *  Style for the input view.
   */
  inputStyle: ViewPropTypes.style,

  /**
   *  This props allows to override the Icon props or use a custom component.
   */
  searchIcon: PropTypes.string,

  /**
   *  Set the placeholder text.
   */
  placeholder: PropTypes.string,

  /**
   *  Set the border color when the input is focused.
   */
  focusColor: PropTypes.string,
};

SearchField.defaultProps = {
  onChangeText: () => {},
  throttle: true,
  timeout: TYPING_TIMEOUT,
  isSearching: false,
  focusColor: 'black',
  searchIcon: false,
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  inputContainerStyle: (color) => ({
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: color,
  }),
  inputStyle: {
    backgroundColor: 'transparent',
    margin: 0,
    paddingTop: 4,
    marginLeft: 0,
    borderRadius: 0,
  },
});
