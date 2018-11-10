import React from 'react';
import withTheme from 'utils/withTheme'

class ScreenList extends React.PureComponent {

    render() {
        const lis = this.props.children.map((child, i) => <li key={i} style={this.props.themedStyle.element}>{child}</li>)
        return <ul style={this.props.themedStyle.root}>{lis}</ul>
    }

}

const defaultStyle = {
    root: {
        listStyle: 'none',
        padding: '0.5rem 0.25rem'
    },
    element: {
        ':nthChild(even)': {
            background: '#aaa',
        }
    }
}

export default withTheme(ScreenList, defaultStyle)