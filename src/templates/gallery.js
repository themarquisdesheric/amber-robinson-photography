import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import KEYWORDS from '../general-keywords';

// we can't access context (for the slug/absolutePathRegex) via useStaticQuery
// so we need to export the query as a named export so gatsby can pick it up

export const query = graphql`
  query($slug: String!, $absolutePathRegex: String!) {
    images: allFile(
      filter: {
        absolutePath: { regex: $absolutePathRegex }
        extension: { regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/" }
      }
    ) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 1600, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    gallery: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        keywords
      }
    }
  }
`;

const Gallery = ({ data: { gallery, images } }) => (
  <Layout>
    <SEO title="Gallery" keywords={[...KEYWORDS, ...gallery.frontmatter.keywords]} /> 
    <div dangerouslySetInnerHTML={{ __html: gallery.html }} />
    {images.edges.map(({ node: { name, childImageSharp } }) => <Img key={name} fluid={childImageSharp.fluid} />)}
  </Layout>
);

// ! proptypes

export default Gallery;
