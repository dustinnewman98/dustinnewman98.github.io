import React from "react"
import { Helmet } from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

export default ({ title, description, subtitle, pathname, article }) => (
  <StaticQuery
    query={query}
    render={({ site }) => {
      const seo = {
        title: title || site.title,
        description: description || site.description,
        url: `${site.url}${pathname || ""}`,
      }
      return (
        <Helmet title={seo.title} titleTemplate={site.titleTemplate}>
          <html lang="en" />
          <meta name="description" content={seo.description} />
          {seo.url && <meta property="og:url" content={seo.url} />}
          {article && <meta property="og:type" content="article" />}
          {seo.title && <meta property="og:title" content={seo.title} />}
          {seo.description && (
            <meta property="og:description" content={seo.description} />
          )}
          <meta name="twitter:card" content="summary" />
          {site.twitterUsername && (
            <meta name="twitter:creator" content={site.twitterUsername} />
          )}
          {seo.title && <meta name="twitter:title" content={seo.title} />}
          {article && subtitle ? (
            <meta name="twitter:description" content={subtitle} />
          ) : (
            <meta name="twitter:description" content={seo.description} />
          )}
        </Helmet>
      )
    }}
  />
)

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        title
        author
        titleTemplate
        description
        url
        twitterUsername
      }
    }
  }
`
