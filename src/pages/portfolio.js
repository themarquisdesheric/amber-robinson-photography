import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import KEYWORDS from '../general-keywords';

const GALLERY_QUERY = graphql`
  query GalleryQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/gallery/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1600, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }  
  }
`;

const Portfolio = () => {
  const { allMarkdownRemark: { edges: galleries } } = useStaticQuery(GALLERY_QUERY);

  return (
    <Layout>
      <SEO title="Portfolio" keywords={KEYWORDS} />
      <h1 className="my-4">Portfolio</h1>
      <section className="flex flex-wrap justify-between">
        {galleries.map(({ node: { frontmatter: { thumbnail: { childImageSharp: { fluid } }, title }, fields: { slug } } }) => (
          <article key={title} className="portfolio-item mb-4">
            <Link to={`/portfolio/${slug}`}>
              <Img fluid={fluid} />
              <figcaption className="text-center text-xs my-2">{title}</figcaption>
            </Link>
          </article>
        ))}
      </section>
    </Layout>
  );
};

export default Portfolio;
