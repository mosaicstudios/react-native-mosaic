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
    if (this.props.inputType === 'border') {
      return this.props.borderColor ? this.props.borderColor : 'lightgray';
    }
    return this.state._hasFocus ? this.props.borderColor : 'lightgray';
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
        {...this.props}
        lightTheme
        containerStyle={[styles.containerStyle, this.props.containerStyle]}
        inputContainerStyle={[
          this.props.inputType === 'border'
            ? {
                ...styles.borderedInputContainerStyle(borderColor),
              }
            : {
                ...styles.inputContainerStyle(borderColor),
              },
          this.props.inputContainerStyle,
        ]}
        leftIconContainerStyle={this.props.leftIconContainerStyle}
        inputStyle={[
          this.props.inputType === 'border'
            ? {
                ...styles.borderInputStyle,
              }
            : {
                ...styles.inputStyle,
              },

          this.props.inputStyle,
        ]}
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
  borderColor: PropTypes.string,
};

SearchField.defaultProps = {
  onChangeText: () => {},
  throttle: true,
  timeout: TYPING_TIMEOUT,
  isSearching: false,
  borderColor: 'black',
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
  borderedInputContainerStyle: (color) => ({
    width: '100%',
    marginTop: 10,
    borderWidth: 1,
    height: 55,
    borderColor: color,
  }),
  borderInputStyle: {
    width: '100%',
    marginLeft: 15,
    paddingHorizontal: 0,
  },
  labelStyle: {
    color: 'black',
    fontSize: 15,
    marginTop: 20,
  },
});
