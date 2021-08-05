import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  ViewPropTypes,
  StyleSheet,
} from 'react-native';
import Text from 'react-native-text';
import Separator from '../Separators/Separator';

import moment from 'moment';

import DateTimePicker from 'react-native-modal-datetime-picker';

import PropTypes from 'prop-types';

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.dateFormat = this._getFormat(props.mode);
    this.state = {
      mode: props.mode,
      time: moment(props.date).format(this.dateFormat),
      date: moment(props.date).toDate(),
      minimumDate: props.minimumDate
        ? props.minimumDate
        : moment(new Date()).add(-100, 'years').toDate(),
      maximumDate: props.maximumDate
        ? props.maximumDate
        : moment(new Date()).add(100, 'years').toDate(),
      isVisible: false,
    };
  }

  isValid() {
    if (!this.state.date) {
      this.setState({ error: 'Required Field', showError: true });
      return false;
    }
    this.setState({ showError: false });
    return true;
  }

  _getFormat(mode) {
    switch (mode) {
      case 'datetime':
        return 'HH:mm, DD MMM YY';
      case 'date':
        return 'DD-MMM-YYYY';
      case 'time':
        return 'HH:mm';
      case 'countdown':
        return 'HH:mm';
      default:
    }
  }

  _showDateTimePicker() {
    this.setState({ isVisible: true });
  }

  _hideDateTimePicker() {
    this.setState({ isVisible: false });
  }

  _handleDatePicked = (date) => {
    this._hideDateTimePicker();
    const time = moment(date).format(this.dateFormat);
    this.setState({ time, date });
    this.props.onChange(date);
  };

  render() {
    return (
      <View style={this.props.containerStyle}>
        <TouchableOpacity onPress={() => this._showDateTimePicker()}>
          <View style={this.props.pickerContainerStyle}>
            <Text style={[styles.textStyle, this.props.textStyle]}>
              {this.state.time}
            </Text>
            <DateTimePicker
              {...this.props}
              isVisible={this.state.isVisible}
              onConfirm={this._handleDatePicked}
              onCancel={() => this._hideDateTimePicker()}
              date={this.state.date}
              minimumDate={this.state.minimumDate}
              maximumDate={this.state.maximumDate}
              is24Hour={true}
              mode={this.state.mode}
            />
          </View>
        </TouchableOpacity>
        <Separator style={styles.separator} />
        {this.state.showError && (
          <Text style={[styles.errorTextStyle, this.props.errorTextStyle]}>
            {this.state.error}
          </Text>
        )}
      </View>
    );
  }
}

DatePicker.propTypes = {
  /**
   * This is called when the user confirm the picked date or time in the UI. The first and only argument is a date or time string representing the new date and time formatted by moment.js with the given format property.
   */
  onChange: PropTypes.func.isRequired,

  /**
   * This can be called to validate the date or time. Will show an error if false is returned.
   */
  isValid: PropTypes.func,

  /**
   * Used to display the modal picker.
   */
  isVisible: PropTypes.bool,

  minimumDate: PropTypes.string,
  maximumDate: PropTypes.string,
  mode: PropTypes.oneOf(['datetime', 'date', 'time', 'countdown']),
  containerStyle: ViewPropTypes.style,
  pickerContainerStyle: ViewPropTypes.style,
};

DatePicker.defaultProps = {
  date: new Date(),
  mode: 'datetime',
  minimumDate: null,
  textColor: 'black',
};

const styles = StyleSheet.create({
  textStyle: (color) => ({ color: color || 'black', fontSize: 20 }),
  errorTextStyle: { color: 'red', marginTop: 5 },
  separator: { marginTop: 0 },
});
