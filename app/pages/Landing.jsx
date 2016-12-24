import React, { Component, PropTypes } from 'react';
import Page from 'pages/Page';
import LandingContainer from 'containers/Landing';

class Landing extends Component {
  render() {
    return (
      <Page {...this.getMetaData()}>
        <LandingContainer {...this.props} />
      </Page>
    );
  }

  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Home | When Is?';
  }

  pageMeta() {
    return [
      { name: "description", content: "Bleh" }
    ];
  }

  pageLink() {
    return [];
  }
}

export default Landing;
