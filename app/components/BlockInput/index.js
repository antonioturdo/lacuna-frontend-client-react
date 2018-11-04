import React from 'react';
import withCustomTheme from 'utils/withCustomTheme'

class BlockInput extends React.PureComponent {
    render() {
        return (
        <div style={this.props.themedStyle.root}>
            <label htmlFor={this.props.name} style={this.props.themedStyle.label}>{this.props.label}</label>
            <input type={this.props.type} style={this.props.themedStyle.input} name={this.props.name}></input>
        </div>
        )
    }
}

const defaultStyle = {
    root: {
        padding: '0.5rem 0',
        display: 'flex'
    },
    label: {
        width: '40%',
        textAlign: 'right',
        paddingRight: '1rem'
    },
    input: {
        border: '1px solid #BBB', 
        borderRadius: '2px'        
    }
}

export default withCustomTheme(BlockInput, defaultStyle)