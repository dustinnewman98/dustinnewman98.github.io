import React from 'react';
import { graphql } from 'gatsby';
import PageHeader from '../components/page-header';
import PageContent from '../components/page-content';
import Layout from '../layouts';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

function renderGithub(github) {
  return (
    <p>
      <span aria-label="octopus" role="img">
        🐙
      </span>{' '}
      Github: <a href={`https://www.github.com/${github}`}>{github}</a>
    </p>
  );
}

function renderLive(live) {
  return (
    <p>
      <span aria-label="sparkles" role="img">
        ✨
      </span>{' '}
      Live at: <a href={live}>{live}</a>
    </p>
  );
}

export default function Projects({ data }) {
  const { edges: projects } = data.allMarkdownRemark;

  return (
    <Layout>
      <PageContent>
        <PageHeader text="My Projects" emoji="🤖" />
        <div className="project-wrapper">
          {projects
            .filter(project => project.node.frontmatter.title.length > 0)
            .map(({ node: project }) => {
              return (
                <div className="one-project">
                  <div className="text-box">
                    <Link to={`/projects${project.fields.slug}`}>
                      <h1 className="title">{project.frontmatter.title}</h1>
                    </Link>
                    <div className="info">
                      <p className="subtitle">{project.frontmatter.subtitle}</p>
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
                      {project.frontmatter.github === null
                        ? null
                        : renderGithub(project.frontmatter.github)}
                      {project.frontmatter.live === null
                        ? null
                        : renderLive(project.frontmatter.live)}
                    </div>
                  </div>
                  <div className="image-box">
                    <div className="black-box">
                      <Img
                        className="proj-img"
                        fluid={project.frontmatter.img.childImageSharp.fluid}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
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
                fluid(maxWidth: 700) {
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
