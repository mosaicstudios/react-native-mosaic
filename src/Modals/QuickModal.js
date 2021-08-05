import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from 'react-native-text';
import Modal from 'react-native-modal';

const DURATION = 1400;
export default class QuickModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      text: '',
    };
  }

  show(text) {
    this.setState({ visible: true, text });
    setTimeout(() => {
      this.setState({ visible: false });
    }, this.props.duration);
  }

  _getModalPosition() {
    switch (this.props.modalPosition) {
      case 'top':
        return { justifyContent: 'flex-start', padding: 40 };
      case 'center':
        return { justifyContent: 'center', padding: 40 };
      case 'bottom':
        return { justifyContent: 'flex-end', padding: 40 };
    }
  }

  render() {
    let { text, visible } = this.state;
    return (
      <Modal
        {...this.props}
        animationIn={this.props.animationIn}
        animationOut={this.props.animationOut}
        animationInTiming={this.props.animationInTiming}
        isVisible={visible}
        backdropOpacity={this.props.backdropOpacity}
        useNativeDriver={this.props.useNativeDriver}
        style={this._getModalPosition()}
      >
        <View style={styles.background}>
          <View style={[styles.container]}>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

QuickModal.defaultProps = {
  animationIn: 'fadeInUp',
  animationOut: 'fadeOutDown',
  animationInTiming: 200,
  backdropOpacity: 0,
  useNativeDriver: true,
  modalPosition: 'bottom',
  duration: DURATION,
};

export const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },

  container: {
    opacity: 0.9,
    borderRadius: 8,
    width: '50%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333333',
  },

  text: { textAlign: 'center', color: 'white' },
});
