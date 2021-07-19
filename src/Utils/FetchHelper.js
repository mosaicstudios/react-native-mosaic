import { Platform, PermissionsAndroid, CameraRoll } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import AuthManager from './AuthManager';

// returns an authenticated fetch requests if possible
// these method are just shortcuts for including headers into
// fetch requests
const PAGE_LIMIT = 20;
export default class FetchHelper {
  static get(
    endpoint,
    validateTokens = AuthManager.getCurrentUser() ? true : false
  ) {
    let data = {};
    data.headers = AuthManager.getHeaders();
    let statusCode = null;
    return FetchHelper._handleValidateTokens(validateTokens).then(() => {
      return fetch(endpoint, data)
        .then((response) => {
          console.log('response', response);
          statusCode = response.status;
          return response.json();
        })
        .then((responseJson) => {
          console.log('responseJson', responseJson);
          let status = { code: statusCode, success: responseJson.status };
          if (this._hasError(status)) {
            throw FetchHelper._getError(responseJson);
          }

          return responseJson;
        });
    });
  }

  static getPaginated(
    endpoint,
    page,
    validateTokens = AuthManager.getCurrentUser() ? true : false,
    pageLimit = PAGE_LIMIT
  ) {
    if (endpoint.includes('?')) {
      endpoint += '&';
    } else {
      endpoint += '?';
    }
    return FetchHelper._handleValidateTokens(validateTokens).then(() => {
      return FetchHelper.get(endpoint + 'page=' + page).then((responseJson) => {
        return responseJson;
      });
    });
  }

  static post(
    endpoint,
    data,
    isMultiPart = false,
    validateTokens = AuthManager.getCurrentUser() ? true : false
  ) {
    let statusCode = null;
    return FetchHelper._handleValidateTokens(validateTokens).then(() => {
      return fetch(endpoint, {
        method: 'POST',
        headers: isMultiPart
          ? AuthManager.getHeaders('multipart/form-data')
          : AuthManager.getHeaders(),
        body: isMultiPart ? data : JSON.stringify(data),
      })
        .then((response) => {
          statusCode = response.status;
          if (statusCode === 204) {
            return response;
          }
          return response.json();
        })
        .then((responseJson) => {
          let status = { code: statusCode, success: responseJson.status };
          if (this._hasError(status)) {
            throw FetchHelper._getError(responseJson);
          }
          return responseJson;
        });
    });
  }

  static _handleValidateTokens(validateTokens) {
    return new Promise((resolve, reject) => {
      if (validateTokens) {
        return AuthManager.validateTokens(resolve, reject);
      }
      resolve();
    });
  }

  static patch(
    endpoint,
    data,
    stringify = true,
    validateTokens = AuthManager.getCurrentUser() ? true : false
  ) {
    var headers = AuthManager.getHeaders();
    if (stringify) {
      data = JSON.stringify(data);
    } else {
      headers = AuthManager.getHeaders('multipart/form-data');
    }

    let statusCode = null;
    return FetchHelper._handleValidateTokens(validateTokens).then(() => {
      return fetch(endpoint, {
        method: 'PATCH',
        headers: headers,
        body: data,
      })
        .then((response) => {
          statusCode = response.status;
          if (statusCode === 204) {
            return response;
          }
          return response.json();
        })
        .then((responseJson) => {
          let status = { code: statusCode, success: responseJson.status };
          if (this._hasError(status)) {
            throw FetchHelper._getError(responseJson);
          }
          return responseJson;
        });
    });
  }

  static put(
    endpoint,
    data,
    stringify = true,
    validateTokens = AuthManager.getCurrentUser() ? true : false
  ) {
    var headers = AuthManager.getHeaders();
    // this is needed by server side for all put requests
    data._method = 'PUT';
    if (stringify) {
      data = JSON.stringify(data);
    } else {
      headers = AuthManager.getHeaders('multipart/form-data');
    }
    let statusCode = null;
    return FetchHelper._handleValidateTokens(validateTokens).then(() => {
      return fetch(endpoint, {
        // this is needed by server side for all put requests
        method: 'POST',
        headers: headers,
        body: data,
      })
        .then((response) => {
          statusCode = response.status;
          return response.json();
        })
        .then((responseJson) => {
          let status = { code: statusCode, success: responseJson.status };
          if (this._hasError(status)) {
            throw FetchHelper._getError(responseJson);
          }

          return responseJson;
        });
    });
  }

  static delete(
    endpoint,
    data,
    validateTokens = AuthManager.getCurrentUser() ? true : false
  ) {
    let statusCode = null;
    return FetchHelper._handleValidateTokens(validateTokens).then(() => {
      return fetch(endpoint, {
        method: 'DELETE',
        headers: AuthManager.getHeaders(),
        body: JSON.stringify(data),
      })
        .then((response) => {
          statusCode = response.status;
          if (statusCode === 204) {
            return response;
          }
          return response.json();
        })
        .then((responseJson) => {
          let status = { code: statusCode, success: responseJson.status };
          if (this._hasError(status)) {
            throw FetchHelper._getError(responseJson);
          }
          return responseJson;
        });
    });
  }

  static _hasError({ code, success }) {
    return code < 200 || code > 299 || success === false;
  }

  static _getError(responseJson) {
    let error = null;

    if (responseJson.message) {
      error = responseJson.message;
    } else if (responseJson.non_field_errors) {
      error = responseJson.non_field_errors;
    } else {
      error = responseJson;
    }

    if (error.constructor === Object) {
      for (var key in error) {
        error =
          key +
          ': ' +
          FetchHelper._getError(error[Object.keys(error)[0]]).message;
        break;
      }
    }

    let message = 'An unexpected error occured';

    if (error instanceof Array) {
      message = error[0];
    } else if (typeof error === 'string') {
      message = error;
    }
    if (error.constructor === Object) {
      for (key in error) {
        message = error[key];
      }
    }

    message = message.replace('user: email: ', '');

    let code = responseJson.code ?? null;
    return { code, error, message };
  }

  static _hasMore(results, pageLimit) {
    if (results.current_page) {
      return results.current_page < results.last_page;
    }
    return results.data.length >= pageLimit;
  }

  static download(endpoint, mime, extension, description = 'RR Download') {
    const date = new Date();
    const directory =
      Platform.OS === 'ios'
        ? RNFetchBlob.fs.dirs.DocumentDir
        : RNFetchBlob.fs.dirs.DownloadDir;
    const title =
      'RR_' +
      Math.floor(date.getTime() + date.getSeconds() / 2) +
      '.' +
      extension;
    const path = directory + '/' + title;
    return FetchHelper.getDownloadPermission()
      .then(() => {
        return RNFetchBlob.config({
          path: path,
          addAndroidDownloads: {
            title: title,
            useDownloadManager: false,
            notification: true,
            mime: mime,
            description: description,
          },
        }).fetch('GET', endpoint, {
          Authorization: 'Bearer ' + AuthManager.accessToken,
        });
      })
      .then((res) => {
        // the temp file path
        if (Platform.OS === 'ios' && extension !== 'pdf') {
          CameraRoll.saveToCameraRoll(res.data);
        }
        return res;
      });
  }

  static async getDownloadPermission() {
    if (Platform.OS === 'ios') {
      return true;
    }
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'External Storage Permission',
        message: 'We need this permission to download the pdf to your device',
      }
    ).then((granted) => {
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        throw {
          error: 'permissions',
          message: 'We need the permission in order to download the pdf',
        };
      }
      return true;
    });
  }
}
