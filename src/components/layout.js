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
      <main className={splashPage ? 'splash' : 'px-2 sm:px-4'}>
        {children}
      </main>
      <footer className="bg-black h-8 flex justify-center items-center text-xs sm:text-sm">
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
