import React from 'react';
import PageHeader from '../components/page-header';
import PageContent from '../components/page-content';
import AboutContent from '../components/about-content';
import Layout from '../layouts';
import SEO from '../components/seo';

export default () => (
  <Layout>
    <SEO title="About Me" />
    <PageContent>
      <PageHeader text="About Me" emoji="👨🏼‍💻" />
      <AboutContent />
    </PageContent>
  </Layout>
);
