import ComponentLoader from './ComponentLoader';
import FormParser from './FormParser'

export default class ScreenFinder {

    static findByQuery(form) {
        // temporary workaround to remove _id, _rev, ... 
        form = {structure: form.structure}

        const queryString = require('query-string');
        const parsed = queryString.parse(location.search);
        
        let screenName, screen, breadcrumbs, screenTitle, hasData
        if (parsed.screen) {
            screenName = parsed.screen;
            ({screen, breadcrumbs} = ScreenFinder.findByPath(form, parsed.screen.split('.')))                
        } else {
            screenName = null
            screen = form
            breadcrumbs = []         
        }

        screenTitle = ScreenFinder.getScreenTitle(screen)
        breadcrumbs.push({label: screenTitle})  
        hasData = FormParser.hasScreenData(screen)
        
        return {screenName, screen, breadcrumbs, screenTitle, hasData}
    }
    
    static findByPath(form, path) {
        let screen = form.structure
        let breadcrumbs = []
        let currentPath = ''
        path.forEach((node) => {
            // if the current component is a screen, let's add it to the breadcrumbs
            if (screen.component) {
                const componentDefinition = ComponentLoader.getComponentDefinition(screen.component)
                if (componentDefinition.is_screen) {
                    breadcrumbs.push({label: screen.parameters.title, path: currentPath})    
                }
            }
            
            // update the current path
            currentPath = `${currentPath === '' ? node : `${currentPath}.${node}`}`
            
            // the next component could be just there or in the children, let's find it
            if (screen[node]) {
                screen = screen[node]
            } else if (screen.children) {
                const found = screen.children.find((child) => child[node])
                if (found) {
                    screen = found[node]
                } else {
                    console.log(4)
                }
            } else {
                console.log(3)
            }
        })
        
        // the screen we are looking for is the only children of the found component (tipically a link)
        if (screen.children && screen.children.length == 1) {
            screen = screen.children[0]
            return {screen, breadcrumbs}
        } else {
            console.log(1)
        }
    }
    
    static getScreenTitle(screen) {
        const key = Object.keys(screen)[0]
        const screenObject = screen[key]

        return screenObject.parameters.title;    
    }
}