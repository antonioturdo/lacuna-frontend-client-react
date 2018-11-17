import React from 'react';

import withTheme from 'utils/withTheme';
import styled from 'styled-components';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import itLocale from 'date-fns/locale/it'

class StatusBar extends React.PureComponent {

    modificationToSaveText() {
        return this.props.modificationsToSave ? "Ci sono delle modifiche non salvate" : "Non ci sono modifiche da salvare";    
    }

    lastUpdateText() {
        let text = "Ultimo salvataggio: "

        const lastUpdate = this.props.lastUpdate ? this.props.lastUpdate : new Date()      

        text += distanceInWordsToNow(lastUpdate, {locale: itLocale, addSuffix: true, includeSeconds: true})

        return text
    }

    render() {
        const Container = this.props.themedComponents.container
        const SaveButton = this.props.themedComponents.saveButton
        const Text = this.props.themedComponents.text


        return (
            <Container>
                <Text>
                    {this.props.updateInProgress && <span>Salvataggio dati in corso...</span>}
                    {!this.props.updateInProgress && <span>{this.lastUpdateText()} | {this.modificationToSaveText()}</span>}
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