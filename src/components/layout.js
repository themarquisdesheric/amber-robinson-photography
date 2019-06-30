import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import './reset.css';
import './layout.css';

const SITE_TITLE_QUERY = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const Layout = ({ children, splashPage }) => {
  const { site: { siteMetadata: { title = '' } } } = useStaticQuery(SITE_TITLE_QUERY);

  return (
    <div className="layout flex flex-col">
      <Header siteTitle={title} />
      <main className={splashPage ? 'splash' : ''}> 
        {children}
      </main>
      <footer className="h-8 flex justify-center items-center border-t border-dotted text-xs sm:text-sm">
        © {new Date().getFullYear()} {title}
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  splashPage: PropTypes.bool
};

export default Layout;
