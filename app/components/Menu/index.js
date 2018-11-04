import React from 'react'

export default class Menu extends React.Component {
    constructor() {
        super()
        this.state = {
            menu: []
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                menu: [
                {
                    id: "1",
                    href: "/path1",
                    label: "Home"
                },
                {
                    id: "2",
                    href: "/path2",
                    label: "Chi siamo"
                }
            ]    
            })}
        ,3000)
    }

    render() {

        if (this.state.menu.length === 0) {
            return <div>In caricamento...</div>
        } else {
            const menuToRender = this.state.menu.map((item) => {
                return <a key={item.id} href={item.href}>{item.label}</a>    
            })

            return <React.Fragment>{menuToRender}</React.Fragment>
        }
        
    }
}