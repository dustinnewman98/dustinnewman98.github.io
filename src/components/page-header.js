import React from 'react';

class PageHeader extends React.Component {
    render() {
        return (
            <div className="page-header">
                <h1>{this.props.text}</h1>
                <h2>{this.props.emoji}</h2>
            </div>
        );
    }
}

export default PageHeader;