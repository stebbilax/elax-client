import React from 'react';
import { Card, CardMedia, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    blogpostCard: {
        height: "250px",
        width: "350px",
        padding: "0px",
        marginBottom: "13px"
    }
})



const BlogpostCard = (props) => {


    const classes = useStyles();
    const { name, image } = props.blogpost;
    return (
        <Card onClick={() => props.openFunc(props.blogpost, "blogpost")} className="admin-picture-card" style={{ marginBottom: "1em" }}>
            <CardHeader title={name} />
            <CardMedia image={image} className={classes.blogpostCard} />

        </Card>
    )
}

export default BlogpostCard;