/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Gallery from 'components/Gallery';
import Menu from 'components/Menu';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  
  render() {
    let component

    let variabile = 1 > 2
    if (variabile) {
      component = <Gallery name="Antonio"></Gallery>
    } else {
      component = <div>Pippo</div>
    }

    return (
      <h1>
        <FormattedMessage {...messages.header} />
        {component}
        <Menu></Menu>
      </h1>
    );
  }
}
