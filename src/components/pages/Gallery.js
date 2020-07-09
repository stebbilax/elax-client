import React from "react";
import { Redirect } from "react-router-dom";
import AOS from "aos";


import axios from "axios";
import ImageCard from "../ImageCard";
// import "../../css/gallery.css"



class Gallery extends React.Component {
    state = { albums: [], redirect: false, selectedAlbum: [] }


    constructor() {
        super()
        AOS.init({
            duration: 2000,
        });
    }

    componentDidMount = async () => {
        // document.querySelector("body").classList.toggle("overflow-hidden")
        const response = await axios({
            method: 'GET',
            url: "https://elax-api.herokuapp.com/api/v1/albums"
        })
        this.setState({ albums: response.data.data })
    }

    componentWillUnmount() {
        // document.querySelector("body").classList.toggle("overflow-hidden")

    }



    // Set selected album and turn on redirect in state
    setRedirect = (album) => {
        this.setState({ redirect: !this.state.redirect, selectedAlbum: album })
    }


    render() {
        {
            if (this.state.redirect) {
                return <Redirect to={{
                    pathname: "/album",
                    state: this.state.selectedAlbum
                }} />
            }
        }
        const renderAlbumCover = this.state.albums.map((album, index) => {
            const openAlbum = <Redirect to="/album" />
            if (album.pictures.length < 1) {
                return
            }
            const {
                pictures: pic,
                name: name,
                id: id
            } = album;


            const url = pic[0].image;

            return <ImageCard key={id} classN={["individual-picture", "hover-album"]} url={url} title={name} open={this.setRedirect} album={album} increment={index} />
        })




        return (
            <div data-aos="fade-up" className="image-list">
                {renderAlbumCover}
            </div>


        )
    }
}


export default Gallery;