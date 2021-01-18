import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import arrow from '../assets/arrow.svg'
import { CSSPLugin } from "gsap/CSSPlugin"

const IndexPage = ({ data }) => {
  const plugin = [ CSSPLugin ] // to avoid webpack tree shaking
  const timeline = useRef(gsap.timeline())
  const flipTimeline = useRef(gsap.timeline())
  const z = useRef(1000000000)
  const curr = useRef(0)

  const slides = () => data.allImageSharp.edges.map((edge, i) => {
      return (
        <div id={i} key={i} style={{zIndex: z.current - i, position: "absolute", width: "100%", height: "100%"}} >
          <Img fluid={edge.node.fluid}/>
        </div>
    )
  })

  const nextImage = () => {
    z.current = z.current - 1
    let direction = "150%"
    let midAngle = 15

    if (Math.random() > 0.5) {
      direction = "-150%"
      midAngle = -15
    }
    flipTimeline.current
    .set(`#${CSS.escape(curr.current)}`, { x: 0 })
    .to(`#${CSS.escape(curr.current)}`, { 
      x: direction,
      rotation: midAngle,
      rotationY: 90,
      scale: 1.1
    })
    .set(`#${CSS.escape(curr.current)}`, { zIndex: z.current })
    .to(`#${CSS.escape(curr.current)}`, { 
      x: 0,
      rotation: () => {
        return 16 * Math.random() - 8
      },
      rotationY: 0,
      scale: 1
    })
    
    curr.current = ((curr.current + 1) % data.allImageSharp.edges.length)
  }

  useEffect(() => {
    data.allImageSharp.edges.forEach(() => {
      nextImage()
    })
    timeline.current
    .set("section div.slides img", {
      x: () => {
        return 500 * Math.random() - 250
      },
      y: "500%",
      rotation: () => {
        return 120 * Math.random() - 60
      },
      opacity: 1
    })
    .to("section div.slides img", { x: 0, y: 0, stagger: -0.25 })
    .to("section div.slides img", { 
      rotation: () => {
        return 16 * Math.random() - 8
      } 
    })
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <section>
        <div className="split">
          <div className="slides" onClick={nextImage}>
            { slides() }
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
            <a href="mailto:info@campusenterprises.org">
              Contact us
              <img src={arrow} />
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
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
}
`

export default IndexPage
