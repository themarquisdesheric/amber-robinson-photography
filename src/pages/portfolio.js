import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import KEYWORDS from '../general-keywords';
import { preventRightClick } from '../utils';

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
      <section className="flex flex-wrap justify-between mt-8">
        {galleries.map(({ node: { frontmatter: { thumbnail: { childImageSharp: { fluid } }, title }, fields: { slug } } }) => (
          <article key={title} className="portfolio-item mb-4">
            <Link to={`/portfolio/${slug}`} onContextMenu={preventRightClick}>
              <Img fluid={fluid} imgStyle={{ objectFit: 'contain' }} />
              <figcaption className="text-center text-xs mt-1">{title}</figcaption>
            </Link>
          </article>
        ))}
      </section>
    </Layout>
  );
};

export default Portfolio;
