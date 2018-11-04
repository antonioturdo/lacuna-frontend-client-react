import React from 'react';

import { Link } from 'react-router-dom';

export default class Breadcrumbs extends React.PureComponent {

    /**
     * @todo: da rivedere la composizione del to 
     */
    renderBreadcrumb(breadcrumb, i, separator) {
        let element;

        if (breadcrumb.path) {
            const to = `/form${breadcrumb.path !== 'structure' ? '?screen='+breadcrumb.path : ''}`
            element = <Link to={to}>{breadcrumb.label}</Link>
        } else {
            element = <span>{breadcrumb.label}</span>
        }

        return (
            <React.Fragment key={i}>
                {element}
                {separator && <span> > </span>}
            </React.Fragment>
            )
    }

    render() {
        const breadcrumbs =  this.props.breadcrumbs.map((breadcrumb, i) => {
            return this.renderBreadcrumb(breadcrumb, i, i < this.props.breadcrumbs.length - 1)
        })

        return <div>{breadcrumbs}</div>
    }

}