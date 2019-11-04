import React from 'react';
import Link from 'gatsby-link';

class MenuLink extends React.Component {
    render = () => {
        return <Link
            exact={this.props.to ? false : true}
            to={`/${this.props.to}`}
            activeClassName='selected'
        >{this.props.text}</Link>
    }
}

export default MenuLink;
