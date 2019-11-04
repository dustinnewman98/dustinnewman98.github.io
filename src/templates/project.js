import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import getSeo from '../utils/get-seo';
import Layout from '../layouts';

export default function ProjectTemplate({ data }) {
  const project = data.markdownRemark;
  const frontmatter = project.frontmatter;

  return (
    <Layout>
      <div>
        <Helmet
          title={getSeo(frontmatter.title)}
          meta={[
            { name: 'og:title', content: `${frontmatter.title}` },
            { name: 'twitter:title', content: `${frontmatter.title}` },
            { name: 'description', content: `${frontmatter.subtitle}` },
            { name: 'og:description', content: `${frontmatter.subtitle}` },
            { name: 'twitter:description', content: `${frontmatter.subtitle}` },
            { name: 'twitter:card', content: 'summary' },
          ]}
        />
        <div className="project">
          <h1 className="title">{frontmatter.title}</h1>
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        subtitle
      }
    }
  }
`;
