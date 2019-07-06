import React, { useState } from 'react';
import { object } from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import LightBox from '../components/lightbox';
import SEO from '../components/seo';
import KEYWORDS from '../general-keywords';
import { preventRightClick } from '../utils';

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

// * get title and not entire html

const Gallery = ({ data: { gallery, images } }) => {
  const [showLightBox, toggleShowLightBox] = useState(false);
  const [imageIndex, setImageIndex] = useState(null);

  const openLightBox = (newImageIndex) => {
    setImageIndex(newImageIndex);
    toggleShowLightBox(true);
  };

  const closeLightBox = () => {
    toggleShowLightBox(false);
  };

  return (
    <Layout>
      <SEO title="Gallery" keywords={[...KEYWORDS, ...gallery.frontmatter.keywords]} /> 
      <div className="gallery" dangerouslySetInnerHTML={{ __html: gallery.html }} />
      <section className="gallery-photos-container">
        {images.edges.map(({ node: { name, childImageSharp } }, index) => 
          <div key={name} onClick={() => openLightBox(index)} onContextMenu={preventRightClick}>
            <Img fluid={childImageSharp.fluid} />
          </div>
        )}
      </section>

      {showLightBox && <LightBox images={images.edges} imageIndex={imageIndex} setImageIndex={setImageIndex} closeLightBox={closeLightBox} />}
    </Layout>
  );
};

Gallery.defaultProps = {
  gallery: {},
  images: {}
};

Gallery.propTypes = {
  gallery: object.isRequired,
  images: object.isRequired
};

export default Gallery;
