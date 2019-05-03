import { Link } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';

const links = ['galleries', 'about', 'contact'];

// TODO: link underline transition on hover
// TODO: link pages
// TODO: create pages programmatically
// TODO: create galleries programmatically

const Header = ({ siteTitle }) => (
  <header className="bg-black flex items-center justify-between h-12">
    <h1 className="text-xl sm:text-2xl m-0 px-2 sm:px-4">
      <Link to="/">
        {siteTitle}
      </Link>
    </h1>
    <nav className="text-xs">
      {links.map(link => 
        <Link 
          to={`/${link}`}
          className="pr-2 sm:pr-4 uppercase"
        >
          {link}
        </Link>  
      )}
    </nav>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ''
};

export default Header;
