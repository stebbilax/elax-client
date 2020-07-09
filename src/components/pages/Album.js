import React from "react";
import ImageCard from "../ImageCard"
import { Redirect } from "react-router-dom";
import AOS from "aos";
import SlideShow from "../SlideShow"
// import "../../css/gallery.css"

class Album extends React.Component {
    state = { album: [], redirect: false, selectedPic: "", prevScroll: 0 }

    constructor() {
        super()
        AOS.init({
            duration: 1000,
            once: true,
        });
    }

    componentDidMount() {
        const imageList = document.querySelector(".image-list");
        imageList.style.gridTemplateColumns = " repeat(auto-fill, minmax(400px, 1fr))"
        // imageList.style.gridGap = "10.5px 29px"

        this.setState({ album: this.props.location.state })
    }
    componentDidUpdate() {
        if (this.state.selectedPic.length === 0) {
            window.scrollTo(0, this.state.prevScroll)
        }
    }

    handleBackButton = () => {
        this.setState({ redirect: !this.state.redirect })
    }

    handleOpenPic = async (pic) => {
        this.setState({ selectedPic: pic })
    }

    handleCloseSlide = (x) => {

        this.setState({ prevScroll: x })

        this.setState({ selectedPic: "" })
    }

    render() {
        {
            if (this.state.redirect) {
                return <Redirect to="/" />
            }
        }
        {
            if (this.state.selectedPic.length !== 0) {

                return <SlideShow album={this.state.album} selectedPic={this.state.selectedPic} back={this.handleCloseSlide} prevScroll={window.pageYOffset} />
            }
        }


        const { pictures } = this.state.album;
        const renderPictures = pictures ? pictures.map(photo => {
            const { title, description, id } = photo;
            const url = photo.image;

            return <ImageCard classN={["individual-picture", "album-photo", `${id}`]}
                key={id}
                title={title}
                description={description}
                url={url}
                open={this.handleOpenPic}
                album={photo}
            />
        }) : ""





        return (
            <div className="full-album">
                {/* <button className="back-button" onClick={this.handleBackButton}><h2>Back</h2></button> */}
                <div className="image-list">
                    {renderPictures}
                </div>
            </div>
        )
    }
}

export default Album;



