import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import KEYWORDS from '../general-keywords';
import { preventRightClick } from '../utils';

const SPLASH_IMG_QUERY = graphql`
  query SplashQuery {
    file(relativePath: { eq: "images/triptych-final-no-pad.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1300, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const IndexPage = () => {
  const { file } = useStaticQuery(SPLASH_IMG_QUERY);

  return (
    <Layout splashPage={true}>
      <SEO title="Home" keywords={KEYWORDS} />
      <Link to="/portfolio" onContextMenu={preventRightClick}>
        <Img fluid={file.childImageSharp.fluid} />
      </Link>
    </Layout>
  );
};

export default IndexPage;
