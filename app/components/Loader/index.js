import React from 'react';
import withTheme from 'utils/withTheme'
import styled from 'styled-components';
import LoaderSpinner from 'react-loader-spinner'

class Loader extends React.PureComponent {
    
    render() {
        const Container = this.props.themedComponents.container;
        const Spinner = this.props.themedComponents.spinner;

        return <Container>
            <LoaderSpinner 
                type="Oval"
                color="green"
                height="80"	
                width="80"
            />
            </Container>
    }
    
}

const defaultComponents = {
    container: styled.div`
        position: fixed;
        z-index: 999;
        height: 80px;
        width: 80px;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;        
    `,
}

export default withTheme(Loader, defaultComponents)