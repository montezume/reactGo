import React, { Component, PropTypes } from 'react';
import Page from 'pages/Page';
import LandingContainer from 'containers/Landing';
import { injectIntl, intlShape } from 'react-intl';

class Landing extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    const { messages } = this.props.intl;
    return messages['site.title'];
  }

  pageMeta() {
    const { messages } = this.props.intl;
    return [
      { name: 'description', content: messages['site.description'] }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <LandingContainer {...this.props} />
      </Page>
    );
  }
}

Landing.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Landing);
