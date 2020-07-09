import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";




class BlogCard extends React.Component {

    constructor() {
        super()
        AOS.init({
            duration: 800,
            offsett: 150,
            easing: "ease-in-out",
            once: true
        });
    }

    componentDidUpdate() {
        AOS.refresh();
    }

    bodyLength = (body) => {
        if (body.length < 100) {
            return body + "..."
        }
        return body.substr(0, 100) + "..."

    }


    render() {
        return (
            <div data-aos="fade-up" className="blog-card">
                <div className="fade-out-overlay"></div>
                <div className="hover-card">
                    <h1>Read More</h1>
                </div>
                <div className="img-container">
                    <img alt="blog-card-img" src={this.props.pic} />
                </div>
                <div className="text-container">
                    <h2>{this.props.title}</h2>
                    <p>{this.bodyLength(this.props.body)}</p>
                </div>
            </div>
        )
    }
}

export default BlogCard;