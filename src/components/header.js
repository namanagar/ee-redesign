import { Link } from "gatsby"
import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import PropTypes from "prop-types"

const Header = ({ siteTitle }) => {
  const titleRef = useRef()
  const subtitleRef = useRef()
  const fadeInTimeline = useRef(gsap.timeline())
  const titleTimeline = useRef(gsap.timeline({ repeat: -1}))
  const subtitleTimeline = useRef(gsap.timeline({ repeat: -1}))

  useEffect(() => {
    fadeInTimeline.current
      .set([titleRef.current, subtitleRef.current], { opacity: 0 })
      .to([titleRef.current, subtitleRef.current], { opacity: 1, delay: 1, stagger: 1, duration: 3 })
    titleTimeline.current
      .set(titleRef.current, {x : 0})
      .to(titleRef.current, {x : titleRef.current.offsetWidth*-1, ease: "linear", duration: 60})
    subtitleTimeline.current
      .set(subtitleRef.current, {x : 0})
      .to(subtitleRef.current, {x : subtitleRef.current.offsetWidth*-1, ease: "linear", duration: 60})
  }, [])

  return (
    <header>
      <h1 ref={titleRef}>
        { [...Array(25)].map((e, i) => <span key={i}>Campus Enterprises</span>) }
      </h1>
      <h2 ref={subtitleRef}>
        { [...Array(20)].map((e, i) => <span key={i}>Enterprise Entertainment</span>) }
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
