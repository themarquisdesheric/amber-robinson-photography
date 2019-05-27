import React from 'react';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import KEYWORDS from '../general-keywords';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={KEYWORDS} />
    <div className="mt-4">
      <Image />
    </div>
  </Layout>
);

export default IndexPage;
