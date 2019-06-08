import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import KEYWORDS from '../general-keywords';

// we can't access context (for the slug) via useStaticQuery
// so we need to export the query as a named export so gatsby can pick it up

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        keywords
      }
    }
  }
`;

const Blog = ({ data: { markdownRemark: { html, frontmatter: { keywords } } } }) => (
  <Layout>
    <SEO title="Blog" keywords={[...KEYWORDS, ...keywords]} /> 
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </Layout>
);

export default Blog;
