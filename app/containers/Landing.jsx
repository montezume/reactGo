import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Scroll, { Link, Element } from 'react-scroll';
// import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import { FormattedDate, FormattedMessage } from 'react-intl';
import classNames from 'classnames/bind';
import VideoHero from '../components/VideoHero';
import Testimonial from '../components/Testimonial';
import styles from '../css/components/landing';
import videoUrl from '../videos/bg.mp4';
import videoPoster from '../videos/bg.jpg';

const cx = classNames.bind(styles);

class Landing extends Component {
  render() {
    const date = new Date();
    const testimonials = [
      {
        name: 'John F',
        image: 'assets/images/testimonials/man.jpg',
        description: [
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        ]
      },
      {
        name: 'Marie',
        image: 'assets/images/testimonials/happy.jpg',
        description: [
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        ]
      }
    ];
    const videos = [{
      url: videoUrl,
      poster: videoPoster
    }];

    const { user } = this.props;

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
                  <svg height="80" width="80">
                    <circle cx="40" cy="40" r="35" strokeWidth="3" fill="none" />
                    <polyline points="15,30 35,50 55,30" strokeWidth="3" fill="none" />
                    <polyline points="25,30 45,50 65,30" strokeWidth="3" fill="none" />
                  </svg>
                </Link>
              </Col>
            </Row>
          </Grid>
        </VideoHero>
        <Element name="intro" id="intro" className={cx('section')}>
          <Paper className={cx('paper')} zDepth={2}>
            <h2><FormattedMessage id="landing.testimonials.title" /></h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            {testimonials && testimonials.map((testimonial, index) => (
              <Testimonial key={index} testimonial={testimonial} locale={user.locale === 'en' ? 0 : 1} offset={index % 2} />
              )
            )}
          </Paper>
        </Element>
        <Element name="go">
          <Grid className={cx('intro')}>
            <Row center={'xs'}>
              <Col xs={12} md={10} mdOffset={0} lg={10}>
                <h2><FormattedMessage id="landing.date.title" /></h2>
                <DatePicker defaultDate={date} id="test" hintText="Portrait Dialog" />
              </Col>

              <Col xs={12}>
                <span>The next Wednesday is ... </span>
                <FormattedDate
                  value={new Date(1459832991883)}
                  year="numeric"
                  month="long"
                  weekday="long"
                  day="2-digit"
                />
              </Col>
            </Row>
          </Grid>
        </Element>
      </div>
    );
  }
}

Landing.propTypes = {
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { })(Landing);
