import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file for styling

const NavBar = () => {
  return (
    <Menu className="navbar" inverted>
      <Menu.Item as={Link} to="/" className="nav-item">
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/find-questions" className="nav-item">
        Find Questions
      </Menu.Item>
      <Menu.Item as={Link} to="/post" className="nav-item">
        Post
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
