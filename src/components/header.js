import React from 'react';
import MenuLink from './menu-link';

export default () => (
  <div id="header">
    <div className="nav">
      <MenuLink to="" text="home" />
      <MenuLink to="posts" text="posts" />
      <MenuLink to="projects" text="projects" />
    </div>
  </div>
);
