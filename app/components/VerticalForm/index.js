import React from 'react';
import withTheme from 'utils/withTheme'
import styled from 'styled-components';

class VerticalForm extends React.PureComponent {
    
    render() {
        const Form = this.props.themedComponents.form

        return <Form>{this.props.children}</Form>
    }

}

const defaultComponents = {
    form: styled.div`
        margin: 1rem 0
    `
}

export default withTheme(VerticalForm, defaultComponents)