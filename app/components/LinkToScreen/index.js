import React from 'react';
import { Link } from 'react-router-dom';

export default class LinkToScreen extends React.PureComponent {

    render() {
        return <Link to={`/form?screen=${this.props.name}`}>{this.props.text}</Link>
    }

}