const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const { createNodeField } = actions

    node.collection = getNode(node.parent).sourceInstanceName

    let slug
    if (node.frontmatter && node.frontmatter.path !== undefined) {
      slug = node.frontmatter.path
    } else {
      slug = createFilePath({
        node,
        getNode,
        basePath: 'src/',
      });
    }

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const result = await graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              excerpt(pruneLength: 250)
              html
              id
              collection
              fields {
                slug
              }
              frontmatter {
                title
                subtitle
                description
                date
                path
              }
            }
          }
        }
      }
    `);

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.collection == 'projects') {
      createPage({
        path: `/projects${node.fields.slug}`,
        component: path.resolve(`./src/templates/project.js`),
        context: {
          // Data passed to context is available in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      });
    } else if (node.collection == 'posts') {
      if (node.frontmatter && node.frontmatter.path) {
        return
      }
      createPage({
        path: `/posts${node.fields.slug}`,
        component: path.resolve(`./src/templates/post.js`),
        context: {
          // Data passed to context is available in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      });
    }
  });
};
