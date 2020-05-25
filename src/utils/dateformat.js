var dateformat = require('dateformat');

class DateUtils {
  dateToString = function (date, format) {
    if (typeof date_open != 'string') return dateformat(date, format);
    return date;
  };

  subtractDates = function (date1, date2) {
    return Math.abs(date2 - date1) / 1000 / 60 / 60 / 24;
  };

  convertDaysAsMillis = function (days) {
    return days * 24 * 60 * 60 * 1000;
  };

  getDateAddingDays(add_days, date = new Date()) {
    let millis_duration = this.convertDaysAsMillis(add_days);
    return new Date(date.getTime() + millis_duration);
  }
}

module.exports = new DateUtils();
