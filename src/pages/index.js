import React from 'react';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import KEYWORDS from '../general-keywords';

const IndexPage = () => (
  <Layout splashPage={true}>
    <SEO title="Home" keywords={KEYWORDS} />
    <Image />
  </Layout>
);

export default IndexPage;
