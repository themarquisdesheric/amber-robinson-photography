import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import KEYWORDS from '../general-keywords';

const About = () => (
  <Layout>
    <SEO title="About" keywords={KEYWORDS} />
    <h1 className="mt-4">About page</h1>
    <p>content goes here...</p>
  </Layout>
);

export default About;
