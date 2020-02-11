import React from "react"

export default ({ text, emoji }) => (
  <div className="page-header">
    <h1>{text}</h1>
    <h2>{emoji}</h2>
  </div>
)
