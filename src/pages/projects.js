import React from 'react';
import { graphql } from 'gatsby';
import PageHeader from '../components/page-header';
import PageContent from '../components/page-content';
import Layout from '../layouts';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

function renderGithub(github) {
  return github ? (
    <p>
      <span aria-label="octopus" role="img">
        🐙
      </span>{' '}
      Github: <a href={`https://www.github.com/${github}`}>{github}</a>
    </p>
  ) : null;
}

function renderLive(live) {
  return live ? (
    <p>
      <span aria-label="sparkles" role="img">
        ✨
      </span>{' '}
      Live at: <a href={live}>{live}</a>
    </p>
  ) : null;
}

function renderTextBox(project) {
  return (
    <div className="text-box">
      <Link to={`/projects${project.fields.slug}`}>
        <h2 className="title">{project.frontmatter.title}</h2>
      </Link>
      : <p className="subtitle">{project.frontmatter.subtitle}</p>
      <div className="info">
        <p>
          <span aria-label="bread" role="img">
            🍞
          </span>{' '}
          Role: {project.frontmatter.role}
        </p>
        <p>
          <span aria-label="wizard" role="img">
            🧙
          </span>{' '}
          Worked with: {project.frontmatter.stack}
        </p>
        {renderGithub(project.frontmatter.github)}
        {renderLive(project.frontmatter.live)}
      </div>
    </div>
  )
}

function renderProject(project) {
  return (
    <div className="one-project">
      {renderTextBox(project)}
      <div className="image-box">
        <Img
          className="proj-img"
          fluid={project.frontmatter.img.childImageSharp.fluid}
        />
      </div>
    </div>
  );
}

export default function Projects({ data }) {
  const { edges: projects } = data.allMarkdownRemark;

  return (
    <Layout>
      <PageContent>
        <PageHeader text="My Projects" emoji="🤖" />
        {projects
          .filter(project => project.node.frontmatter.title.length > 0)
          .map(({ node: project }) => renderProject(project))}
      </PageContent>
    </Layout>
  );
}

export const projQuery = graphql`
  query projQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(/src/projects)/.*.md$/" } }
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
            img {
              publicURL
              childImageSharp {
                fluid(maxHeight: 200) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            role
            stack
            github
            live
          }
        }
      }
    }
  }
`;
