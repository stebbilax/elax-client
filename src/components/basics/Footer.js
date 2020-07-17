import React from "react";
// import "../../css/footer.css";

class Footer extends React.Component {

    render() {
        return (
            <div>
                <footer className="grid-item footer hideThis">
                    <div className="icons">
                        <a href="https://www.google.com">
                            <img src="./img/facebook-square.png" />
                        </a>
                        <a href="https://www.google.com">
                            <img src="./img/flickr-square.png" />
                        </a>
                        <a href="https://www.google.com">
                            <img src="./img/instagram.png" />
                        </a>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer;