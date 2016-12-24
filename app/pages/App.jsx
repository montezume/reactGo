import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import Page from 'pages/Page';
import AppContainer from 'containers/App';
import { title, meta, link } from 'config/headAssets';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
addLocaleData([...en, ...fr]);

const App = (props) => {
  const { user, intl } = props;
  const htmlAttributes = { lang: user.locale, amp: undefined };
  const muiTheme = getMuiTheme({
    palette: {
    },
  }, {
    avatar: {
      borderColor: null,
    },
    userAgent: user.userAgent
  });

  return (
    <IntlProvider key={user.locale} messages={intl.messages[user.locale]} locale={user.locale}>
      <Page title={title} htmlAttributes={htmlAttributes} meta={meta} link={link}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppContainer {...props} />
        </MuiThemeProvider>
      </Page>
    </IntlProvider>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
    intl: state.intl
  };
}

export default connect(mapStateToProps, { })(App);
