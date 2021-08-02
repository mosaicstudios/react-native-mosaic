import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default class AgreementInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      termsUrl: props.termsUrl,
      privacyUrl: props.privacyUrl,
      customUrl: props.customUrl,
      customText: props.customText,
      checkboxAnimationDuration: props.checkboxAnimationDuration,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
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
      <TouchableOpacity onPress={() => this._showTermsModal()}>
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
            value={this.state.termsAgreed}
            boxType="square"
            onCheckColor="white"
            tintColors={{ true: 'green', false: 'grey' }}
            onFillColor={'green'}
            onTintColor={'green'}
            animationDuration={this.state.checkboxAnimationDuration}
            onValueChange={(value) => {
              this.setState({ termsAgreed: value }, () =>
                this.props.onAgreedChanged(this.state.termsAgreed)
              );
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

AgreementInput.defaultProps = {
  visible: true,
  title: 'I agree to the terms & conditions ',
  checkboxAnimationDuration: 0.4,
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  checkboxContainer: { alignItems: 'flex-start', marginRight: 10 },
  textContainer: { flex: 1 },
  textStyle: { flexWrap: 'wrap' },
  customTextStyle: { color: 'green', marginTop: 0 },
  privacyTextStyle: { color: 'green', marginTop: 0 },
  termsTextStyle: { color: 'green' },
  urlContainerStyle: { marginTop: -4 },
});
