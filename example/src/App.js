import React, { Component } from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { TypingText } from 'react-native-mosaic';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // AuthManager.setup({
    //   refreshTokenUrl: 'https://xelda-api-dev.herokuapp.com/user/refresh-token',
    //   loginUrl: 'https://xelda-api-dev.herokuapp.com/user/login',
    //   logoutUrl: 'https://xelda-api-dev.herokuapp.com/user/logout',
    //   registerUrl: 'https://xelda-api-dev.herokuapp.com/clients',
    //   userInfoUrl: 'https://xelda-api-dev.herokuapp.com/user/info',
    //   requestResetPasswordUrl:
    //     'https://xelda-api-dev.herokuapp.com/user/request-reset-password',
    //   resetPassword: 'https://xelda-api-dev.herokuapp.com/user/reset-password',
    //   socialUrl:
    //     'https://xelda-api-dev.herokuapp.com/user/login/social/jwt-pair-user/',
    //   getUser: (responseJson) => {
    //     if (!responseJson.client) {
    //       throw {
    //         error: 'Only clients can use this app',
    //         message: 'Only clients can use this app',
    //       };
    //     }
    //     if (responseJson.client) {
    //       return { currentUser: responseJson.client, userType: 'client' };
    //     }
    //   },
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text>This is mosaic, We </Text>
          <TypingText
            steps={['Design ✏️', 1000, 'Develop 🛠️', 1000, 'Maintain 💡', 1000]}
            loop={Infinity}
            blinkCursor={true}
            editDelay={100}
            deleteDelay={100}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  innerContainer: { flexDirection: 'row', justifyContent: 'center' },
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
