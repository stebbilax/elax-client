import React from "react";
import axios from "axios";
import AOS from "aos";
import Slider from "../Slider";
import HomePageBlog from "../HomePageBlog";
// import "../../css/home.css"
import "aos/dist/aos.css";


class Home extends React.Component {
    _isMounted = false;

    state = { pictures: [] }

    componentDidMount = async () => {
        this._isMounted = true;
        this.turnOnLoading();


        const response = await axios({
            method: 'GET',
            url: "https://elax-api.herokuapp.com/api/v1/albums/5f130bf66934420017e565e8"
        })
        if (response.data && this._isMounted) {
            this.setState({ pictures: response.data.pictures })
            this.turnOffLoading();
        }


        this.adjustFooterBottom();
        AOS.init({
            duration: 1000
        })
    }
    componentWillUnmount = () => {
        const footer = document.querySelector("footer");
        footer.style.bottom = "-20em";
        this._isMounted = false;
    }

    // componentDidUpdate = () =>{
    //     console.log(this.state);

    // }

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

    adjustFooterBottom = () => {
        const footer = document.querySelector("footer");
        footer.style.bottom = "-88em";
    }


    render() {
        return (
            <div className="home-page">
                <Slider pictures={this.state.pictures} />
                <div className="home-content">
                    <div className="first-container">
                        <div className="first-container-img">
                            <img alt="pic" src="./img/profile2.jpg"></img>
                        </div>
                        <div data-aos="fade-left" className="first-container-text">
                            <div className="welcome">
                                <h2>Welcome!</h2>
                            </div>
                            <div className="text">
                                <p>We are Stan & Jane and together we are Stan Seaton Photography.
                                <br></br>
                                    <br></br>
                                We have worked together as a team for 16 years. Over this time we have travelled to some amazing and beautiful locations from places just around the corner to the other side of the world to photograph people and document special moments in their lives.
                                We absolutely love doing what we do and certainly can’t imagine ever doing anything other than photography, we hope this is reflected in what you see throughout our website.</p>
                            </div>
                            <div className="link">
                                <a href="/contact">Contact Me</a>
                            </div>
                        </div>
                    </div>
                    <div className="second-container">
                        <div className="home-page-blog">
                            <HomePageBlog />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Home;