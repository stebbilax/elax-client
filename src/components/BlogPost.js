import React, { useEffect } from 'react';

const BlogPost = (props) => {

    useEffect(() => {
        currentPost()
        return function cleanUp() {
            const closeBtn = document.querySelector(".close")

            closeBtn.removeEventListener("click", closeCurrentPost)
            document.removeEventListener("click", closeWindow)
            console.log("cleanUp");


        }
    })

    const currentPost = () => {

        const blogText = document.querySelector(".blog-text")
        const closeBtn = document.querySelector(".close")
        const curPost = document.querySelector(".current-post-container");

        if (curPost) {
            curPost.style.visibility = "visible"
        }

        // Scroll text into view
        blogText.scrollIntoView();
        // Add event listeners to close window
        closeBtn.addEventListener("click", closeCurrentPost)
        document.addEventListener("click", closeWindow)
        // }, { once: true })
    }

    const closeWindow = (event) => {
        const currentPost = document.querySelector(".current-post");

        if (!currentPost.contains(event.target)) {
            console.log("closeWindow");

            closeCurrentPost();
        }
    }

    const closeCurrentPost = () => {


        const curPost = document.querySelector(".current-post-container");
        const closeBtn = document.querySelector(".close")

        if (curPost) {

            closeBtn.removeEventListener('click', closeCurrentPost)
            curPost.style.visibility = "hidden"

        }
        props.reset()
        return
    }


    return (
        <div className="current-post-container">
            <div className="grey-out"></div>
            <div className="current-post">
                <div className="blog-text">
                    <h1>{props.title}</h1>
                    <p>{props.body}</p>
                </div>
                <img alt="blog-card-img" src={props.pic} />
                <i className="close fas fa-times"></i>
            </div>
        </div>
    );
}



export default BlogPost;