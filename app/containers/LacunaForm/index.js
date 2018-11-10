import React from 'react';

import ScreenFinder from 'services/ScreenFinder'
import FormParser from 'services/FormParser'

import json from './definition.json'

import Breadcrumbs from './Breadcrumbs'
import SaveButton from './SaveButton'

////////////
import ThemeContext from 'themeContext'

const queryString = require('query-string');
const parsed = queryString.parse(location.search);

import theme_a from 'themes/theme_a'

const theme = Object.prototype.hasOwnProperty.call(parsed,'theme') && parsed.theme === 'red' ? theme_a : {}
/////////////

export default class LacunaForm extends React.PureComponent {
    constructor() {
        super()
        
        let state = ScreenFinder.findByQuery(json)
        state.theme = {}
        this.state = state
    }

    componentDidMount() {
        this.setState((state) => {theme: theme_a})
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
            <ThemeContext.Provider value={this.state.theme}>
                <Breadcrumbs breadcrumbs={this.state.breadcrumbs}></Breadcrumbs>
                {this.renderComponent(this.state.screen)}
                {this.state.hasData && <SaveButton onSave={this.onSave}></SaveButton>}
            </ThemeContext.Provider>
        )
    }

}