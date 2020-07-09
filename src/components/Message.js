import React from "react";


class Message extends React.Component {


    render() {
        return (
            <div data-aos="fade-up" className={this.props.class}><p>{this.props.message}</p></div>
        )
    }
}


export default Message