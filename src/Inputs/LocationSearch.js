import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PropTypes from 'prop-types';

import PickerField from '../Pickers/PickerField';
import TextField from './TextField';
import Separator from '../Separators/Separator';

import Countries from '../Utils/Countries';
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
      this.setState({ data: location, showManualAddress: true });
    } else {
      this.setState({ data: location }, () => {
        this.searchField.setAddressText(LocationFormat.fullAddress(location));
      });
    }
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
    const { country, city, state, longitude, latitude, line_1 } =
      this.state.data;
    const errorMessage = 'Please enter a more specific location';
    var error = null;
    this.setState({ error });

    if (this.state.showManualAddress) {
      if (!line_1 || line_1 === '') {
        error = errorMessage;
      } else if (!country || country === '') {
        error = errorMessage;
      } else if (!city || city === '') {
        error = errorMessage;
      } else if (!state || state === '') {
        error = errorMessage;
      }
    } else {
      if (!country || country === '') {
        error = errorMessage;
      } else if (!city || city === '') {
        error = errorMessage;
      } else if (!line_1 || line_1 === '') {
        error = errorMessage;
      } else if (!state || state === '') {
        error = errorMessage;
      } else if (!longitude || !latitude) {
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
    if (!this.state.error || this.state.error === '') {
      return <View style={styles.spacer} />;
    }

    return <Text style={styles.errorText}>{this.state.error}</Text>;
  }

  _getTextInputStyle() {
    return {
      paddingLeft: 0,
      marginLeft: 2,
      backgroundColor: 'transparent',
      fontSize: 18,
      color: 'black',
    };
  }

  _renderHeaderComponent() {
    if (!this.props.manualAddress) {
      return null;
    }
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ showManualAddress: true })}
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
    if (!this.state.showManualAddress) {
      return null;
    }
    return (
      <>
        {!this.props.manualAddressOnly && (
          <TouchableOpacity
            onPress={() => this.setState({ showManualAddress: false })}
          >
            <View style={styles.manualAddressButtonStyle}>
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
          inputType={this.props.manualInputType}
          labelStyle={this.props.manualInputLabelStyle}
          inputContainerStyle={this.props.manualInputContainerStyle}
          placeholder="Address line 1"
          onChangeText={(value) => this._updateData('line_1', value)}
        />
        <TextField
          value={data ? data.line_2 : null}
          label="Line 2"
          inputType={this.props.manualInputType}
          labelStyle={this.props.manualInputLabelStyle}
          inputContainerStyle={this.props.manualInputContainerStyle}
          placeholder="Address line 2 (Optional)"
          onChangeText={(value) => this._updateData('line_2', value)}
        />
        <TextField
          value={data ? data.line_3 : null}
          label="Line 3"
          inputType={this.props.manualInputType}
          labelStyle={this.props.manualInputLabelStyle}
          inputContainerStyle={this.props.manualInputContainerStyle}
          placeholder="Address line 3 (Optional)"
          onChangeText={(value) => this._updateData('line_3', value)}
        />
        <TextField
          ref={(tfCity) => (this.tfCity = tfCity)}
          value={data ? data.city : null}
          label="City"
          inputType={this.props.manualInputType}
          labelStyle={this.props.manualInputLabelStyle}
          inputContainerStyle={this.props.manualInputContainerStyle}
          placeholder="City"
          onChangeText={(value) => this._updateData('city', value)}
        />
        <TextField
          ref={(tfCounty) => (this.tfCounty = tfCounty)}
          value={data ? data.state : null}
          label="County"
          inputType={this.props.manualInputType}
          labelStyle={this.props.manualInputLabelStyle}
          inputContainerStyle={this.props.manualInputContainerStyle}
          placeholder="County"
          onChangeText={(value) => this._updateData('state', value)}
        />
        {!this.props.showCountryPicker && (
          <TextField
            ref={(tfCountry) => (this.tfCountry = tfCountry)}
            value={data ? data.country : null}
            label="Country"
            inputType={this.props.manualInputType}
            labelStyle={this.props.manualInputLabelStyle}
            inputContainerStyle={this.props.manualInputContainerStyle}
            placeholder="Country"
            onChangeText={(value) => this._updateData('country', value)}
          />
        )}
        {this.props.showCountryPicker && (
          <View style={styles.countryPickerContainer}>
            <Text style={this.props.manualInputLabelStyle}>Country</Text>
            <PickerField
              pickerContainerStyle={this.props.manualInputContainerStyle}
              value={data.country_short}
              items={[{ label: 'Country', value: null }, ...Countries.all()]}
              onValueChange={(selected) => {
                let country = Countries.getCountry(selected);
                this._updateData('country', country);
                this._updateData('country_short', selected);
              }}
            />
          </View>
        )}
        {!this.props.showPostalCode && (
          <TextField
            ref={(tfPostalCode) => (this.tfPostalCode = tfPostalCode)}
            value={data ? data.postal_code : null}
            label="Postal Code"
            inputType={this.props.manualInputType}
            labelStyle={this.props.manualInputLabelStyle}
            inputContainerStyle={this.props.manualInputContainerStyle}
            placeholder="Postal Code"
            onChangeText={(value) => this._updateData('postal_code', value)}
          />
        )}
      </>
    );
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerHeight]}>
        {this._renderManualAddressContainer()}
        {!this.state.showManualAddress && (
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
            renderRightButton={() => <View style={styles.rightButton} />}
          />
        )}
        {this.errorMessage()}
      </View>
    );
  }
}

LocationSearch.propTypes = {
  /**
   * Object used to set the location.
   */
  data: PropTypes.object,

  /**
   * Bottom border color of the input when the input has focus.
   */
  underlineColor: PropTypes.string,

  /**
   * Default is true. If set as false change to manual address button will not show.
   */
  manualAddress: PropTypes.bool,

  /**
   * Default is false. If set as true autocomplete input will not show. Gmaps key is not required for this.
   */
  manualAddressOnly: PropTypes.bool,

  /**
   * GMaps key is required. See https://developers.google.com/maps/documentation/places/web-service/get-api-key/ to get your key.
   */
  gmapsKey: PropTypes.string,

  /**
   * When an address is entered the full address will return.
   */
  onPlaceSelected: PropTypes.func,

  /**
   * Show postal code or zip code input field.
   */
  showPostalCode: PropTypes.bool,
};

LocationSearch.defaultProps = {
  underlineColor: 'black',
  manualAddress: true,
  manualAddressOnly: false,
  showCountryPicker: false,
  showPostalCode: false,
  value: '',
};

const styles = {
  container: {
    width: '100%',
    flex: 1,
    marginBottom: -10,
  },
  pickerContainer: {
    marginTop: 10,
    height: 50,
    borderColor: 'lightgray',
    borderRadius: 0,
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
  errorText: { marginBottom: 10, color: 'red', marginLeft: 10, marginTop: 5 },
  manualAddressButtonStyle: { marginTop: 10 },
  countryPickerContainer: { marginVertical: 20 },
  countryValueStyle: (country_short) => ({
    fontSize: 17,
    color: country_short ? 'black' : '#999999',
    marginLeft: 0,
  }),
};
