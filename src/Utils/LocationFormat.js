export default class LocationFormat {
  static fullAddress(location) {
    let fullAddress = location.line_1;
    let cityState = '';
    if (location?.line_2) {
      fullAddress += '\n' + location.line_2 + ',\n';
    }
    if (location?.line_3) {
      fullAddress += location.line_3 + ',\n';
    }
    if (location.city === location.state) {
      cityState = location.city;
    } else {
      cityState = location.city + ',\n' + location.state;
    }
    fullAddress += '\n' + cityState;

    if (location?.postal_code) {
      fullAddress += '\n' + location.postal_code;
    }

    return fullAddress;
  }

  static getAddress(data) {
    let location = {
      line_1: data.line_1,
      line_2: data.line_2,
      line_3: data.line_3,
      city: data.city,
      country: data.country,
      state: data.state,
      country_short: data.countryShort,
      longitude: data.longitude,
      latitude: data.latitude,
    };
    if (!location.city) {
      location.city = location.state;
    }
    return location;
  }
}
