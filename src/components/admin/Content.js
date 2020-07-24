import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import axios from "axios";

import AlbumCard from "./AlbumCard";
import PictureCard from "./PictureCard";
import Edit from "./Edit";
import Create from "./Create";
import BlogpostCard from './BlogpostCard';

const Content = (props) => {
    const [albums, setAlbums] = useState([]);
    const [blogposts, setBlogposts] = useState([]);
    const [focusAlbum, setFocusAlbum] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [blogpostMenu, setBlogpostMenu] = useState(false);
    const [openObject, setOpenObject] = useState({});
    const [needToRefreshAlbums, setNeedToRefreshAlbums] = useState(false);
    const [needToRefreshBlogposts, setNeedToRefreshBlogposts] = useState(false);

    useEffect(() => {
        getAlbums();
        getBlogposts();
    }, []);

    useEffect(() => {
        if (needToRefreshAlbums) getAlbums();
        if (needToRefreshBlogposts) getBlogposts();
    })

    // useEffect(() => {
    //     console.log(albums);
    // })

    const getAlbums = async () => {
        const response = await axios({
            method: 'GET',
            url: "https://elax-api.herokuapp.com/api/v1/albums"
        })
        if (response) setAlbums(response.data)
        setNeedToRefreshAlbums(false)
    }
    const getBlogposts = async () => {
        const response = await axios({
            method: 'GET',
            url: "https://elax-api.herokuapp.com/api/v1/blogposts"
        })
        if (response) setBlogposts(response.data)
        setNeedToRefreshBlogposts(false);
    }

    const openAlbum = (album) => {
        setFocusAlbum(album)
    }
    const closeEdit = () => {
        setIsEditOpen(false);
    }
    const closeCreate = () => {
        setIsCreateOpen(false);
    }

    const openEdit = (picture, type) => {
        setOpenObject({ picture, type })
        setIsEditOpen(true)
    }
    const toggleBlogpostMenu = () => {
        setBlogpostMenu(!blogpostMenu);
    }

    const refresh = (category) => {
        setFocusAlbum(false)
        category === "picture" ? setNeedToRefreshAlbums(true) : setNeedToRefreshBlogposts(true);
    }

    const makePictureCard = (picture) => {
        return (
            <PictureCard openFunc={openEdit} title={picture.name} imgUrl={picture.image} id={picture._id} picture={picture} />
        )
    }

    const makeFocusAlbum = () => {
        if (focusAlbum) {
            return (
                <div className="admin-side-content">
                    <h1>{focusAlbum.name}</h1>
                    {focusAlbum.pictures.map(pic => makePictureCard(pic))}
                </div>
            )
        }
        return ""

    }

    const makeCards = (album) => {
        if (album.pictures.length < 1) {
            return (
                <Grid item xs={4} s={4}>
                    <AlbumCard title={album.name} imgUrl={"https://images.unsplash.com/photo-1579379235336-016bad33f23a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"} openFunc={openAlbum} albumObj={album} />
                </Grid>
            )
        }
        return (
            <Grid item xs={4} s={4}>
                <AlbumCard title={album.name} imgUrl={album.pictures[0].image} openFunc={openAlbum} albumObj={album} />
            </Grid>
        )
    }

    const makeBlogpostCards = (blogpost) => {
        return (
            <Grid item xs={12} s={12}>
                <BlogpostCard blogpost={blogpost} openFunc={openEdit} />
            </Grid>
        )
    }

    const renderBlogpostMenu = () => {
        return (
            <div className="admin-blogpost-menu">
                <Button variant="contained" onClick={() => toggleBlogpostMenu()}>Blogposts</Button>
                <Button variant="contained" color="secondary" onClick={() => createNew("blogpost")}>Create New</Button>

                {blogposts.map(post => makeBlogpostCards(post))}
            </div>
        )
    }

    const createNew = (type) => {
        setIsCreateOpen(true);
    }
    if (isCreateOpen) {
        return <Create closeFunc={closeCreate} refreshFunc={refresh} token={props.token} />
    }

    if (isEditOpen) {
        return <Edit object={openObject} token={props.token} close={closeEdit} refreshFunc={refresh} />
    }

    if (blogpostMenu) {
        return (
            renderBlogpostMenu()
        )
    }


    return (
        <div className="admin-content">
            <div className="admin-main-content">
                <Button variant="contained" onClick={() => toggleBlogpostMenu()}>Albums</Button>
                <Button variant="contained" color="secondary" onClick={() => createNew("album")}>Create New</Button>
                <Grid container spacing={4}>
                    {albums.map(album => makeCards(album))}
                </Grid>
            </div>
            <div >
                {makeFocusAlbum()}
            </div>
        </div>
    )
};

export default Content;