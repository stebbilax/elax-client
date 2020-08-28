import React from 'react';
import { Card, CardMedia, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    pictureCard: {
        height: "250px",
        width: "350px",
        padding: "0px",
        marginBottom: "13px"
    }
})

const PictureCard = (props) => {
    const classes = useStyles();
    const { imgUrl, title, openFunc, picture } = props;
    return (
        <Card onClick={() => openFunc(picture, "picture")} className="admin-picture-card" style={{ marginBottom: "1em" }}>
            <CardHeader title={title} />
            <CardMedia image={imgUrl} className={classes.pictureCard} />
        </Card>
    )
}

export default PictureCard;