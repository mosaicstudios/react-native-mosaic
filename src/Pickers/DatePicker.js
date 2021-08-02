import React, { Component } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';

import moment from 'moment';

import Separator from '../Separators/Separator';

import DateTimePicker from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-datepicker';

import PropTypes from 'prop-types';

type Props = {};
export default class Picker extends Component {
  constructor(props) {
    super(props);
    this.dateFormat =
      props.mode == 'datetime' ? 'HH:mm, DD MMM YY' : 'DD-MMM-YYYY';
    this.state = {
      mode: props.mode,
      value: props.value ? moment(props.value).toDate() : null,
      minimumDate: props.minimumDate
        ? props.minimumDate
        : moment(new Date()).add('years', -100).toDate(),
      maximumDate: props.maximumDate
        ? props.maximumDate
        : moment(new Date()).add('years', 100).toDate(),
      isVisible: false,
      placeholder: props.placeholder,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  isValid() {
    if (!this.state.date) {
      this.setState({ error: 'Required Field', showError: true });
      return false;
    }
    this.setState({ showError: false });
    return true;
  }

  _getFormat() {
    let { mode } = this.state;
    if (mode == 'datetime') {
      return 'HH:mm, DD MMM YY';
    }
    if (mode == 'date') {
      return 'DD MMM YYYY';
    }
    if (mode == 'time') {
      return 'HH:mm';
    }
  }

  render() {
    return (
      <View style={this.props.style}>
        <DatePicker
          style={{ width: '100%' }}
          customStyles={{
            dateInput: {
              alignItems: 'flex-start',
              borderWidth: 0,
            },
            dateText: {
              fontSize: 18,
            },
            placeholderText: {
              fontSize: 18,
              color: 'gray',
            },
          }}
          onOpenModal={() => this.setState({ showError: false })}
          date={this.state.value}
          mode={this.state.mode}
          showIcon={false}
          placeholder={this.state.placeholder}
          format={this._getFormat()}
          minDate={this.state.minimumDate}
          maxDate={this.state.maximumDate}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(value) => this.props.onChange(value)}
        />
        <Separator style={{ marginTop: 0 }} />
        {this.state.showError && (
          <Text style={{ color: 'red', marginTop: 5 }}>{this.state.error}</Text>
        )}
      </View>
    );
  }
}

Picker.propTypes = {
  onChange: PropTypes.func.isRequired,
  minuteInterval: 15,
};

Picker.defaultProps = {
  date: new Date(),
  mode: 'datetime',
  minimumDate: null,
  placeholder: 'Select date',
  textColor: 'black',
};
