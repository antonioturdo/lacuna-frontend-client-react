import React from 'react';

import ScreenFinder from 'services/ScreenFinder'
import FormParser from 'services/FormParser'
import ThemeLoader from 'services/ThemeLoader'
import ThemeContext from 'themeContext'
import DataHandler from 'services/DataHandler'

import json from './definition.json'

import Breadcrumbs from './Breadcrumbs'
import SaveButton from './SaveButton'
import StatusBar from './StatusBar'

import update from 'immutability-helper'
import { isThisSecond } from 'date-fns';

export default class LacunaForm extends React.Component {
    constructor() {
        super()
        
        this.state = {
            screen: ScreenFinder.findByQuery(json), 
            theme : {},
            data: {},
            modificationsToSave: false,
            updateInProgress: false,
            lastUpdate: new Date(),
            pulse: 0
        }

        this.updateInterval = null
    }

    componentDidMount() {
        const theme = 'reactstrap_4' // 'theme_a'

        if (theme != null) {
            ThemeLoader.dymamicLoad(theme).then((theme) => {
                this.setState({theme: theme.default})
            })
        }

        const interval = 10

        this.updateInterval = setInterval(() => {
            this.setState((prevState) => {return {pulse: prevState.pulse + 1}})
        }, interval * 1000)
    }

    componentWillUnmount() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval)
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        this.onScreenChange()
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        // console.log(snapshot)    
    }

    onScreenChange = () => {
        this.setState({screen: ScreenFinder.findByQuery(json)})    
    }

    onDataChange = (fullPath, data) => {
        const objectData = DataHandler.setByPath({}, fullPath, {"$set": data})
        const newData = update(this.state.data, objectData)   
        this.setState({data: newData, modificationsToSave: true})
    }

    renderComponent(object, parentName = null) {
        const {componentName, component, props, children} = FormParser.parseComponent(object)
        
        const name = parentName ? `${parentName}.${componentName}` : componentName
        const ComponentToRender = component.implementation
        const childrenToRender = component.definition.break_rendering ? null : children.map((child) => this.renderComponent(child, name))

        const fullName = `${this.state.screen.screenName ? this.state.screen.screenName + '.' : ''}${name}`
        const data = DataHandler.getByPath(this.state.data, fullName)
        return (
            <ComponentToRender 
                key={componentName} 
                {...props} 
                name={fullName}
                initialData="ciccio" 
                data={data} 
                onDataChange={this.onDataChange}>
                    {childrenToRender}
            </ComponentToRender>
        );
    }

    onSave = () => {
        // console.log(JSON.stringify(this.state.data))
        this.props.history.push('/form')
        this.setState({updateInProgress: true})
        setTimeout(() => {
            this.setState({modificationsToSave: false, updateInProgress: false, lastUpdate: new Date()})
        }, 2300)
    }

    render() {   
        return (
            <ThemeContext.Provider value={this.state.theme}>
                <Breadcrumbs breadcrumbs={this.state.screen.breadcrumbs}></Breadcrumbs>
                {this.renderComponent(this.state.screen.screen)}
                <StatusBar 
                    onSave={this.onSave} 
                    modificationsToSave={this.state.modificationsToSave} 
                    updateInProgress={this.state.updateInProgress} 
                    lastUpdate={this.state.lastUpdate}/>
            </ThemeContext.Provider>
        )
    }

}