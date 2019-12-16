import React from "react"
import { Helmet } from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, pathname, article }) => (
    <StaticQuery
        query={query}
        render={({
            site: {
                siteMetadata: {
                    defaultTitle,
                    titleTemplate,
                    defaultDescription,
                    siteUrl,
                    twitterUsername,
                },
            },
        }) => {
            const seo = {
                title: title || defaultTitle,
                description: description || defaultDescription,
                url: `${siteUrl}${pathname || "/"}`,
            }
            return (
                <>
                    <Helmet title={seo.title} titleTemplate={titleTemplate}>
                        <meta name="description" content={seo.description} />
                        {seo.url && <meta property="og:url" content={seo.url} />}
                        {(article ? true : null) && (
                            <meta property="og:type" content="article" />
                        )}
                        {seo.title && <meta property="og:title" content={seo.title} />}
                        {seo.description && (
                            <meta property="og:description" content={seo.description} />
                        )}
                        <meta name="twitter:card" content="summary" />
                        {twitterUsername && (
                            <meta name="twitter:creator" content={twitterUsername} />
                        )}
                        {seo.title && <meta name="twitter:title" content={seo.title} />}
                        {seo.description && (
                            <meta name="twitter:description" content={seo.description} />
                        )}
                    </Helmet>
                </>
            )
        }}
    />
)

export default SEO;

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        twitterUsername
      }
    }
  }
`;