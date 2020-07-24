import React, { useEffect, useState } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import axios from "axios";

import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles({
    textArea: {
        textAlign: 'center',
        width: 'auto'
    }
})



const Edit = (props) => {
    const classes = useStyles();
    const [nameText, setNameText] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [url, setUrl] = useState("");
    const [id, setId] = useState("");
    const [token, setToken] = useState("");
    const [currentType, setCurrentType] = useState("picture");

    useEffect(() => {
        assignValues();
        setToken(props.token)
        setId(props.object.picture._id)
        setCurrentType(props.object.type)
    }, []);

    const deleteObj = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.delete(`https://elax-api.herokuapp.com/api/v1/${currentType}s/${id}`, {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            props.refreshFunc(currentType)
            props.close()
        } catch (error) {
            console.error(error);
        }
    }

    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.patch(`https://elax-api.herokuapp.com/api/v1/${currentType}s/${id}`, {
                name: nameText,
                description: bodyText
            }, {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            props.refreshFunc(currentType)
            props.close()
        } catch (error) {
            console.error(error);
        }
    }
    const back = (props) => {
        props.close()
    }

    const handleChange = (e) => {
        if (e.target.name === "name") {
            setNameText(e.target.value);
        } else if (e.target.name === "body") {
            setBodyText(e.target.value);
        }

    }

    const assignValues = () => {
        if (props.object.type === "picture") {
            const { _id, name, description, image } = props.object.picture;
            setBodyText(description);
            setId(_id);
            setNameText(name);
            setUrl(image)
        } else if (props.object.type === 'blogpost') {
            const { _id, name, body, image } = props.object.picture;
            setBodyText(body);
            setId(_id);
            setNameText(name);
            setUrl(image)
        }
    }

    const renderEditor = () => {
        return (
            <div className="admin-edit-picture">
                <img src={url} />
                <TextField name="name" className={classes.textArea} id='standard-basic' value={nameText} onChange={handleChange} />
                <textarea name="body" className="admin-edit-blogpost-text" value={bodyText} onChange={handleChange} />
            </div>
        )
    }



    return (
        <div className="admin-edit">
            {renderEditor()}
            <Button variant="contained" color="primary" onClick={() => back(props)}>
                Back
            </Button>
            <Button variant="contained" color="default" onClick={e => submit(e)}>
                Save
            </Button>
            <Button variant="contained" color="secondary" onClick={(e) => deleteObj(e)}>
                Delete
            </Button>
        </div >
    )
}


export default Edit;