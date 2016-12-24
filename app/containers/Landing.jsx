import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Scroll, { Link, Element } from 'react-scroll';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames/bind';
import VideoHero from '../components/VideoHero';
import styles from '../css/components/landing';
import videoUrl from '../videos/bg.mp4';

const cx = classNames.bind(styles);

class Landing extends Component {

  render() {
    const videos = [{
      url: videoUrl
    }];
    return (
      <div className={cx('landing')}>
        <VideoHero className={cx('video-hero')} videos={videos}>
          <Grid className={cx('full-height')}>
            <Row className={cx('full-height')} middle={'xs'} center={'xs'}>
              <Col xs={12} md={10} mdOffset={0} lg={10}>
                <h1>
                  <span className={cx('leader')}>
                    <FormattedMessage id="landing.header.leader" />
                  </span>
                  <FormattedMessage id="landing.header.title" />
                </h1>
                <Link to="intro" activeClass="active" spy smooth offset={0} duration={500} className={cx('down-arrow')}>
                  <svg height="70" width="70">
                    <circle cx="35" cy="35" r="30" strokeWidth="3" fill="none" />
                    <polyline points="15,25 35,50 55,25" strokeWidth="3" fill="none" />
                  </svg>
                </Link>
              </Col>
            </Row>
          </Grid>
        </VideoHero>
        <Element name="intro" id="intro">
          <Grid className={cx('intro')}>
            <Row center={'xs'}>
              <Col xs={12} md={10} mdOffset={0} lg={10}>
                <Paper className={cx('paper')} rounded={false} zDepth={2}>
                  <h2>Test</h2>
                    <DatePicker id="test" hintText="Portrait Dialog" />
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Paper>
              </Col>
            </Row>
          </Grid>
        </Element>
        <Element>
          Test
        </Element>

      </div>
    );
  }
}

Landing.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { })(Landing);
