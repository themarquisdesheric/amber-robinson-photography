import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import KEYWORDS from '../general-keywords';

const BLOG_QUERY = graphql`
  query BlogQuery {
    allMarkdownRemark {
      edges {
        node {
          html
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }  
  }
`;

const Blog = () => {
  const { allMarkdownRemark: { edges } } = useStaticQuery(BLOG_QUERY);

  return (
    <Layout>
      <SEO title="Blog" keywords={KEYWORDS} />
      <h1 className="mt-4">Blog</h1>
      <ol>
        {edges.map(({ node: { html, frontmatter: { title, date }, fields: { slug } } }) => 
          <div key={title}>
            <Link to={`/blog/${slug}`}>
              <h2>{title}</h2>
              <p>{date}</p>
            </Link>
          </div>
        )}
      </ol>
    </Layout>
  );
};

export default Blog;
