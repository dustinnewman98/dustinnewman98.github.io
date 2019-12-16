import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts';
import SEO from '../components/seo';
import PageContent from '../components/page-content';

export default function ProjectTemplate({ data }) {
  const project = data.markdownRemark;
  const frontmatter = project.frontmatter;

  return (
    <Layout>
      <div>
        <SEO {...frontmatter} />
        <PageContent>
          <div className="project">
            <h1 className="title">{frontmatter.title}</h1>
            <div
              className="project-content"
              dangerouslySetInnerHTML={{ __html: project.html }}
            />
          </div>
        </PageContent>
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
