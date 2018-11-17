import React from 'react';

import { Link } from 'react-router-dom';
import withTheme from 'utils/withTheme';
import styled from 'styled-components';

class Breadcrumbs extends React.PureComponent {

    /**
     * @todo: da rivedere la composizione del to 
     */
    renderBreadcrumb(breadcrumb, i, separator) {
        
        let element;
        const Item = this.props.themedComponents.item
        const ActiveItem = this.props.themedComponents.activeItem
        const Separator = this.props.themedComponents.separator

        if (breadcrumb.path) {
            const to = `/form${breadcrumb.path !== 'structure' ? '?screen='+breadcrumb.path : ''}`
            element = <Item><Link to={to}>{breadcrumb.label}</Link></Item>
        } else {
            element = <ActiveItem>{breadcrumb.label}</ActiveItem>
        }

        return (
            <React.Fragment key={i}>
                {element}
                {separator && <Separator/>}
            </React.Fragment>
            )
    }

    render() {
        const Breadcrumb = this.props.themedComponents.breadcrumb

        const breadcrumbs =  this.props.breadcrumbs.map((breadcrumb, i) => {
            return this.renderBreadcrumb(breadcrumb, i, i < this.props.breadcrumbs.length - 1)
        })

        return <Breadcrumb>{breadcrumbs}</Breadcrumb>
    }

}

const defaultComponents = { 
    breadcrumb : styled.div`
    `,

    item: styled.span`
    `,

    activeItem: styled.span`
    `,

    separator: class extends React.Component {
        render() {
            return (
            <span> > </span>
            )
        }
    }
}

export default withTheme(Breadcrumbs, defaultComponents)