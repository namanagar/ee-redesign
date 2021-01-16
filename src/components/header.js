import { Link } from "gatsby"
import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import PropTypes from "prop-types"

const Header = ({ siteTitle }) => {
  const titleRef = useRef()
  const subtitleRef = useRef()
  const fadeInTimeline = useRef(gsap.timeline())
  const movementTimeline = useRef(gsap.timeline({ repeat: -1}))

  useEffect(() => {
    fadeInTimeline.current
      .set([titleRef.current, subtitleRef.current], { opacity: 0 })
      .to([titleRef.current, subtitleRef.current], { opacity: 1, delay: 1, stagger: 1.5, duration: 3 })
  })

  useEffect(() => {
    movementTimeline.current
      .set([titleRef.current, subtitleRef.current], {x : 0})
      .to([titleRef.current, subtitleRef.current], {x : titleRef.current.clientWidth*-1, ease: "linear", duration: 20})
  })


  return (
    <header>
      <h1 ref={titleRef}>
        { [...Array(20)].map((e, i) => <span key={i}>Enterprise Entertainment</span>) }
      </h1>
      <h2 ref={subtitleRef}>
        { [...Array(20)].map((e, i) => <span key={i}>from Campus Enterprises</span>) }
      </h2>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
