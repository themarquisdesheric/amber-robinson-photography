import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const SPLASH_IMG_QUERY = graphql`
  query SplashQuery {
    file(relativePath: { eq: "gallery/food/portrait.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1300, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const Image = () => (
  <StaticQuery
    query={SPLASH_IMG_QUERY}
    render={data => <Img fluid={data.file.childImageSharp.fluid} />}
  />
);

export default Image;
