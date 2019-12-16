import React from 'react';
import PageHeader from '../components/page-header';
import PageContent from '../components/page-content';
import AboutContent from '../components/about-content';
import Layout from '../layouts';

export default () => (
  <Layout>
    <PageContent>
      <PageHeader text="About Me" emoji="👨🏼‍💻" />
      <AboutContent />
    </PageContent>
  </Layout>
);
