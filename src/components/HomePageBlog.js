import React from "react";
import axios from "axios";
import Aos from "aos";
import BlogCard from "./BlogCard";
import BlogPost from "./BlogPost";
import "aos/dist/aos.css";
// import ".././css/blog.css";
// import ".././css/homepageblog.css";

class HomePageBlog extends React.Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = { blogPosts: [], currentPost: [], on: false }
        this.reset = this.reset.bind(this)
        Aos.init();
    }

    componentDidMount = async () => {
        this._isMounted = true;

        const response = await axios({
            method: "GET",
            url: "https://elax-api.herokuapp.com/api/v1/blogposts"
        })
        if (this._isMounted) {
            this.setState({ blogPosts: response.data })
        }

    }



    componentWillUnmount() {
        this._isMounted = false;
    }

    renderPost(post) {
        if (this._isMounted) {
            this.setState({ currentPost: post, on: !this.state.on })
            document.querySelector("footer").style.visibility = "hidden";
        }
    }

    reset() {
        if (this._isMounted) {
            this.setState({ on: !this.state.on })
            this.setState({ currentPost: [] })
            document.querySelector("footer").style.visibility = "visible";
        }
    }





    render() {
        return (
            <div className="blog-container-home hideThis">
                <div className="blog-title-home">
                    <h2>Recent Blog Posts</h2>
                </div>
                {this.state.blogPosts.map((post, index) => {
                    if (index > this.state.blogPosts.length - 4) {
                        return (
                            <div aos="fade-right" key={post.id} className={post.title} onClick={() => this.renderPost(post)}>
                                <BlogCard key={post.id} pic={post.image} title={post.name} body={post.body} />
                            </div>
                        )
                    }
                }
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

export default HomePageBlog;