import React from 'react';
import { node, bool } from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';

import '../styles/reset.css';
import '../styles/layout.css';

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
      <Header siteTitle={title} splashPage={splashPage} />
      <main className={splashPage ? 'splash' : ''}> 
        {children}
      </main>
      <footer className="flex justify-center items-center text-xs h-8 mt-4 sm:text-sm">
        © {new Date().getFullYear()} {title}
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: node.isRequired,
  splashPage: bool
};

export default Layout;
