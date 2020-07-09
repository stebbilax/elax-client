import React from "react";
// import "../css/slider.css"

class Slider extends React.Component {
    _isMounted = false;

    state = { interval: 0 }


    componentDidMount() {
        this._isMounted = true;
        setInterval(this.decreaseInterval, 10000)
    }


    decreaseInterval = () => {
        if (this._isMounted) {
            if (this.state.interval <= (this.props.pictures.length * -100) + 100) {
                this.setState({ interval: 0 }, this.handleSlide)
            } else {
                this.setState({ interval: this.state.interval - 100 }, this.handleSlide)
            }
        }
    }


    handleSlide = () => {
        const slides = document.querySelectorAll(".slide");
        slides.forEach(slide => slide.style.transform = `translate(${this.state.interval}%)`)
    }

    componentDidUpdate() {
        // console.log(this.props.pictures.length);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        return (
            <div className="slider">
                {this.props.pictures.map((pic, index) => {
                    return (
                        <div id={pic.id} key={pic.id} className="slide">
                            <img alt="pic" src={pic.image}></img>
                        </div>
                    )
                })}
            </div>
        )
    }
}


export default Slider;