import React from 'react';
import withTheme from 'utils/withTheme'
import styled from 'styled-components';

const defaultComponents = {
    list: styled.ul`
        list-style: none;
        padding: 0.5rem 0
    `,

    element: styled.li`
        ':nthChild(even)': {
            background: '#aaa',
        }
    `
}

class ScreenList extends React.PureComponent {

    render() {
        const List = this.props.themedComponents.list;
        const Element = this.props.themedComponents.element;

        const lis = this.props.children.map((child, i) => <Element key={i}>{child}</Element>)
        return <List>{lis}</List>
    }

}

export default withTheme(ScreenList, defaultComponents)