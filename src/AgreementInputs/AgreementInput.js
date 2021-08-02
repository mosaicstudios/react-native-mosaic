import React, { Component } from 'react';
import { View, Text, Switch, TouchableOpacity, Platform } from 'react-native';
import BaseComponent from '../../utils/BaseComponent';
import CheckBox from '@react-native-community/checkbox';

import Screens from '../../constants/Screens';
import Colors from '../../constants/Colors';

type Props = {};
export default class AgreementInput extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      termsUrl: props.termsUrl,
      privacyUrl: props.privacyUrl,
      customUrl: props.customUrl,
      customText: props.customText,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  _showTermsModal() {
    let { venue, termsUrl } = this.state;
    this.showModal(Screens.Web, {
      url: termsUrl,
      title: 'Terms & Condition',
      showCloseButton: true,
    });
  }

  _showCustomUrlModal(url) {
    this.showModal(Screens.Web, {
      url: url,
      title: this.state.customText,
      showCloseButton: true,
    });
  }

  _showPrivacyModal() {
    let { venue, privacyUrl } = this.state;
    this.showModal(Screens.Privacy, {
      showCloseButton: true,
    });
  }

  _renderTermsText() {
    if (!this.state.termsUrl) {
      return null;
    }
    return (
      <TouchableOpacity onPress={() => this._showTermsModal()}>
        <Text style={{ color: Colors.Primary }}>Terms & Conditions</Text>
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
          style={{ marginTop: -4 }}
          onPress={() => this._showPrivacyModal()}
        >
          <Text style={{ color: Colors.Primary, marginTop: 0 }}>
            Randox's Privacy Policy
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
          style={{ marginTop: -4 }}
          onPress={() => this._showCustomUrlModal(customUrl)}
        >
          <Text style={{ color: Colors.Primary, marginTop: 0 }}>
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
      <View
        style={[
          {
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          },
          this.props.containerStyle,
        ]}
      >
        <View style={{ alignItems: 'flex-start', marginRight: 10 }}>
          <CheckBox
            value={this.state.termsAgreed}
            boxType="square"
            onCheckColor="white"
            tintColors={{ true: Colors.Primary, false: 'grey' }}
            onFillColor={Colors.Primary}
            onTintColor={Colors.Primary}
            animationDuration={0.4}
            onValueChange={(value) => {
              this.setState({ termsAgreed: value }, () =>
                this.props.onAgreedChanged(this.state.termsAgreed)
              );
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ flexWrap: 'wrap' }}>
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
  title: 'I agree to the to the venues ',
};
