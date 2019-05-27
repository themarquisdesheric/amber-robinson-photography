import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Signature from '../images/signature.svg';
import Menu from '../images/menu.svg';


const NavLinks = ({ visible }) => {
  const links = ['portfolio', 'about', 'contact'];
  const { allMarkdownRemark: { edges } } = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
            }
          }
        }
      }  
    }
  `);

  if (edges.length) {
    // only show blog link if blog entries exist
    links.splice(1, 0, 'blog');
  }
  
  return (
    <div className={`hamburger-list flex-col p-1 absolute ${visible ? 'flex' : 'hidden'} sm:flex sm:flex-row sm:static`}>
      {links.map(link => 
        <Link 
          to={`/${link}`}
          className="uppercase sm:inline sm:mr-4 sm:text-black"
          key={link}
        >
          {link}
        </Link>  
      )}
    </div>
  );
};

// TODO: create galleries programmatically
// TODO: proptypes

const HamburgerMenu = ({ className, handleSetVisible }) => 
  <div 
    onClick={() => handleSetVisible(visible => !visible)} 
    className={`mr-2 h-6 ${className}`}
  >
    <Menu />
  </div>;

const Header = () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <header className="flex items-center justify-between border-b border-solid border-black h-16">
      <h1 className="text-xl sm:text-2xl m-0 px-2 sm:px-4">
        <Link to="/">
          <Signature />
        </Link>
      </h1>
      <nav className="text-xs relative">
        <HamburgerMenu className="sm:hidden" visible={visible} handleSetVisible={setVisible} />
        <NavLinks visible={visible} />
      </nav>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string
};

export default Header;
