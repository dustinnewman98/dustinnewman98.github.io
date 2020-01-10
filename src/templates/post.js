import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../layouts';
import PageContent from '../components/page-content';
import SEO from '../components/seo';

export default function PostTemplate({ data }) {
  const post = data.markdownRemark;
  const frontmatter = post.frontmatter;

  return (
    <Layout>
      <SEO {...post.frontmatter} article={true} />
      <PageContent>
        <article className="post">
          <h1 className="post-title">{frontmatter.title}</h1>
          {frontmatter.subtitle ? (
            <h2 className="post-subtitle">{frontmatter.subtitle}</h2>
          ) : null}
          <h3 className="post-date">{frontmatter.date}</h3>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </PageContent>
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
        description
      }
    }
  }
`;
