import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';
import FetchHelper from './FetchHelper';

import jwtDecode from 'jwt-decode';
import moment from 'moment';

const KEY_ACCESS_TOKEN = 'accessToken';
const KEY_REFRESH_TOKEN = 'refreshToken';

export default class AuthManager {
  static setup(data) {
    AuthManager.REFRESH_TOKEN_URL = data.refreshTokenUrl;
    AuthManager.LOGIN_URL = data.loginUrl;
    AuthManager.LOGOUT_URL = data.logoutUrl;
    AuthManager.REGISTER_URL = data.registerUrl;
    AuthManager.USER_INFO_URL = data.userInfoUrl;
    AuthManager.REQUEST_RESET_PASSWORD_URL = data.requestResetPasswordUrl;
    AuthManager.RESET_PASSWORD = data.resetPassword;
    AuthManager.SOCIAL_LOGIN_URL = data.socialUrl;
    AuthManager.DEVICE_TOKEN = data.deviceToken;
    AuthManager.DEVICE_TOKEN_APNS = data.deviceTokenApns;
    AuthManager.DEVICE_TOKEN_FCM = data.deviceTokenFcm;
    AuthManager.getUser = data.getUser;
  }

  static updateDeviceToken(token) {
    AuthManager.DEVICE_TOKEN = token;
  }

  static showEndpoints() {
    let endpoints = {
      REFRESH_TOKEN_URL: AuthManager.REFRESH_TOKEN_URL,
      LOGIN_URL: AuthManager.LOGIN_URL,
      LOGOUT_URL: AuthManager.LOGOUT_URL,
      REGISTER_URL: AuthManager.REGISTER_URL,
      USER_INFO_URL: AuthManager.USER_INFO_URL,
      REQUEST_RESET_PASSWORD_URL: AuthManager.REQUEST_RESET_PASSWORD_URL,
      RESET_PASSWORD: AuthManager.RESET_PASSWORD,
      SOCIAL_LOGIN_URL: AuthManager.SOCIAL_LOGIN_URL,
      DEVICE_TOKEN: AuthManager.DEVICE_TOKEN,
      DEVICE_TOKEN_APNS: AuthManager.DEVICE_TOKEN_APNS,
      DEVICE_TOKEN_FCM: AuthManager.DEVICE_TOKEN_FCM,
    };
    return endpoints;
  }

  static isAuthenticated() {
    return AuthManager.isLoggedIn;
  }

  static getAccessToken() {
    return AuthManager.accessToken;
  }

  static getCurrentUser() {
    return AuthManager.currentUser;
  }

  static _hasError(responseJson) {
    let hasError = false;
    let tokens = responseJson.tokens;

    if (!tokens) {
      hasError = true;
    }

    if (tokens.length === 0) {
      hasError = true;
    }

    if (!tokens.access) {
      hasError = true;
    }

    if (!tokens.refresh) {
      hasError = true;
    }

    return hasError;
  }

  static register(data) {
    return FetchHelper.post(AuthManager.REGISTER_URL, data, false, false)
      .then((responseJson) => {
        if (this._hasError(responseJson)) {
          throw AuthManager.getError(responseJson);
        }
        AuthManager._updateTokens(responseJson.tokens);
        AuthManager._setUser(responseJson);
        return responseJson;
      })
      .catch((error) => {
        throw AuthManager.getError(error);
      });
  }

  static login(email, password) {
    let data = { email, password };
    return FetchHelper.post(AuthManager.LOGIN_URL, data, false, false)
      .then((responseJson) => {
        if (this._hasError(responseJson)) {
          throw AuthManager.getError(responseJson);
        }
        AuthManager._updateTokens(responseJson.tokens);
        AuthManager._setUser(responseJson);
        return responseJson;
      })
      .catch((error) => {
        throw AuthManager.getError(error);
      });
  }

  static socialLogin(provider, code, redirectUri, extras = null) {
    let data = {
      provider,
      code,
      redirect_uri: redirectUri,
    };

    if (extras != null) {
      data = { ...data, ...extras };
    }

    return FetchHelper.post(
      AuthManager.SOCIAL_LOGIN_URL,
      data,
      false,
      false
    ).then((responseJson) => {
      if (this._hasError(responseJson)) {
        throw AuthManager.getError(responseJson);
      }
      AuthManager._updateTokens(responseJson.tokens);
      AuthManager._setUser(responseJson);
      return responseJson;
    });
  }

  static _getMinutesUntilTokenExpiration() {
    var decodedJWT = jwtDecode(AuthManager.accessToken);
    var exp = decodedJWT.exp * 1000;
    var expirationTime = moment(exp);
    var today = moment();
    return expirationTime.diff(today, 'minutes');
  }

