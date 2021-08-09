import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';

import PropTypes from 'prop-types';

type Props = {};
export default class LogoBanner extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      image: props.image,
    };
  }
  render() {
    return (
      <Image
        style={[styles.image, this.props.style]}
        source={this.state.image}
      />
    );
  }
}

LogoBanner.propTypes = {
  image: PropTypes.string,
};

const styles = StyleSheet.create({
  image: { width: '70%', flex: 1, resizeMode: 'contain', marginLeft: '5%' },
});
