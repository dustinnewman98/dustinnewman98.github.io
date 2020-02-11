import React from "react"
import Link from "gatsby-link"

export default ({ to, text }) => (
  <Link exact={to ? false : true} to={`/${to}`} activeClassName="selected">
    {text}
  </Link>
)
