module.exports = {
  siteMetadata: {
    title: 'Dustin Newman',
    titleTemplate: '%s | Dustin Newman',
    author: 'Dustin Newman',
    description: 'Software engineer, UCLA Computer Science and Linguistics major, nerd.',
    url: 'https://dustinnewman.io',
    twitterUsername: '@dustinnewman98'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/projects`,
        name: 'projects',
      },
    },
    'gatsby-remark-copy-linked-files',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-remark-images',
      options: {
        maxWidth: 1080,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
          }
        ]
      }
    }
  ],
};
