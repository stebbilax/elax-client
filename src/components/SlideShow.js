import React from "react";
import { Link } from "react-router-dom";
import { Swipeable } from 'react-swipeable'
import AOS from "aos";
// import "../css/slideshow.css";
import "aos/dist/aos.css";


class SlideShow extends React.Component {
    _isMounted = false;

    state = { index: 0, currentURL: "", currentID: 0, currentTitle: "", currentDescription: "" }
    constructor(props) {
        super(props)

        AOS.init({
            duration: 500
        })
    }
    componentDidUpdate() {
        AOS.refresh();
        document.querySelector(".picture-container").classList.add("fade-in")

    }
    componentDidMount() {
        this._isMounted = true;
        window.scrollTo(0, 0);
        const footer = document.querySelector("footer");
        footer.style.bottom = "-29em";
        const { album, selectedPic } = this.props


        const { description, title } = selectedPic
        const foundIndex = album.pictures.findIndex(pic => pic === selectedPic)


        this.currentDescriptionAndTitle(description, title)
        this.currentPic(foundIndex);
        document.querySelector(".black-out").style.visibility = "visible";
        // document.querySelector(".black-out").style.opacity = "95%";
        // document.querySelector(".close").style.opacity = "95%";

        // this.scrollToPic();
        this.EventListeners();

    }
    componentWillUnmount() {
        document.querySelector(".black-out").style.visibility = "hidden"
        this._isMounted = false;

    }

    handleSwipe = (direction) => {
        if (this._isMounted) {
            document.querySelector(".picture-container").classList.add("fade-out")

            setTimeout(() => this.handleArrows(direction), 300)
        }
    }
    removeFade = () => {
        if (this._isMounted) {
            document.querySelector(".picture-container").classList.remove("fade-out")
        }
    }





    handleArrows = (direction) => {
        if (this._isMounted) {
            const albumLength = this.props.album.pictures.length

            if (direction === "left" && this.state.index > 0) {
                this.setState({ index: (this.state.index - 1) }, this.currentPic)

            } else if (direction === "right" && this.state.index < (albumLength - 1)) {
                this.setState({ index: (this.state.index + 1) }, this.currentPic)

            } else if (direction === "left" && this.state.index <= 0) {
                this.setState({ index: (albumLength - 1) }, this.currentPic)

            } else if (direction === "right" && this.state.index >= (albumLength - 1)) {
                this.setState({ index: 0 }, this.currentPic)
            }
        }
    }


    currentPic = (index) => {
        if (this._isMounted) {
            if (index) {
                this.setState({ index: (index) })
                const currentPIC = this.props.album.pictures[index]
                this.setState({ currentURL: currentPIC.image, currentID: currentPIC.id }, this.setCurrDescAndTitle)



            } else {
                const currentPIC = this.props.album.pictures[this.state.index]
                this.setState({ currentURL: currentPIC.image, currentID: currentPIC.id }, this.setCurrDescAndTitle)
            }
        }

    }
    currentDescriptionAndTitle = (desc, title) => {
        if (this._isMounted) {
            this.setState({ currentTitle: title, currentDescription: desc })
        }
    }

    setCurrDescAndTitle = () => {
        if (this._isMounted) {
            const newTitle = this.props.album.pictures[this.state.index].title
            const newDescription = this.props.album.pictures[this.state.index].description

            this.setState({ currentTitle: newTitle, currentDescription: newDescription }, this.removeFade)
        }
    }

    handleCloseSlide = () => {
        if (this._isMounted) {
            document.querySelector(".black-out").style.visibility = "hidden"
            this.setState({ index: 0, currentURL: "", currentTitle: "", currentDescription: "" })

            this.props.back(this.props.prevScroll);

        }
    }

    scrollToPic = () => {
        if (this._isMounted) {
            document.querySelector(".picture-container").scrollIntoView()
        }
    }


    EventListeners = () => {
        if (this._isMounted) {
            // document.querySelector(".actual-pic").addEventListener("click", () => this.handleArrows("right"))
            window.addEventListener("keydown", (e) => {
                const code = e.which || e.keyCode
                if (code == '37') {
                    this.handleArrows("left");
                } else if (code == '39') {
                    this.handleArrows("right")
                }
            })
        }
    }






    render() {
        const currentTitle = this.state.currentTitle;
        return (
            <div className="whole-slide-show">
                <div className="slide-show">
                    <div className="close-button">
                        <button onClick={this.handleCloseSlide}>Back</button>
                    </div>
                    <div className="left-arrow">
                        <i onClick={() => this.handleArrows("left")} className="fas fa-long-arrow-alt-left"></i>
                    </div>
                    <Swipeable onSwipedLeft={() => this.handleSwipe("left")} onSwipedRight={() => this.handleSwipe("right")}>
                        <div data-aos="slide-right" className="picture-container">
                            {/* <i onClick={this.handleCloseSlide} className="close fas fa-times"></i> */}
                            <img alt="pic" className={this.state.currentURL, "actual-pic"} src={`${this.state.currentURL}`}></img>
                        </div>
                    </Swipeable>
                    <div className="right-arrow">
                        <i onClick={() => this.handleArrows("right")} className="fas fa-long-arrow-alt-right"></i>
                    </div>


                </div>
                <div className="picture-info">
                    <div className="picture-info-box">
                        <h2>{this.state.currentTitle}</h2>
                        <p>{this.state.currentDescription}</p>
                        <Link onClick={this.handleCloseSlide} to={{
                            pathname: "/contact",
                            state: {
                                pictureName: { currentTitle }
                            }
                        }}>Inquire about availability</Link>
                    </div>
                </div>
            </div>
        )
    }
}


export default SlideShow;