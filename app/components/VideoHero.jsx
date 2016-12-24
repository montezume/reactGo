import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames/bind';
import styles from 'css/components/video-hero';

const cx = classNames.bind(styles);

class VideoHero extends Component {
  constructor() {
    super();
    this.node = null;
    this.handleUpdatePosition = this.handleUpdatePosition.bind(this);
    this.isScrolledIntoView = this.isScrolledIntoView.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.setInitialBackgroundStyles = this.setInitialBackgroundStyles.bind(this);
    this.windowHeight = 0;
    this.onWindowResize = this.onWindowResize.bind(this);

    this.state = {
      mounted: false,
      videoPosition: 0
    };
    this.timestamp = Date.now();
  }

  componentDidMount() {
    this.setState({ mounted: true }); //eslint-disable-line
    this.node = findDOMNode(this);
    const { videos, parallax } = this.props;
    const video = this.video;
    this.windowHeight = this.getWindowHeight();
    video.onended = () => {
      const newPosition = this.state.videoPosition >= (videos.length - 1) ? 0 : this.state.videoPosition + 1;
      this.setState({videoPosition: newPosition});
    };

    if (parallax) {
      document.addEventListener('scroll', this.onScroll, false);
      window.addEventListener('resize', this.onWindowResize, false);
    }

    // this.setInitialBackgroundStyles();
  }

  onWindowResize() {
		this.windowHeight = this.getWindowHeight();
		this.handleUpdatePosition();
	}

  onScroll() {
    const stamp = Date.now();
    if (stamp - this.timestamp >= 10 && this.isScrolledIntoView(this.node)) {
      window.requestAnimationFrame(this.handleUpdatePosition);
      this.timestamp = stamp;
    }
  }

  getWindowHeight() {
      const w = window;
      const d = document;
      const e = d.documentElement;
      const g = d.getElementsByTagName('body')[0];
      return w.innerHeight || e.clientHeight || g.clientHeight;
}

  handleUpdatePosition() {
    const content = this.content;
    this.contentHeight = content.getBoundingClientRect().height;
    this.contentWidth = this.node.getBoundingClientRect().width;

    // update scroll position
		const rect = this.node.getBoundingClientRect();
		if (rect) {
			this.handleSetImagePosition(rect.top, false);
		}
  }

  handleSetImagePosition(top, autoHeight = true) {
    let backPos = 0;
    if (this.props.disabled !== true) {
      backPos = Math.floor(((top + this.contentHeight) / this.windowHeight) * this.props.strength);
   }
    const height = autoHeight ? 'auto' : Math.floor(this.contentHeight + this.props.strength) + 'px';
    const width = !autoHeight ? 'auto' : this.contentWidth + 'px';

    this.video.style.WebkitTransform = 'translate3d(-50%, -' + backPos + 'px, 0)';
    this.video.style.transform = 'translate3d(-50%, -' + backPos + 'px, 0)';
    this.video.style.height = height;
    this.video.style.width = width;

    if (this.props.blur) {
      this.video.style.WebkitFilter = 'blur(' + this.props.blur + 'px)';
      this.video.style.filter = 'blur(' + this.props.blur + 'px)';
    }
  }
  isScrolledIntoView(element) {
		const elementTop = element.getBoundingClientRect().top;
		const elementBottom = element.getBoundingClientRect().bottom;
		return elementTop <= 0 && elementBottom >= 0 ||
				elementTop >= 0 && elementBottom <= window.innerHeight ||
				elementTop <= window.innerHeight && elementBottom >= window.innerHeight;
	}

  setInitialBackgroundStyles() {
  if (this.video) {
    this.video.style.WebkitTransformStyle = 'preserve-3d';
    this.video.style.WebkitBackfaceVisibility = 'hidden';
    this.video.style.MozBackfaceVisibility = 'hidden';
    this.video.style.MsBackfaceVisibility = 'hidden';
  }
}

  render() {
    const { videos, children, muted } = this.props;
    let currentVideo = {};
    let videoCtn = (
      <div className={cx('vid-container')}>
        <video
          src={currentVideo.url}
          type="video"
          ref={(ref) => { this.video = ref; }}
          poster={currentVideo.poster}
          muted={muted}
          loop
          autoPlay
          />
      </div>
    );
    if (this.state && this.state.mounted && videos.length > 1) {
      currentVideo = videos[this.state.videoPosition];
      videoCtn = (
        <div className={cx('vid-container')}>
          <video
            src={currentVideo.url}
            type="video"
            ref={(ref) => { this.video = ref; }}
            poster={currentVideo.poster}
            muted={muted}
            autoPlay
            />
      </div>
      );
    }
    if (this.state && this.state.mounted && videos.length === 1) {
      currentVideo = videos[this.state.videoPosition];
      videoCtn = (
        <div className={cx('vid-container')}>
          <video
            src={currentVideo.url}
            type="video"
            ref={(ref) => { this.video = ref; }}
            poster={currentVideo.poster}
            muted={muted}
            loop
            autoPlay
            />
        </div>
      );
    }


    return (
      <div className={cx('video')} ref={(ref) => { this.content = ref; }}>
        <div className={cx('video-container')}>
          {children}
        </div>
        {videoCtn}
      </div>
    );
  }
}

VideoHero.defaultProps = {
  opacity: 1,
  muted: true,
  parallax: false,
  strength: 400
};

export default VideoHero;
