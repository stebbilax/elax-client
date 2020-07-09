import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Navbar from "./basics/Navbar"
import Footer from "./basics/Footer"
import Gallery from "./pages/Gallery"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Blog from "./pages/Blog"
import Album from "./pages/Album"
import Home from "./pages/Home"
import Admin from "./admin/Admin"

import "../css/master.css"
// import "../css/animation.css"





class App extends React.Component {

    render() {
        return (
            <div className="page-container">
                <BrowserRouter>
                    <Route exact path="/admin" component={Admin} />
                    <Navbar />
                    <div className="black-out"></div>
                    <div className="main-container">
                        <Route exact path="/" component={Home} />
                        <Route exact path="/gallery" component={Gallery} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/contact" component={Contact} />
                        <Route exact path="/blog" component={Blog} />
                        <Route exact path="/album" component={Album} />
                    </div>
                    <Footer />
                </BrowserRouter>

            </div>
        )
    }
}

export default App;