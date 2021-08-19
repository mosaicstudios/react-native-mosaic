## AuthManager (Utility)

## Usage (Basic)

```js
import { AuthManager } from 'react-native-mosaic';

AuthManager.setup({
  refreshTokenUrl: 'https://api-dev.herokuapp.com/user/refresh-token',
  loginUrl: 'https://api-dev.herokuapp.com/user/login',
  logoutUrl: 'https://api-dev.herokuapp.com/user/logout',
  registerUrl: 'https://api-dev.herokuapp.com/clients',
  userInfoUrl: 'https://api-dev.herokuapp.com/user/info',
  requestResetPasswordUrl: 'https://api-dev.herokuapp.com/user/request-reset-password',
  resetPassword: 'https://api-dev.herokuapp.com/user/reset-password',
  socialUrl: 'https://api-dev.herokuapp.com/user/login/social/jwt-pair-user/',
  getUser: (responseJson) => {
    if (!responseJson.client) {
      throw {
        error: 'Only clients can use this app',
        message: 'Only clients can use this app',
      };
    }
    if(responseJson.client){
      return {currentUser: responseJson.client, userType: 'client'}
    }
  },
});

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

<View style={styles.container}>
  <TextField
    type="email"
    value={this.state.email}
    placeholder="Email"
    onChangeText={(value) => {
      this.setState({ email: value });
    }}
  />
  <TextField
    type="password"
    value={this.state.password}
    placeholder="Password"
    onChangeText={(value) => {
      this.setState({ password: value });
    }}
  />
  <Button
    title="Log In"
    style={{marginTop: 40}}
    isLoading={this.state.isLoading}
    onPress={() => this._login()}
  />
</View>
```

## Instance Methods

| Method                 | Params                                                      | Description                                                                                          |
| ---------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `setup`                | data (object)                                               | Set endpoints and current user.                                                                      |
| `isAuthenticated`      | '-'                                                         | Checks if a user is logged in.. Returns a boolean value.                                             |
| `getCurrentUser`       | '-'                                                         | Returns the current user object if one is set.                                                       |
| `register`             | data (object)                                               | Register user endpoint.                                                                              |
| `login`                | email, password                                             | Login endpoint.                                                                                      |
| `socialLogin`          | provider (string), code, redirectUri(string), extras = null | SocialLogin endpoint.                                                                                |
| `validateTokens`       | onSuccess, onError                                          | Check if the current access token is valid. If not the token will be refreshed.                      |
| `refreshTokens`        | '-'                                                         | Refresh the current access token.                                                                    |
| `silentLogin`          | '-'                                                         | If a current access token exists this function can be called to sign in the user silently.           |
| `refreshCurrentUser`   | '-'                                                         | Fetch and set the latest user object.                                                                |
| `logOut`               | '-'                                                         | Logout the current user and remove all credentials.                                                  |
| `requestResetPassword` | email (string)                                              | Request a reset code. This code is sent to the email provided, if the email exists in the database.  |
| `resetPassword`        | email, password, code                                       | Reset the users password. Code should match the one received using the requestResetPassword function |
| `removeCredentials`    | '-'                                                         | Clears all user credentials.                                                                         |
| `getHeaders`           | contentType (string)                                        | Return request headers. Default contentType is 'application/json'.                                   |
| `getError`             | error                                                       | Parse the error from request response. Will return an object containing error and message values     |
