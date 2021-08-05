import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes,
  TextStyle,
} from 'react-native';
import Text from 'react-native-text';
import CheckBox from '@react-native-community/checkbox';

import PropTypes from 'prop-types';

export default class AgreementInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      termsUrl: props.termsUrl,
      privacyUrl: props.privacyUrl,
      customUrl: props.customUrl,
      customText: props.customText,
      fillColor: props.fillColor,
      boxType: props.boxType,
      checkboxAnimationDuration: props.checkboxAnimationDuration,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  _showTermsModal() {
    let { termsUrl } = this.state;
    this.props.showTerms(termsUrl);
  }

  _showCustomUrlModal(url) {
    this.props.showCustom(url);
  }

  _showPrivacyModal() {
    let { privacyUrl } = this.state;
    this.props.showPrivacy(privacyUrl);
  }

  _renderTermsText() {
    if (!this.state.termsUrl) {
      return null;
    }
    return (
      <TouchableOpacity
        style={styles.urlContainerStyle}
        onPress={() => this._showTermsModal()}
      >
        <Text style={[styles.termsTextStyle, this.props.termsTextStyle]}>
          Terms & Conditions
        </Text>
      </TouchableOpacity>
    );
  }

  _renderPrivacyPolicyText() {
    if (!this.state.privacyUrl) {
      return null;
    }
    return (
      <>
        {this.state.termsUrl && <Text> and </Text>}
        <TouchableOpacity
          style={styles.urlContainerStyle}
          onPress={() => this._showPrivacyModal()}
        >
          <Text style={[styles.privacyTextStyle, this.props.privacyTextStyle]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </>
    );
  }

  _renderCustomUrlText() {
    let { customUrl } = this.state;
    if (!customUrl) {
      return null;
    }
    return (
      <>
        <TouchableOpacity
          style={styles.urlContainerStyle}
          onPress={() => this._showCustomUrlModal(customUrl)}
        >
          <Text style={[styles.customTextStyle, this.props.customTextStyle]}>
            {this.state.customText || 'CUSTOM TEXT'}
          </Text>
        </TouchableOpacity>
      </>
    );
  }

  render() {
    let { visible } = this.state;
    if (!visible) {
      return null;
    }
    return (
      <View style={[styles.mainContainer, this.props.containerStyle]}>
        <View style={[styles.checkboxContainer, this.props.checkboxContainer]}>
          <CheckBox
            {...this.props}
            value={this.state.termsAgreed}
            boxType={this.state.boxType}
            onCheckColor={this.state.checkColor}
            onFillColor={this.state.fillColor}
            onTintColor={this.state.tintColor}
            animationDuration={this.state.checkboxAnimationDuration}
            onValueChange={(value) => {
              this.setState({ termsAgreed: value }, () => {
                if (this.props.onValueChange) {
                  this.props.onValueChange(this.state.termsAgreed);
                }
              });
            }}
          />
        </View>
        <View style={[styles.textContainer, this.props.textContainer]}>
          <Text style={[styles.textStyle, this.props.textStyle]}>
            {this.props.title}
            {this._renderTermsText()}
            {this._renderPrivacyPolicyText()}
            {this._renderCustomUrlText()}
          </Text>
        </View>
      </View>
    );
  }
}

AgreementInput.propTypes = {
  /**
   * Will trigger when the user presses the checkbox. A boolean value will be returned.
   */
  onValueChange: PropTypes.func,

  /**
   * To control if the component is rendered based on a state variable. Default is true.
   */
  visible: PropTypes.bool,

  /**
   * Shows the terms and conditions url.
   */
  termsUrl: PropTypes.string,

  /**
   * Will trigger when termsUrl contains a string and is pressed by the user.
   */
  showTerms: PropTypes.func,

  /**
   * Shows the privacy url.
   */
  privacyUrl: PropTypes.string,

  /**
   * Will trigger when privacyUrl contains a string and is pressed by the user.
   */
  showPrivacy: PropTypes.func,

  /**
   * Allows to show a custom url. Will be shown at the end of the text.
   */
  customUrl: PropTypes.string,

  /**
   * The custom text for a custom url. Defaults to 'CUSTOM TEXT' if a customUrl is provided but this prop is not used.
   */
  customText: PropTypes.string,

  /**
   * Will trigger when customUrl contains a string and is pressed by the user.
   */
  showCustom: PropTypes.func,

  /**
   * Background color of the checkbox indicator.
   */
  fillColor: PropTypes.string,

  /**
   * Border color around the checkbox input.
   */
  tintColor: PropTypes.string,

  /**
   * Checkmark color.
   */
  checkColor: PropTypes.string,

  /**
   * Base style for the container.
   */
  containerStyle: ViewPropTypes.style,

  /**
   * Style for the container of checkbox input.
   */
  checkboxContainer: ViewPropTypes.style,

  /**
   * Style for the container of text.
   */
  textContainer: ViewPropTypes.style,

  /**
   * Text style for the title text.
   */
  textStyle: TextStyle,

  /**
   * The type of box to use. Defaults to 'circle'
   */
  boxType: PropTypes.oneOf(['square', 'circle']),

  /**
   * The animation that occurs when the checkbox value changes.
   */
  checkboxAnimationDuration: PropTypes.number,
};

AgreementInput.defaultProps = {
  visible: true,
  title: 'I agree to the terms & conditions ',
  checkboxAnimationDuration: 0.4,
  onValueChange: () => {},
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxContainer: { alignItems: 'flex-start', marginRight: 10 },
  textContainer: { flex: 1 },
  textStyle: { flexWrap: 'wrap' },
  customTextStyle: { color: 'green', marginTop: 0 },
  privacyTextStyle: { color: 'green', marginTop: 0 },
  termsTextStyle: { color: 'green' },
  urlContainerStyle: { marginTop: -3 },
});
