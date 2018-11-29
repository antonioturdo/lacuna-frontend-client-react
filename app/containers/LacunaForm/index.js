import React from 'react';

import ThemeContext from 'themeContext'

import ScreenFinder from 'services/ScreenFinder'
import FormParser from 'services/FormParser'
import ThemeLoader from 'services/ThemeLoader'
import DataHandler from 'services/DataHandler'
import LacunApi from 'services/LacunaApi'

import Breadcrumbs from './Breadcrumbs'
import StatusBar from './StatusBar'

import update from 'immutability-helper'
import Loader from 'components/Loader'

export default class LacunaForm extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            formId: this.props.match.params.id,
            loading: true,
            definition: null,
            data: {},
            screen: null, 
            theme : {},
            modificationsToSave: false,
            updateInProgress: false,
            lastUpdate: null,
            pulse: 0
        }

        this.updateInterval = null
    }

    componentDidMount() {
        LacunApi.getForm(this.state.formId)
        .then(form => {
            const screen = ScreenFinder.findByQuery(form.definition)
            const lastUpdate = new Date(form.update_date);
            this.setState( { 
                loading: false, 
                definition: form.definition,
                data: form.data, 
                screen,
                lastUpdate 
            })

            if (form.definition.hasOwnProperty('theme')) {
                ThemeLoader.dymamicLoad(form.definition.theme)
                .then((theme) => this.setState({theme: theme.default}))                
            }

            const interval = 10

            this.updateInterval = setInterval(() => {
                this.setState((prevState) => {return {pulse: prevState.pulse + 1}})
            }, interval * 1000)            
        })
    }

    componentWillUnmount() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.onScreenChange()
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        // console.log(snapshot)    
    }

    onScreenChange = () => {
        if (this.state.definition != null) {
            this.setState({screen: ScreenFinder.findByQuery(this.state.definition)})    
        }
    }

    onDataChange = (fullPath, data) => {
        const objectData = DataHandler.setByPath({}, fullPath, {"$set": data})
        const newData = update(this.state.data, objectData)   
        this.setState({data: newData, modificationsToSave: true})
    }

    renderComponent(object, parentName = null) {
        const {componentName, component, props, children} = FormParser.parseComponent(object)

        let name 
        if (parentName === null && this.state.screen.screenName === null) {
            // just for the root
            name = ''
        } else {
            name = parentName ?  `${parentName}.${componentName}` : componentName
        }

        const ComponentToRender = component.implementation
        const childrenToRender = component.definition.break_rendering ? null : children.map((child) => this.renderComponent(child, name))

        const fullName = `${this.state.screen.screenName ? this.state.screen.screenName + '.' : ''}${name}`

        const data = DataHandler.getByPath(this.state.data, fullName)
        return (
            <ComponentToRender
                formId={this.state.formId} 
                key={componentName} 
                {...props} 
                name={fullName}
                data={data} 
                onDataChange={this.onDataChange}>
                    {childrenToRender}
            </ComponentToRender>
        );
    }

    onSave = () => {
        // this.props.history.push('/form/'+this.state.formId)
        this.setState({updateInProgress: true})
        LacunApi.saveFormData(this.state.formId, this.state.data)
        .then((success) => {
            this.setState({modificationsToSave: false, updateInProgress: false, lastUpdate: new Date()})
        })
        .catch((error) => {
            this.setState({updateInProgress: false})
        })
    }

    renderFormContent() {
        return (
            <React.Fragment>
                <Breadcrumbs breadcrumbs={this.state.screen.breadcrumbs} formId={this.state.formId}></Breadcrumbs>
                {this.renderComponent(this.state.screen.screen)}
                <StatusBar 
                    onSave={this.onSave} 
                    modificationsToSave={this.state.modificationsToSave} 
                    updateInProgress={this.state.updateInProgress} 
                    lastUpdate={this.state.lastUpdate}/>
            </React.Fragment>
        )
    }

    render() {
        return (
            <ThemeContext.Provider value={this.state.theme}>
                {this.state.loading ? <Loader/> : this.renderFormContent()}
            </ThemeContext.Provider>
        )
    }

}