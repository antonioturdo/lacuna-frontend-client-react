import {lazy} from 'react';

import Screen from 'components/Screen'
import withSuspense from 'utils/withSuspense'

import screen from 'components/Screen/screen.json'
import link_to_screen from 'components/LinkToScreen/link_to_screen.json'
import block_input from 'components/BlockInput/block_input.json'
import component from 'components/Component/component.json'

const components = {
    'component': {
        definition: component, 
        implementation: null
    },
    'screen': {
        definition: screen, 
        implementation: Screen
    },
    'vertical_form': {
        definition: {}, 
        implementation: withSuspense(lazy(() => import('components/VerticalForm')))
    },
    'block_input': {
        definition: block_input, 
        implementation: withSuspense(lazy(() => import('components/BlockInput')))
    },
    'screen_list': {
        definition: {}, 
        implementation: withSuspense(lazy(() => import('components/ScreenList')))
    },
    'link_to_screen': {
        definition: link_to_screen, 
        implementation: withSuspense(lazy(() => import('components/LinkToScreen')))
    }
}

class ComponentLoader {
    static getComponentDefinition(component) {  
        // console.log(component)
        console.log(components.hasOwnProperty(component))
        let definition = components[component].definition

        /*if (definition.extends) {
            const extendedDefinition = ComponentLoader.getComponentDefinition(definition.extends)

            let parameters = Array.isArray(definition.parameters) ? definition.parameters : []
            parameters = parameters.concat(Array.isArray(extendedDefinition.parameters) ? extendedDefinition.parameters : [])
            
            // definition = Object.assign(extendedDefinition, definition)
            // definition.parameters = parameters
        }*/

        // console.log(definition)
        
        return definition
    }

    static getComponentImplementation(component) {
        return components[component].implementation
    }    

    static getComponent(component) {
        const definition = ComponentLoader.getComponentDefinition(component)
        const implementation = ComponentLoader.getComponentImplementation(component)
        return {definition, implementation}
    }
}

export default ComponentLoader;