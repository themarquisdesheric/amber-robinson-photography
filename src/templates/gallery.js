import React from 'react';
import PropTypes from 'prop-types';
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
      sort: {
        fields: [name]
        order: ASC
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

// * lightbox 
// * grid fallback 

// * get title and not entire html

const Gallery = ({ data: { gallery, images } }) => (
  <Layout>
    <SEO title="Gallery" keywords={[...KEYWORDS, ...gallery.frontmatter.keywords]} /> 
    <div dangerouslySetInnerHTML={{ __html: gallery.html }} />
    <section className="gallery-photos-container">
      {images.edges.map(({ node: { name, childImageSharp } }) => 
        <Img key={name} fluid={childImageSharp.fluid} />
      )}
    </section>
  </Layout>
);

Gallery.defaultProps = {
  gallery: {},
  images: {}
};

Gallery.propTypes = {
  gallery: PropTypes.object.isRequired,
  images: PropTypes.object.isRequired
};

export default Gallery;
