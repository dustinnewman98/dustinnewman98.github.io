import React from 'react';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';
import PageHeader from '../components/page-header';
import PageContent from '../components/page-content';
import Layout from '../layouts';

function getMonth(input) {
  let d = new Date(input);
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[d.getMonth()];
}

function getDay(input) {
  let d = new Date(input);
  return d.getDate();
}

export default function Posts({ data }) {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <Layout>
      <PageContent>
        <PageHeader text="My Posts" emoji="💌" />
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return (
              <Link
                to={`/posts${post.fields.slug}`}
                className="one-post"
                style={{ display: 'flex' }}
              >
                <div
                  className="one-post-date"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <h1 className="one-post-date-day">
                    {getDay(post.frontmatter.date)}
                  </h1>
                  <p className="one-post-date-month">
                    {getMonth(post.frontmatter.date)}
                  </p>
                </div>
                <div
                  className="one-post-blurb"
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <h1 className="one-post-blurb-title">
                    {post.frontmatter.title}
                  </h1>
                  <h2 className="one-post-blurb-subtitle">
                    {post.frontmatter.subtitle}
                  </h2>
                </div>
              </Link>
            );
          })}
      </PageContent>
    </Layout>
  );
}

export const postQuery = graphql`
  query postQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(/src/posts)/.*.md$/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          fields {
            slug
          }
          frontmatter {
            title
            subtitle
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
