import React from 'react';
import withTheme from 'utils/withTheme'
import styled from 'styled-components';

const defaultComponents = { 
    block : styled.div`
        padding: 0.5rem 0;
        display: flex;

        label {
            width: 40%;
            textAlign: right;
            paddingRight: 1rem            
        }

        input {
            border: 1px solid green; 
            borderRadius: 2px            
        }
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
};

class BlockInput extends React.PureComponent {
    render() {
        const Block = this.props.themedComponents.block;
        const Label = this.props.themedComponents.label;
        const Input = this.props.themedComponents.input; 
        
        return (
            <Block>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <Input type={this.props.type} name={this.props.name}></Input>
            </Block>
        )
    }
}

export default withTheme(BlockInput, defaultComponents)