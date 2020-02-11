import React from "react"
import Header from "../components/header"
import "../styles/main.scss"

export default class Layout extends React.Component {
  render() {
    return (
      <>
        <Header />
        {this.props.children}
        <footer>
          This site uses the{" "}
          <a href="https://www.behance.net/gallery/60530395/Objectivity-Free-Font-Family">
            "Objectivity"
          </a>{" "}
          font family made by{" "}
          <a href="https://www.behance.net/slobzheninov">Alex Slobzheninov</a>.
        </footer>
      </>
    )
  }
}
