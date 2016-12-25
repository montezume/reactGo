import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { injectIntl, intlShape, FormattedMessage, FormattedDate } from 'react-intl';
import DatePicker from 'material-ui/DatePicker';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from 'css/components/date';
import areIntlLocalesSupported from 'intl-locales-supported';

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/fr');
  require('intl/locale-data/jsonp/fa-IR');
}


const cx = classNames.bind(styles);

class DateSelector extends Component {
  constructor(props) {
    super(props);
    this.selectDate = this.selectDate.bind(this);
    this.determineNextWednesday = this.determineNextWednesday.bind(this);

    const currentDate = new Date();
    this.state = {
      dateSelected: currentDate,
      nextWednesday: this.determineNextWednesday(currentDate)
    };
  }

  determineNextWednesday(date) {
    const d = new Date(date.getTime());
    if (d.getDay() !== 3) {
      d.setDate(d.getDate() + (3+(7-d.getDay())) % 7);
    } else {
      d.setDate(d.getDate() + (10+(14-d.getDay())) % 14);
    }
    return d;
  }

  selectDate(evt, date) {
    this.setState(
      {
        dateSelected: date,
        nextWednesday: this.determineNextWednesday(date)
      }
    );
  }

  render() {
    const { dateSelected, nextWednesday } = this.state;
    const { locale, intl } = this.props;
    const { messages } = intl;
    return (
      <div className={cx('date')}>
        <Row middle={'sm'} center={'xs'}>
          <Col xs={12} sm={4}>
            <DatePicker
              autoOk
              id="my-datepicker"
              onChange={this.selectDate}
              firstDayOfWeek={0}
              DateTimeFormat={DateTimeFormat}
              locale={locale}
              style={{width: '100%', margin: '0 0.75rem'}}
              textFieldStyle={{width: '100%'}}
              floatingLabelText={messages['landing.date.title']}
              defaultDate={dateSelected}
            />
          </Col>
          <Col xs={12} sm={8}>
            <p className={cx('next')}>
              <FormattedMessage id="landing.date.phrase" />
              <span> </span>
              <FormattedDate
                weekday="long"
                year="numeric"
                month="long"
                day="2-digit"
                value={nextWednesday}
                />
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

DateSelector.propTypes = {
  intl: intlShape.isRequired,
  locale: PropTypes.string.isRequired
};


export default injectIntl(DateSelector);