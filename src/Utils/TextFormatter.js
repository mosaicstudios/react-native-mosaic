export default class TextFormatter {
  static capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static ellipsis(string) {
    return string + '...';
  }

  static numberWithCommas(value) {
    if (!value) {
      value = 0;
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  static capitalizeCase(string) {
    var splitString = string.toLowerCase().split(' ');
    for (var i = 0; i < splitString.length; i++) {
      splitString[i] =
        splitString[i].charAt(0).toUpperCase() + splitString[i].substring(1);
    }
    return splitString.join(' ');
  }
}
