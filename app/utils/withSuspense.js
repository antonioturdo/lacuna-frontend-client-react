import React, {Suspense} from 'react';

const withSuspense = (Component) => {

  return class extends React.Component {
    render() {
      return (
        <Suspense fallback={null}>
          <Component {...this.props}>
            {this.props.children}
          </Component>
        </Suspense>
      )
    }
  }
}

export default withSuspense;