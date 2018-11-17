import React from 'react';
import withTheme from 'utils/withTheme'
import styled from 'styled-components';

class BlockInput extends React.PureComponent {
    render() {
        const Block = this.props.themedComponents.block;
        const Label = this.props.themedComponents.label;
        const Input = this.props.themedComponents.input; 

        const value = this.props.data === undefined ? '' : this.props.data
        
        return (
            <Block>
                <Label htmlFor={this.props.name}>{this.props.label}{this.props.required && ' *'}</Label>
                <Input
                    value={value}
                    required={this.props.required} 
                    type={this.props.type} 
                    name={this.props.name} 
                    onChange={(a) => {this.props.onDataChange(this.props.name, a.target.value)}}
                    >
                </Input>
            </Block>
        )
    }
}

const defaultComponents = { 
    block : styled.div`
        padding: 0.5rem 0;
        display: flex;
    `,

    label: styled.label`
        width: 40%;
        textAlign: right;
        paddingRight: 1rem
    `,

    input: styled.input`
        border: 1px solid #BBB; 
        borderRadius: 2px
    `,
}

export default withTheme(BlockInput, defaultComponents)