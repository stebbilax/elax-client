import React from "react";
import { Link } from "react-router-dom";
// import "../../css/navBar.css"
// import "../../css/animation.css"
class Navbar extends React.Component {

  openNav = () => {

    document.querySelector(".main-container").classList.toggle("overflow-hidden")

    const navMaster = document.querySelector("nav");
    const navBar = document.querySelector(".navBar");
    const nav = document.querySelector(".link-container");
    const links = document.querySelectorAll(".nav-links a");
    const burger = document.querySelector(".burger");
    //Change the navBar position because somehow that works
    navBar.classList.toggle("static");
    //Change the nav element itself so that it works on mobile
    navMaster.style.overflowX = "visible";
    //Toggle Nav
    nav.classList.toggle("nav-active");
    //Animate Nav Links
    links.forEach((link, index) => {
      // If link has been animated, reset the animation
      if (link.style.animation) {
        nav.style.visibility = "hidden";

        link.style.animation = ""
      } else {
        nav.style.visibility = "visible";

        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
      }

    });

    // Burger Animation
    burger.classList.toggle('toggle');
  }

  closeNav = () => {

    document.querySelector(".main-container").classList.toggle("overflow-hidden")

    const navMaster = document.querySelector("nav");
    const navBar = document.querySelector(".navBar");
    const nav = document.querySelector(".link-container");
    const links = document.querySelectorAll(".nav-links a");
    const burger = document.querySelector(".burger");
    //Change the navBar position because somehow that works
    navBar.classList.toggle("static");
    //Change the nav element itself so that it works on mobile
    navMaster.style.overflowX = "visible";
    //Toggle Nav
    nav.classList.toggle("nav-active");
    //Animate Nav Links
    links.forEach((link, index) => {
      // If link has been animated, reset the animation
      link.style.animation = ""

    });

    // Burger Animation
    burger.classList.toggle('toggle');
  }

  handleLogoClick = () => {
    const navMaster = document.querySelector("nav");
    const navBar = document.querySelector(".navBar");
    const nav = document.querySelector(".link-container");
    const links = document.querySelectorAll(".nav-links a");
    const burger = document.querySelector(".burger");


    if (nav.classList.contains("nav-active")) {
      document.querySelector(".main-container").classList.toggle("overflow-hidden")
      //Change the navBar position because somehow that works
      navBar.classList.toggle("static");
      //Change the nav element itself so that it works on mobile
      navMaster.style.overflowX = "visible";
      //Toggle Nav
      nav.classList.toggle("nav-active");
      //Animate Nav Links
      links.forEach((link, index) => {
        // If link has been animated, reset the animation
        link.style.animation = ""

      });

      // Burger Animation
      burger.classList.toggle('toggle');
    }
  }


  render() {
    return (
      <div className="nav">
        <nav className="navBar">
          <div className="logo" onClick={this.handleLogoClick}>
            <Link to="/"><h2>Elin Laxdal</h2></Link>
            <Link to="/"><h3>Photography</h3></Link>
          </div>
          <div className="link-container">
            <ul className="nav-links">
              <Link onClick={this.closeNav} to="/gallery">Gallery</Link>
              <Link onClick={this.closeNav} to="/about">About</Link>
              <Link onClick={this.closeNav} to="/contact">Contact</Link>
              <Link onClick={this.closeNav} to="/blog">Blog</Link>
            </ul>
          </div>
          <div className="nav-icons">
            <a href="https://www.google.com">
              <img alt="social media link" src="./img/facebook-square.png" />
            </a>
            <a href="https://www.google.com">
              <img alt="social media link" src="./img/flickr-square.png" />
            </a>
            <a href="https://www.google.com">
              <img alt="social media link" src="./img/instagram.png" />
            </a>
          </div>
          <div className="burger" onClick={this.openNav}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar;