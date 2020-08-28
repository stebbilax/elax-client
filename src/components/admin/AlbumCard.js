
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { CardHeader, IconButton, CardMedia } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const AlbumCard = (props) => {
    const classes = useStyles();
    const { imgUrl, title, albumObj, openFunc } = props;

    return (
        <Card className={classes.root}>
            <CardHeader
                action={
                    <IconButton aria-label="settings" onClick={() => openFunc(albumObj)}>
                        <EditIcon />
                    </IconButton>
                }
                title={title}
            />
            <CardMedia image={imgUrl} style={{ height: "250px" }} />
            <CardActions>
                <Button size="medium" style={{ color: "red" }} >Delete</Button>
            </CardActions>
        </Card>
    );
}


export default AlbumCard;