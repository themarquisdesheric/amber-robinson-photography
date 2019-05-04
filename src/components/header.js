import { Link } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';

const links = ['portfolio', 'about', 'contact'];

// TODO: link underline transition on hover
// TODO: create pages programmatically
// TODO: create galleries programmatically

const Header = ({ siteTitle = '' }) => (
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
          key={link}
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

export default Header;
