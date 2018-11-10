import ThemeContext from '../themeContext'
import React from 'react';

const withTheme = (Component, defaultComponents) => {

  return class extends React.Component {

    static contextType = ThemeContext;

    constructor() {
        super()
    }

    render() {
      const themedComponents = {...defaultComponents, ...this.context[Component.name]}

      return (
        <Component {...this.props} themedComponents={themedComponents}>
          {this.props.children}
        </Component>
      )
    }
  }
}

export default withTheme;