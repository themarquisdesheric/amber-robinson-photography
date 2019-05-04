import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import KEYWORDS from '../keywords';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={KEYWORDS} />
    <h1 className="mt-4">Dark &amp; Dramatic</h1>
    <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
      <Image />
      <Image />
    </div>
    <Link to="/portfolio/">Check out my portfolio, d-a-w-g</Link>
  </Layout>
);

export default IndexPage;
