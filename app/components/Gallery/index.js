import React from 'react'

export default class Gallery extends React.Component {

    render() {
        return <div onClick={() =>this.showMsg('pippo')}>Ciao {this.props.name}</div>
    }

    showMsg(text){
        alert(text);
    }
}