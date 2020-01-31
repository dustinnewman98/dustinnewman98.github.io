import React from "react"
import App from "@dustinnewman98/syntax-tree-gen"
import SEO from "../components/seo"
import Layout from "../layouts"

export default () => (
    <Layout>
        <SEO title="Syntax Tree Gen" description="Online syntax tree generator with bullet features" />
        <div style={{ marginTop: "2em", marginBottom: "2em" }}>
            <App />
        </div>
    </Layout>
)