import moment from 'moment';

export default class DateTime {
  static isoString(date, format) {
    if (!format) {
      format = 'DD MMM YYYY';
    }
    let isoString = moment(date, format);
    return isoString.format();
  }

  static createDateTime(date, time, format) {
    if (!format) {
      format = 'DD MMM YYYY HH:mm';
    }
    return moment(date + ' ' + time, format);
  }

  static formatDateTime(date) {
    return moment(date).format('Do MMM YYYY, h:mm a');
  }

  static displayDate(date) {
    return moment(date).format('Do MMM YYYY');
  }

  static displayDateNoYear(date) {
    return moment(date).format('Do MMM');
  }

  static displayTime(date) {
    return moment(date).format('h:mm a');
  }

  static startOf(date) {
    return moment(date).startOf('day');
  }

  static endOf(date) {
    return moment(date).endOf('day');
  }

  static isSameDay(firstDay, secondDay) {
    return firstDay.isSame(secondDay, 'day');
  }

  static isToday(date) {
    return DateTime.now().isSame(date, 'day');
  }

  static isTomorrow(date) {
    return DateTime.tomorrow().isSame(date, 'day');
  }

  static timeSince(date) {
    let date_visited = new Date(date);
    let date_now = new Date();

    let seconds = Math.floor((date_now - date_visited) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours = hours - days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

    let timeSince = '';
    if (hours > 0) {
      return '+60 mins';
    }
    if (minutes > 0) {
      timeSince += minutes + 'm ';
    }
    timeSince += seconds + 's';
    return timeSince;
  }
}
