import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import KEYWORDS from '../keywords';

const Contact = () => (
  <Layout>
    <SEO title="Contact" keywords={KEYWORDS} />
    <h1 className="mt-4">Contact page</h1>
    <p>content goes here...</p>
  </Layout>
);

export default Contact;
