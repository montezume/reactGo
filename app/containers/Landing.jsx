import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Scroll, { Link, Element } from 'react-scroll';
// import Paper from 'material-ui/Paper';
import Paper from 'material-ui/Paper';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames/bind';
import VideoHero from '../components/VideoHero';
import Testimonial from '../components/Testimonial';
import DateSelector from '../components/DateSelector';
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
          'I was very confused, and ended up missing an important team event because of an ambiguity of dates. Thanks to \'When Is Wednesday\', I never missed an event again!',
          'J\'étais tellement confuser à cause de un collegue qui ne sait pas comment dire les dates. Après avoir utiliser \'When Is Wednesday\', j\'ai jamais eu une autre problème!'
        ]
      },
      {
        name: 'Marie',
        image: 'assets/images/testimonials/happy.jpg',
        description: [
          'I can\'t stand it when people don\'t follow the proper stand for dates, so \'When Is Wednesday\' saved my life!',
          'J\'haie quand le monde utilisent les dates d\'une facon incorrect, alors \'When Is Wednesday\' a sauvé ma vie!',
        ]
      },
      {
        name: 'Lauren H',
        image: 'assets/images/testimonials/girl_upset.jpg',
        description: [
          'I was fired due to mistaking this wednesday for next wednesday. I just hope I remember to use \'When Is Wednesday\' during my next job.',
          'J\'ai été viré en raison de la confusion ce mercredi pour mercredi prochain. J\'espère juste que je me souviens d\'utiliser \'When Is Wednesday\' lors de mon prochain emploi.'
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
          <Row center={'sm'}>
            <Col xs={12} sm={10} md={9} lg={8}>
              <Paper className={cx('paper')} zDepth={2}>
                <h2><FormattedMessage id="landing.testimonials.title" /></h2>
                <p><FormattedMessage id="landing.testimonials.description" /></p>
                {testimonials && testimonials.map((testimonial, index) => (
                  <Testimonial key={index} testimonial={testimonial} locale={user.locale === 'en' ? 0 : 1} offset={index % 2} />
                  )
                )}
              </Paper>
            </Col>
          </Row>
        </Element>
        <Element name="select-date" className={cx('section')}>
          <Row center={'sm'}>
            <Col xs={12} sm={10} md={9} lg={8}>
              <Paper className={cx('paper')} zDepth={2}>
                <h2><FormattedMessage id="landing.date.title" /></h2>
                <p><FormattedMessage id="landing.date.description" /></p>
                <DateSelector />
              </Paper>
            </Col>
          </Row>
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
