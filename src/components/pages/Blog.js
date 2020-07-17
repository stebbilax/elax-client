import React from "react";
import axios from "axios";
import BlogCard from "../BlogCard"
import BlogPost from "../BlogPost"
// import "../../css/blog.css"

class Blog extends React.Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = { blogPosts: [], currentPost: [], on: false, scrollPosition: 0 }
        this.reset = this.reset.bind(this)
    }

    componentDidMount = async () => {
        this._isMounted = true;
        this.turnOnLoading();

        const response = await axios({
            method: "GET",
            url: "https://elax-api.herokuapp.com/api/v1/blogposts"
        })
        if (this._isMounted) {
            this.setState({ blogPosts: response.data.reverse() })
            this.turnOffLoading();
        }

        this.adjustFooterBottom();
    }


    componentWillUnmount = () => {
        this._isMounted = false;
        const footer = document.querySelector("footer");
        footer.style.bottom = "-20em";
    }

    adjustFooterBottom = () => {
        const footer = document.querySelector("footer");
        footer.style.bottom = "-6em";
    }

    renderPost(post) {
        if (this._isMounted) {
            this.setState({ currentPost: post, on: !this.state.on })
            document.querySelector("footer").style.visibility = "hidden";
            const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
            this.setState({ scrollPosition })
        }
    }

    reset() {
        if (this._isMounted) {
            this.setState({ on: !this.state.on })
            this.setState({ currentPost: [] })
            document.querySelector("footer").style.visibility = "visible";
            document.documentElement.scrollTop = document.body.scrollTop = this.state.scrollPosition;
            this.setState({ scrollPosition: 0 })
        }
    }


    turnOffLoading = () => {
        const loader = document.querySelector(".lds-ring-big")
        loader.style.transition = "1.5s";
        setTimeout(() => { loader.style.opacity = "0%"; }, 1000);

    }
    turnOnLoading = () => {
        const loader = document.querySelector(".lds-ring-big")
        loader.style.transition = "0s";
        loader.style.opacity = "100%";
    }

    render() {
        return (
            <div className="blog-container hideThis">
                {this.state.blogPosts.map(post =>
                    <div key={post.id} className={post.name} onClick={() => this.renderPost(post)}>
                        <BlogCard key={post.id} pic={post.image} title={post.name} body={post.body} />
                    </div>
                )}
                <div className="">
                    {this.state.on ? <BlogPost title={this.state.currentPost.name}
                        body={this.state.currentPost.body}
                        pic={this.state.currentPost.image}
                        reset={this.reset} /> : ""}
                </div>
            </div>

        )
    }
}

export default Blog;