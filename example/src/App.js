import React, { Component } from 'react';

import { StyleSheet, View } from 'react-native';

import { LocationSearch, AuthManager } from 'react-native-mosaic';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    AuthManager.setup({
      refreshTokenUrl: 'https://xelda-api-dev.herokuapp.com/user/refresh-token',
      loginUrl: 'https://xelda-api-dev.herokuapp.com/user/login',
      logoutUrl: 'https://xelda-api-dev.herokuapp.com/user/logout',
      registerUrl: 'https://xelda-api-dev.herokuapp.com/clients',
      userInfoUrl: 'https://xelda-api-dev.herokuapp.com/user/info',
      requestResetPasswordUrl:
        'https://xelda-api-dev.herokuapp.com/user/request-reset-password',
      resetPassword: 'https://xelda-api-dev.herokuapp.com/user/reset-password',
      socialUrl:
        'https://xelda-api-dev.herokuapp.com/user/login/social/jwt-pair-user/',
      getUser: (responseJson) => {
        if (!responseJson.client) {
          throw {
            error: 'Only clients can use this app',
            message: 'Only clients can use this app',
          };
        }
        if (responseJson.client) {
          return { currentUser: responseJson.client, userType: 'client' };
        }
      },
    });
  }

  _login() {
    this.setState({ isLoading: true });
    let { email, password } = this.state;
    AuthManager.login(email, password)
      .then((response) => {
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.log('error', error);
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <LocationSearch
          showManualAddress
          manualAddressOnly
          manualInputType="border"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  containerStyle: {
    backgroundColor: 'transparent',
    padding: 0,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 18,
  },
  activeSegment: {
    borderRadius: 20,
    backgroundColor: 'blue',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  segmentControl: {
    borderRadius: 20,
    backgroundColor: '#f3e3ff',
  },
  selectedText: { color: 'white', fontSize: 16 },
  unselectedText: {
    color: 'red',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 255, 0.32)',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '700',
  },
});
