import ThemeContext from '../themeContext'
import React from 'react';

const withCustomTheme = (Component, defaultStyle) => {

  return class extends React.Component {

    static contextType = ThemeContext;

    constructor() {
        super()
    }

    render() {
      const themedStyle = {...defaultStyle, ...this.context[Component.name]}
      return (
        <Component {...this.props} themedStyle={themedStyle}>
          {this.props.children}
        </Component>
      )
    }
  }
}

export default withCustomTheme;