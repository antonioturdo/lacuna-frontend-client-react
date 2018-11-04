import React from 'react';

export default class Screen extends React.PureComponent {

    render() {
        return <div>
            <h2>{this.props.title}</h2>
            {this.props.children}
        </div>
    }

}