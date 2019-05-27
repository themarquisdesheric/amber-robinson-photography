import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import KEYWORDS from '../keywords';

const Portfolio = () => (
  <Layout>
    <SEO title="Portfolio" keywords={KEYWORDS} />
    <h1 className="mt-4">Portfolio page</h1>
    <p>content goes here...</p>
  </Layout>
);

export default Portfolio;
