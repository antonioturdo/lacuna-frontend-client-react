import React from 'react';

import withTheme from 'utils/withTheme';
import styled from 'styled-components';

class StatusBar extends React.PureComponent {

    render() {
        const Container = this.props.themedComponents.container
        const SaveButton = this.props.themedComponents.saveButton
        const Text = this.props.themedComponents.text

        return (
            <Container>
                <Text>
                    <span>Ultimo salvataggio: 24 secondi fa</span> |&nbsp; 
                    <span>Non ci sono modifiche non salvate</span>
                </Text>
                <SaveButton type="submit" onClick={this.props.onSave}>Salva</SaveButton>
            </Container>
        )
    }

}

const defaultComponents = { 
    container : styled.div`
        display: flex;
        justify-content: flex-start;
    `,

    text: styled.div`
        flex:1;
    `,

    saveButton: styled.button`           
        background-color: #AAA; 
        padding: 0.25rem;
        border-radius: 0.25rem;
        cursor: pointer;
        `
}

export default withTheme(StatusBar, defaultComponents)