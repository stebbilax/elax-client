import React from "react";
import AOS from "aos";
import axios from "axios";

import "aos/dist/aos.css";
import Message from "../Message";
// import "../../css/contact.css"

class Contact extends React.Component {
    state = { nameInput: "", emailInput: "", messageInput: "", displayMessage: false, errorMessage: false }

    constructor() {
        super()
        AOS.init({
            duration: 1000,
            offsett: 150,
            easing: "ease-in-out",
            once: false
        });
    }

    componentDidMount() {
        this.turnOffLoading();
        if (this.props.location.state) {
            this.setState({
                messageInput: "Hi. \n\nI would like to inquire about the availability and price of " + this.props.location.state.pictureName.currentTitle + "."
            })
        }
    }
    componentDidUpdate() {
        AOS.refresh();
    }
    componentWillUnmount = () => {
        this.turnOnLoading();
    }



    handleSubmit = (event) => {
        event.preventDefault();
        this.renderLoadingScreen()
        this.sendEmail(this.state.messageInput, this.state.nameInput, this.state.emailInput)
    }

    sendEmail = async (msg, name, email) => {
        try {
            await axios({
                method: 'post',
                url: 'https://elax-api.herokuapp.com/api/v1/email',
                data: {
                    email: email,
                    text: msg,
                    name: 'Elax -- ' + name
                }
            })
            this.removeLoadingScreen()
        } catch (error) {
            console.log(error);
            this.removeLoadingScreen(error);
        }

        this.clearInputs();
    }

    renderLoadingScreen = () => {
        const ring = document.querySelector(".lds-ring");
        const form = document.querySelectorAll("#form input");
        const textArea = document.querySelector("#form textarea")
        form.forEach(input => input.classList.toggle("form-loading"))
        textArea.classList.toggle("form-loading");
        ring.style.display = "block";
    }

    removeLoadingScreen = (err) => {
        const ring = document.querySelector(".lds-ring");
        const form = document.querySelectorAll("#form input");
        const textArea = document.querySelector("#form textarea")
        form.forEach(input => input.classList.toggle("form-loading"))
        textArea.classList.toggle("form-loading");
        ring.style.display = "none";
        this.renderNotification(err)
    }
    renderNotification = (err) => {
        if (err) {
            this.setState({ errorMessage: true })
            setTimeout(this.removeError, 3000)

        } else {
            this.setState({ displayMessage: true })
            setTimeout(this.removeNotification, 3000)
        }
    }

    removeNotification = () => {
        this.setState({ displayMessage: false })
    }
    removeError = () => {
        this.setState({ errorMessage: false })

    }

    clearInputs = () => {
        this.setState({ nameInput: "", emailInput: "", messageInput: "" })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    turnOffLoading = () => {
        const loader = document.querySelector(".lds-ring-big")
        loader.style.transition = "0s";
        setTimeout(() => { loader.style.opacity = "0%"; }, 0);

    }
    turnOnLoading = () => {
        const loader = document.querySelector(".lds-ring-big")
        loader.style.transition = "0s";
        loader.style.opacity = "100%";
    }


    render() {
        return (
            <div data-aos="fade-up" className="contact hideThis" id="contact">
                <header>GET IN TOUCH</header>

                <form id="form" className="topBefore" onSubmit={(e) => this.handleSubmit(e)}>

                    <input id="name" name="nameInput" type="text" placeholder="NAME" onChange={(e) => this.handleInput(e)} value={this.state.nameInput} />
                    <input id="email" name="emailInput" type="text" placeholder="E-MAIL" onChange={(e) => this.handleInput(e)} value={this.state.emailInput} />
                    <textarea id="message" name="messageInput" type="text" placeholder="MESSAGE" onChange={(e) => this.handleInput(e)} value={this.state.messageInput}></textarea>
                    <input id="submit" type="submit" value="SEND" />
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    {this.state.displayMessage && <Message message="Message has been sent!" class="form-sent-notification" />}
                    {this.state.errorMessage && <Message message="There was an error. Please try again." class="form-sent-notification" />}
                </form>
            </div>
        )
    }

}

export default Contact;