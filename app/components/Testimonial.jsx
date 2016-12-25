import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from 'css/components/testimonial';
const cx = classNames.bind(styles);

const Testimonial = ({testimonial, offset, locale}) => {
  const style = {
    backgroundImage: `url('${testimonial.image}')`
  };

  if (!offset) {
    return (
      <div className={cx('testimonial')}>
        <Row middle={'sm'}>
          <Col xs={12} sm={6} lg={4}>
            <div className={cx('user-image')}>
              <span>{testimonial.name}</span>
              <div className={cx('user-icon')} style={style} />
            </div>
          </Col>
          <Col xs={12} sm={6} lg={8}>
            <p>{testimonial.description[locale]}</p>
          </Col>
        </Row>
      </div>
    );
    }
    return (
      <div className={cx('testimonial')}>
        <Row middle={'sm'}>
          <Col xs={12} sm={6} lg={8}>
            <p>{testimonial.description[locale]}</p>
          </Col>
          <Col xs={12} sm={6} lg={4}>
            <div className={cx('user-image')}>
              <span>{testimonial.name}</span>
              <div className={cx('user-icon')} style={style} />
            </div>
          </Col>
        </Row>
      </div>
    );
};

export default Testimonial;
