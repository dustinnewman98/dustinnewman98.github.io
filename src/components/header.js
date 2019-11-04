import React from 'react';
import MenuLink from './menu-link';

class Header extends React.Component {
  constructor(props) {
    super(props);
    if (typeof window === 'undefined') {
      return;
    }
    this.state = {
      width: window.innerWidth,
    };
    this.updateWidth();
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.updateWidth);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWidth);
  };

  updateWidth = () => {
    this.setState({
      width: window.innerWidth,
    });
  };

  renderDesktop = () => {
    return (
      <div id="header">
        <div className="nav">
          <MenuLink to="" text="home" />
          <MenuLink to="about" text="about" />
        </div>
        <div className="nav">
          <MenuLink to="posts" text="posts" />
          <MenuLink to="projects" text="projects" />
        </div>
      </div>
    );
  };

  renderMobile = () => {
    return (
      <div id="header">
        <div className="nav">
          <MenuLink to="" text="home" />
          <MenuLink to="posts" text="posts" />
          <MenuLink to="about" text="about" />
          <MenuLink to="projects" text="projects" />
        </div>
      </div>
    );
  };

  render = () => {
    if (typeof window === 'undefined') {
      return this.renderMobile();
    }
    if (this.state.width >= 1100) {
      return this.renderDesktop();
    } else {
      return this.renderMobile();
    }
  };
}

export default Header;
