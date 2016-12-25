import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from 'css/components/footer';

const cx = classNames.bind(styles);

const Footer = () => (
  <div className={cx('footer')}>
    <Grid className={cx('full-height')}>
      <Row className={cx('full-height')} center={'xs'} middle={'xs'}>
        <Col xs={12} className={cx('text-center')}>
          <h3><FormattedMessage id="site.title" /></h3>
          <div className={cx('logo')}>
            <svg height="80" width="80">
              <circle cx="40" cy="40" r="35" strokeWidth="3" fill="none" />
              <polyline points="15,30 35,50 55,30" strokeWidth="3" fill="none" />
              <polyline points="25,30 45,50 65,30" strokeWidth="3" fill="none" />
            </svg>
          </div>
          <p><FormattedMessage id="footer.createdBy" /></p>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Footer;
