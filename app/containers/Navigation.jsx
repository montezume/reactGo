import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { setUserLanguage } from '../actions/users';
import styles from '../css/components/navigation';

const cx = classNames.bind(styles);

const Navigation = ({ user, setUserLanguage }) => {
  const currentLocale = user.locale;
  const nextLocale = currentLocale === 'en' ? 'fr' : 'en';
    return (
      <nav className={cx('navigation')} role="navigation">
        <button className={cx('change-language', 'right')} onClick={() => setUserLanguage(nextLocale)}>
          <div className={cx('svg-wrapper')}>
            <svg height="60" width="60" xmlns="http://www.w3.org/2000/svg">
              <line className={cx('shape')} x1="0" y1="60" x2="60" y2="60" />
            </svg>
            <div className={cx('text')}>{nextLocale}</div>
          </div>
        </button>
      </nav>
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  setUserLanguage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { setUserLanguage })(Navigation);
