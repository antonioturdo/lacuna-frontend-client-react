import ComponentLoader from './ComponentLoader'

class FormParser {

    /** 
     * Retrieve component info in a form component subtree. 
     * Object passed must have only a key, the component name
    */
    static parseComponent(formComponentSubtree) {
        const componentName = Object.keys(formComponentSubtree)[0]
        const componentObject = formComponentSubtree[componentName]

        const component = ComponentLoader.getComponent(componentObject.component)
        const props = componentObject.parameters || {}
        const children = componentObject.children || []
        
        return {componentName, component, props, children}
    }

    /** 
     * Check if a screen should have a submit button to save data.
     * Object passed must have only a key, the screen component name
    */
    static hasScreenData(formScreenSubtree) {
        const {componentName, component, props, children} = FormParser.parseComponent(formScreenSubtree)

        if (component.definition.has_data) {
            return true
        }

        if (component.definition.break_rendering) {
            return false
        }

        for (const child of children) {
            if (FormParser.hasScreenData(child)) {
                return true
            }
        }

        return false
    }    
}

export default FormParser;