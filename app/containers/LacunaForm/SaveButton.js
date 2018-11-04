import React from 'react';

export default class SaveButton extends React.PureComponent {

    render() {
        const style = {
            backgroundColor: '#AAA', 
            padding: '0.25rem', 
            borderRadius: '0.25rem',
            cursor: 'pointer'
        }
        
        return <div><button type="submit" style={style} onClick={this.props.onSave}>Salva</button></div>
    }

}