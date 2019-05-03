/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import './reset.css';
import './layout.css';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div className="layout flex flex-col">
        <Header siteTitle={data.site.siteMetadata.title} />
        <main className="px-2 sm:px-4">{children}</main>
        <footer className="bg-black h-8 flex justify-center items-center text-xs sm:text-sm">
          © {new Date().getFullYear()} Amber Robinson Photography
        </footer>
      </div>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
