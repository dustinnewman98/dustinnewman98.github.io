import React from "react"
import App from "@dustinnewman98/syntax-tree-gen"
import SEO from "../components/seo"
import Layout from "../layouts"

export default () => (
    <Layout>
        <SEO title="Syntax Tree Generator" description="Online syntax tree generator with bullet features and bracket notation." />
        <div style={{ marginTop: "2em", marginBottom: "2em" }}>
            <App />
        </div>
    </Layout>
)