  static async validateTokens(onSuccess, onError) {
    let remainingMinutes = AuthManager._getMinutesUntilTokenExpiration();
    if (remainingMinutes > 1) {
      onSuccess();
      return;
    }
    return AuthManager.refreshTokens(() => {
      return onSuccess();
    }).catch((error) => {
      onError();
      throw { message: 'Token is expired. Please sign in.' };
    });
  }

  static refreshTokens() {
    return AsyncStorage.getItem(KEY_REFRESH_TOKEN)
      .then((refreshToken) => {
        if (!refreshToken) {
          throw { message: 'No Refresh Token Found' };
        }
        // try and refresh the token if we find it, if this fails
        // our token has expired and we will need user to re login
        // manually
        const data = { refresh: refreshToken };

        return FetchHelper.post(
          AuthManager.REFRESH_TOKEN_URL,
          data,
          false,
          false
        );
      })
      .then((tokenResponse) => {
        return AuthManager._updateTokens(tokenResponse);
      });
  }

  static silentLogin() {
    return AuthManager.refreshTokens()
      .then(() => {
        return FetchHelper.get(AuthManager.USER_INFO_URL);
      })
      .then((responseJson) => {
        AuthManager._setUser(responseJson);
        return AuthManager.currentUser;
      })
      .catch((error) => {
        AuthManager.accessToken = null;
        AuthManager.refreshToken = null;
        throw error;
      });
  }

  static refreshCurrentUser() {
    return FetchHelper.get(AuthManager.USER_INFO_URL)
      .then((responseJson) => {
        AuthManager._setUser(responseJson);
        return AuthManager.currentUser;
      })
      .catch((error) => {
        throw error;
      });
  }

  static async logOut() {
    let data = { refresh: AuthManager.refreshToken };
    return AuthManager.removeToken()
      .then(() => {
        return FetchHelper.post(AuthManager.LOGOUT_URL, data);
      })
      .then(() => {
        return AuthManager.removeCredentials();
      })
      .catch((error) => {
        return AuthManager.removeCredentials();
      });
  }

  static async removeToken() {
    if (!AuthManager.DEVICE_TOKEN) {
      return true;
    }

    let endpoint =
      Platform.OS === 'ios'
        ? AuthManager.DEVICE_TOKEN_APNS
        : AuthManager.DEVICE_TOKEN_FCM;
    endpoint += '/' + AuthManager.DEVICE_TOKEN;

    return FetchHelper.delete(endpoint);
  }

  static requestResetPassword(email) {
    return FetchHelper.post(
      AuthManager.REQUEST_RESET_PASSWORD_URL,
      {
        email,
      },
      false,
      false
    );
  }

  static resetPassword(email, password, code) {
    let data = {
      email,
      password,
      verification_code: code,
    };
    return FetchHelper.post(AuthManager.RESET_PASSWORD, data, false, false);
  }

  static removeCredentials() {
    AuthManager.accessToken = null;
    AuthManager.refreshToken = null;
    AuthManager.isLoggedIn = false;
    AuthManager.currentUser = null;
    AuthManager.userType = null;
    AsyncStorage.removeItem(KEY_ACCESS_TOKEN);
    return AsyncStorage.removeItem(KEY_REFRESH_TOKEN);
  }

  static getError(error) {
    var errorMessage = 'An unexpected error occured';
    if (error.email) {
      errorMessage = error.email[0];
    } else if (error.message) {
      errorMessage = error.message;
    } else if (error.non_field_errors) {
      errorMessage = error.non_field_errors[0];
    } else if (error.detail) {
      errorMessage = error.detail;
    }
    return { error: errorMessage, message: errorMessage };
  }

  static _updateTokens(tokens) {
    AuthManager.accessToken = tokens.access;
    AuthManager.refreshToken = tokens.refresh;
    AsyncStorage.setItem(KEY_ACCESS_TOKEN, AuthManager.accessToken);
    AsyncStorage.setItem(KEY_REFRESH_TOKEN, AuthManager.refreshToken);
  }

  static _setUser(responseJson) {
    let { currentUser, userType } = AuthManager.getUser(responseJson);
    AuthManager.isLoggedIn = true;
    AuthManager.currentUser = currentUser;
    AuthManager.userType = userType;
  }

  static getHeaders(contentType = 'application/json') {
    var headers = { 'Content-Type': contentType };
    if (AuthManager.accessToken) {
      headers.Authorization = 'Bearer ' + AuthManager.accessToken;
    }

    return new Headers(headers);
  }
}
