import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import TextField from './TextField';
import Separator from '../Separators/Separator';

import LocationFormat from '../Utils/LocationFormat';

export default class LocationSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      error: null,
      _hasFocus: false,
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    return nextProps;
  }

  setAddress(location) {
    if (!location.latitude || !location.longitude) {
      this.setState({ data: location, showManuallyAddressContainer: true });
    }
    this.setState({ data: location }, () => {
      this.searchField.setAddressText(LocationFormat.fullAddress(location));
    });
  }

  _underlineColor() {
    return this.state._hasFocus ? this.props.underlineColor : 'lightgray';
  }

  onPlaceSelected(data, details) {
    var data = {};
    if (details.geometry && details.geometry.location) {
      const location = details.geometry.location;
      data.longitude = location.lng;
      data.latitude = location.lat;
    }
    data.line_1 = details.name;
    data.formattedAddress = details.formatted_address;
    details.address_components.forEach(function (address_component) {
      var type = address_component.types[0];
      if (type === 'country') {
        data.country = address_component.long_name;
        data.countryShort = address_component.short_name;
      }
      if (type === 'neighborhood') {
        data.city = address_component.long_name;
      }
      if (type === 'locality' || type === 'postal_town') {
        data.city = address_component.long_name;
      } else if (type === 'administrative_area_level_1') {
        data.state = address_component.long_name;
      }
    });
    this.setState({ data });
    let location = LocationFormat.getAddress(data);
    this.props.onPlaceSelected(location);
  }
  isValid() {
    const {
      country,
      countryShort,
      city,
      state,
      longitude,
      latitude,
      address,
      line_1,
    } = this.state.data;
    const errorMessage = 'Please enter a more specific location';
    var error = null;
    this.setState({ error });
    if (this.state.showManuallyAddressContainer) {
      if (line_1 === null || line_1 === '') {
        error = errorMessage;
      } else if (country === null || country === '') {
        error = errorMessage;
      } else if (city === null || city === '') {
        error = errorMessage;
      } else if (state === null || state === '') {
        error = errorMessage;
      }
    } else {
      if (country === null || country === '') {
        error = errorMessage;
      } else if (city === null || city === '') {
        error = errorMessage;
      } else if (line_1 === null || line_1 === '') {
        error = errorMessage;
      } else if (state === null || state === '') {
        error = errorMessage;
      } else if (longitude === null || longitude === null) {
        error = errorMessage;
      }
    }

    if (error) {
      this.setState({ error });
      return false;
    }
    return true;
  }
  errorMessage() {
    if (this.state.error == null || this.state.error == '') {
      return <View style={styles.spacer} />;
    }

    return (
      <Text
        style={{ marginBottom: 10, color: 'red', marginLeft: 10, marginTop: 5 }}
      >
        {this.state.error}
      </Text>
    );
  }

  _getTextInputStyle() {
    let { data } = this.state;
    let textColor = { color: 'black' };
    return {
      paddingLeft: 0,
      marginLeft: 2,
      backgroundColor: 'transparent',
      fontSize: 18,
      ...textColor,
    };
  }

  _renderHeaderComponent() {
    if (!this.props.manualAddress) {
      return null;
    }
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ showManuallyAddressContainer: true })}
        >
          <View
            style={[
              styles.manualAddressContainer,
              this.props.manualAddressContainer,
            ]}
          >
            <Text
              style={[styles.manualAddressText, this.props.manualAddressText]}
            >
              Enter Address Manually
            </Text>
          </View>
        </TouchableOpacity>
        <Separator />
      </View>
    );
  }

  _updateData(key, value) {
    let { data } = this.state;
    data[key] = value;
    this.setState({ data }, () => {
      this.props.onPlaceSelected(data);
    });
  }

  _renderManualAddressContainer() {
    let { data } = this.state;
    if (!this.state.showManuallyAddressContainer) {
      return null;
    }
    return (
      <>
        {!this.props.manualAddressOnly && (
          <TouchableOpacity
            onPress={() =>
              this.setState({ showManuallyAddressContainer: false })
            }
          >
            <View style={{ marginTop: 10 }}>
              <Text style={styles.manualAddressText}>
                Change to autofill address
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <TextField
          ref={(tfLine1) => (this.tfLine1 = tfLine1)}
          value={data ? data.line_1 : null}
          label="Line 1"
          placeholder="Address line 1"
          onChangeText={(value) => this._updateData('line_1', value)}
        />
        <TextField
          value={data ? data.line_2 : null}
          label="Line 2"
          placeholder="Address line 2 (Optional)"
          onChangeText={(value) => this._updateData('line_2', value)}
        />
        <TextField
          value={data ? data.line_3 : null}
          label="Line 3"
          placeholder="Address line 3 (Optional)"
          onChangeText={(value) => this._updateData('line_3', value)}
        />
        <TextField
          ref={(tfCity) => (this.tfCity = tfCity)}
          value={data ? data.city : null}
          label="City"
          placeholder="City"
          onChangeText={(value) => this._updateData('city', value)}
        />
        <TextField
          ref={(tfCounty) => (this.tfCounty = tfCounty)}
          value={data ? data.state : null}
          label="County"
          placeholder="County"
          onChangeText={(value) => this._updateData('state', value)}
        />
        <TextField
          ref={(tfCountry) => (this.tfCountry = tfCountry)}
          value={data ? data.country : null}
          label="Country"
          placeholder="Country"
          onChangeText={(value) => this._updateData('country', value)}
        />
      </>
    );
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerHeight]}>
        {this._renderManualAddressContainer()}
        {!this.state.showManuallyAddressContainer && (
          <GooglePlacesAutocomplete
            ref={(searchField) => (this.searchField = searchField)}
            enablePoweredByContainer={false}
            placeholder="Address"
            placeholderTextColor="black"
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed={this.state.listViewDisplayed}
            fetchDetails={true}
            setAddressText={'HERE'}
            // renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              this.onPlaceSelected(data, details);
              this.setState({ listViewDisplayed: false });
            }}
            textInputProps={{
              onChangeText: (text) => {
                this.setState({
                  data: {},
                  error: null,
                  listViewDisplayed: true,
                });
              },
              onFocus: () => this.setState({ _hasFocus: true }),
              onBlur: () => this.setState({ _hasFocus: false }),
            }}
            getDefaultValue={() => this.props.value}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: this.props.gmapsKey,
              language: 'en', // language of the results
              types: '', // default: 'geocode'
            }}
            renderHeaderComponent={() => this._renderHeaderComponent()}
            styles={{
              textInputContainer: {
                width: '100%',
                backgroundColor: 'transparent',
                borderBottomWidth: 1,
                borderBottomColor: this._underlineColor(),
                paddingLeft: 0,
                marginLeft: 0,
                borderRadius: 0,
                borderTopWidth: 0,
              },
              textInput: this._getTextInputStyle(),
              description: {
                fontWeight: 'bold',
              },
              predefinedPlacesDescription: {
                color: 'black',
              },
              container: {
                width: '96%',
                marginHorizontal: 8,
                backgroundColor: 'transparent',
                ...this.props.containerStyle,
              },
              listView: {
                color: 'white',
                backgroundColor: '#f7f7f7',
              },
            }}
            nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={
              {
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }
            }
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
            }}
            filterReverseGeocodingByTypes={['street_address']}
            // predefinedPlaces={[homePlace, workPlace]}

            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            renderRightButton={() => <View style={styles.rightButton}></View>}
            // renderRightButton={() => <Text>Custom text after the input</Text>}
          />
        )}
        {this.errorMessage()}
      </View>
    );
  }
}

LocationSearch.defaultProps = {
  underlineColor: 'black',
  manualAddress: true,
  manualAddressOnly: false,
  value: '',
};

const styles = {
  container: {
    width: '100%',
    flex: 1,
    marginBottom: -10,
  },
  manualAddressContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 44,
    margin: 5,
    marginHorizontal: 15,
  },
  manualAddressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  spacer: { marginBottom: 10 },
  rightButton: {
    marginLeft: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
