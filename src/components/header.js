import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Signature from '../images/signature.svg';
import Menu from '../images/menu.svg';

const TITLE_QUERY = graphql`
  query TitleQuery {
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
`;

// * do dropdown mobile menu with different colored background and with it overlaying the page instead of disrupting the flow

const NavLinks = ({ visible }) => {
  const { allMarkdownRemark: { edges } } = useStaticQuery(TITLE_QUERY);
  const links = ['portfolio', 'about', 'contact'];

  if (edges.length) {
    // only show blog link if blog entries exist
    links.splice(1, 0, 'blog');
  }

  return (
    <div className={`hamburger-list flex-col p-1 absolute ${visible ? 'flex' : 'hidden'} sm:flex sm:flex-row sm:static`}>
      {links.map((link, idx) => 
        <Link 
          to={`/${link}`}
          className={`uppercase sm:inline sm:text-black ${(idx + 1 === links.length) ? '' : 'sm:mr-4'}`}
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
    className="hamburger-menu h-6"
  >
    <Menu />
  </div>;

const Header = () => {
  const [visible, setVisible] = useState(false);

  return (
    <header className="flex items-center justify-between border-b border-solid border-black h-16 px-5 sm:px-24">
      <h1 className="text-xl sm:text-2xl m-0">
        <Link to="/">
          <Signature />
        </Link>
      </h1>
      <nav className="text-xs relative">
        <HamburgerMenu visible={visible} handleSetVisible={setVisible} />
        <NavLinks visible={visible} />
      </nav>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string
};

export default Header;
