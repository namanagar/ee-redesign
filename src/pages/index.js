import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <section>
        <div className="split">
          <div className="slides">
            { data.allImageSharp.edges.map((edge) => 
              <Img key={edge.node.id} fixed={edge.node.fixed}/>
            )}
          </div>
        </div>
        <div className="split">
        <div className="info">
          <h2>Don't lift a finger, raise a glass.</h2>
          <p> 
          Let us create the event of your dreams without you lifting a finger.
          In addition to a venue, we arrange an array of amenities such as DJ, photography, and food services.
          You are just one click away from making memories.
          </p>
          <p>
            <a href="#">
              Read more
              <img src="arrow.svg" />
            </a>
          </p>
        </div>
      </div>
      </section>
    </Layout>
  )
  // <Link to="/page-2/">Go to page 2</Link> <br/>
}

export const query = graphql`{
  allImageSharp {
    edges {
      node {
        id
        fixed(width: 400) {
          ...GatsbyImageSharpFixed_withWebp_noBase64
        }
      }
    }
  }
}
`

export default IndexPage
