import React from "react"
import PageHeader from "../components/page-header"

export default function NotFoundPage() {
  return (
    <div style={{ margin: "4em auto", width: "75%", textAlign: "left" }}>
      <PageHeader text="404: Page Not Found!" emoji="💔" />
    </div>
  )
}
