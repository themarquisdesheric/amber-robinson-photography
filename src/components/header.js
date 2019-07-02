import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { bool, arrayOf, string, func } from 'prop-types';

import Signature from '../images/signature.svg';
import Menu from '../images/menu.svg';

const BLOG_TITLE_QUERY = graphql`
  query BlogTitleQuery {
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


const Links = ({ links, mobile }) =>
  links.map((link, idx) => (
    <Link 
      to={`/${link}`}
      className={
        mobile 
          ? '' 
          : `uppercase sm:inline sm:text-black ${(idx + 1 === links.length) ? '' : 'sm:mr-4'}`
      }
      key={link}
    >
      {link}
    </Link>  
  ));

Links.propTypes = {
  links: arrayOf(string).isRequired,
  mobile: bool
};


const MobileMenu = ({ links, visible }) => (
  <div 
    className="mobile-nav text-center border-b text-xs uppercase" 
    style={{ maxHeight: visible ? '175px' : '0px' }}
  >
    <Links links={links} mobile />
  </div>
);

MobileMenu.propTypes = {
  links: arrayOf(string).isRequired,
  visible: bool.isRequired
};


const HamburgerMenu = ({ handleSetVisible }) => (
  <div 
    onClick={() => handleSetVisible(visible => !visible)} 
    className="hamburger-menu h-6"
  >
    <Menu />
  </div>
);

HamburgerMenu.propTypes = {
  handleSetVisible: func.isRequired
};


const NavLinks = ({ links }) => (
  <div className="nav-links">
    <Links links={links} />
  </div>
);

NavLinks.propTypes = {
  links: arrayOf(string).isRequired
};


const Header = () => {
  const { allMarkdownRemark: { edges } } = useStaticQuery(BLOG_TITLE_QUERY);
  const [visible, setVisible] = useState(false);
  const links = ['portfolio', 'about', 'contact'];

  if (edges.length) {
    // only show blog link if blog entries exist
    links.splice(1, 0, 'blog');
  }

  return (
    <div>
      <MobileMenu links={links} visible={visible} />  
      <header className="header flex items-center justify-between border-b h-16">
        <h1 className="text-xl sm:text-2xl m-0">
          <Link to="/">
            <Signature />
          </Link>
        </h1>
        <nav className="text-xs">
          <HamburgerMenu handleSetVisible={setVisible} />
          <NavLinks links={links} />
        </nav>
      </header>
    </div>
  );
};

export default Header;
