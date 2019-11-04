import React from 'react';
import name from '../assets/images/name.svg';
import Layout from '../layouts';

export default () => (
  <Layout>
    <div
      style={{
        width: '100%',
        height: '100vh',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img alt="logo" src={name} style={{ width: '100%', maxWidth: '407px' }} />
    </div>
  </Layout>
);
