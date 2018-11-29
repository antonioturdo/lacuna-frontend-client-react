import React from 'react';
import { Link } from 'react-router-dom';

export default class LinkToScreen extends React.PureComponent {

    render() {
        const to = `/form/${this.props.formId}?screen=${this.props.name}`
        return <Link to={to}>{this.props.text}</Link>
    }

}