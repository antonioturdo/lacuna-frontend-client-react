import React from 'react';
import withTheme from 'utils/withTheme'
import styled from 'styled-components';

class Screen extends React.PureComponent {

    render() {
        const Container = this.props.themedComponents.container
        const Title = this.props.themedComponents.title
        return <Container>
            <Title>{this.props.title}</Title>
            {this.props.children}
        </Container>
    }

}

const defaultComponents = { 
    container : styled.div`
        padding: 0.5rem 0;
        display: flex;
        flex-direction: column;
    `,

    title: styled.h2`
    `,
}

export default withTheme(Screen, defaultComponents)