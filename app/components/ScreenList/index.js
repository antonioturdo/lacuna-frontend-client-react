import React from 'react';
import withTheme from 'utils/withTheme'
import styled from 'styled-components';

class ScreenList extends React.PureComponent {
    
    render() {
        const List = this.props.themedComponents.list;
        const Element = this.props.themedComponents.element;

        const lis = this.props.children.map((child, i) => <Element key={i}>{child}</Element>)
        return <List>{lis}</List>
    }
    
}

const defaultComponents = {
    list: styled.ul`
        list-style: none;
        padding: 0
    `,

    element: styled.li`
        padding: 0.25rem;
        
        &:nth-child(even) {
            background-color: #eee;
        }
    `
}

export default withTheme(ScreenList, defaultComponents)