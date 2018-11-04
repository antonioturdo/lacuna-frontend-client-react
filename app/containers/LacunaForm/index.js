import React from 'react';

import ScreenFinder from '../../services/ScreenFinder'
import FormParser from '../../services/FormParser'

import json from './definition.json'

import Breadcrumbs from './Breadcrumbs'
import SaveButton from './SaveButton'

export default class LacunaForm extends React.PureComponent {
    constructor() {
        super()
        
        this.state = ScreenFinder.findByQuery(json)
    }

    componentWillReceiveProps() {
        this.setState(ScreenFinder.findByQuery(json))
    }

    renderComponent(object, parentName = null) {
        const {componentName, component, props, children} = FormParser.parseComponent(object)
        
        const name = parentName ? `${parentName}.${componentName}` : componentName
        const ComponentToRender = component.implementation
        const childrenToRender = component.definition.break_rendering ? null : children.map((child) => this.renderComponent(child, name))

        return (
            <ComponentToRender key={componentName} {...props} name={`${this.state.screenName ? this.state.screenName + '.' : ''}${name}`}>{childrenToRender}</ComponentToRender>
        );
    }

    onSave = () => {
        setTimeout(() => {this.props.history.push('/form')}, 300)
    }

    render() {   
        return (
            <>
                <Breadcrumbs breadcrumbs={this.state.breadcrumbs}></Breadcrumbs>
                {this.renderComponent(this.state.screen)}
                {this.state.hasData && <SaveButton onSave={this.onSave}></SaveButton>}
            </>
        )
    }

}