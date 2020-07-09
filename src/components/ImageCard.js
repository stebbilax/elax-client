import React from "react";


class ImageCard extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = { spans: 0 }
        this.imageRef = React.createRef();

    }

    componentDidMount() {
        this._isMounted = true;
        this.imageRef.current.addEventListener('load', this.setSpans)
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    setSpans = () => {
        if (this._isMounted) {
            const height = this.imageRef.current.clientHeight;
            const spans = Math.ceil(height / 10)
            this.setState({ spans })
        }
    }

    render(props) {


        const { classN, url, title, open, album } = this.props;
        return (

            <div className={classN[0]} onClick={() => open(album)} style={{ gridRowEnd: `span ${this.state.spans}` }}>
                <div className={"_" + classN[2]}></div>
                <div className={classN[1]}><p>{title}</p></div>
                <img alt={title} src={url} ref={this.imageRef}></img>
            </div>

        )
    }
}

export default ImageCard;