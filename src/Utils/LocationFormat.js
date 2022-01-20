export default class LocationFormat {
  static fullAddress(location, format = false) {
    let fullAddress = location.line_1;
    let cityState = '';
    if (location?.line_2) {
      fullAddress += format
        ? '\n'
        : ' ' + location.line_2 + format
        ? ',\n'
        : ', ';
    }
    if (location?.line_3) {
      fullAddress += location.line_3 + format ? ',\n' : ', ';
    }
    if (location.city === location.state) {
      cityState = location.city;
    } else {
      cityState = location.city + format ? ',\n' : ', ' + location.state;
    }
    fullAddress += format ? '\n' : ' ' + cityState;
    if (location?.postal_code) {
      fullAddress += format ? '\n' : ' ' + location.postal_code;
    }
    return fullAddress;
  }

  static getAddress(data) {
    let location = {
      line_1: data.line_1,
      city: data.city,
      country: data.country,
      state: data.state,
      country_short: data.countryShort,
      longitude: data.longitude,
      latitude: data.latitude,
    };
    if (data?.line_2) {
      location.line_2 = data.line_2;
    }
    if (data?.line_3) {
      location.line_3 = data.line_3;
    }
    if (data?.postal_code) {
      location.postal_code = data.postal_code;
    }
    return location;
  }
}
