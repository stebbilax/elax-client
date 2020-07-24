import React, { useEffect, useState } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { TextField, Input, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import axios from "axios";

import { CreateHelper } from "./CreateHelper";
import { refresh } from 'aos';





const useStyles = makeStyles({
    formControl: {
        margin: "1em",
        minWidth: 120,
    },
    textArea: {
        textAlign: 'center',
        width: 'auto'
    }
})



const Create = (props) => {
    const classes = useStyles();
    const [nameText, setNameText] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [token, setToken] = useState("");
    const [currentType, setCurrentType] = useState("");
    const [currentAlbum, setCurrentAlbum] = useState("5f12fdef6934420017e565d5");
    const [allAlbums, setAllAlbums] = useState([]);

    useEffect(() => {
        setToken(props.token)
        getAlbums()
    }, []);

    const back = function (props) {
        props.closeFunc()
        props.refreshFunc(currentType)
    }

    const submit = async (e) => {
        e.preventDefault()
        await CreateHelper(token, currentType, nameText, bodyText, file, currentAlbum);
        back(props);
    }

    const getAlbums = async () => {
        try {
            const res = await axios.get('https://elax-api.herokuapp.com/api/v1/albums')
            setAllAlbums(res.data)
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        if (e.target.name === "name") {
            setNameText(e.target.value);
        } else if (e.target.name === "body") {
            setBodyText(e.target.value);
        }
    }
    const changeType = (type) => {
        setCurrentType(type)
    }

    const onFileChange = (e) => {
        setFile(e.target.files[0])
        setFileUrl(URL.createObjectURL(e.target.files[0]))
        console.log(file);
    }
    const selectMenuItems = (album) => {
        return <MenuItem name={album.name} value={album._id}>{album.name}</MenuItem>
    }

    const handleAlbumChange = (e) => {
        setCurrentAlbum(e.target.value)
    }

    const renderSelectField = () => {
        if (currentType === "picture") {
            return (
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Please Select Album</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currentAlbum}
                            onChange={handleAlbumChange}
                        >
                            {allAlbums.map(album => selectMenuItems(album))}
                        </Select>
                    </FormControl>
                </div>
            )
        }
    }



    const renderEditor = () => {
        if (currentType === "blogpost" | currentType === "picture") {
            return (
                <div className="admin-edit-picture">
                    <h2>{currentType}</h2>
                    <img style={{ width: "30%", height: "auto" }} src={fileUrl} />
                    <Input type="file" onChange={e => onFileChange(e)} />
                    <TextField name="name" className={classes.textArea} id='standard-basic' value={nameText} onChange={handleChange} />
                    <textarea name="body" className="admin-edit-blogpost-text" value={bodyText} onChange={handleChange} />
                    {renderSelectField()}
                </div>
            )
        }
        if (currentType === "album") {
            return (
                <div className="admin-edit-picture">
                    <h3>Please Pick a Name</h3>
                    <TextField name="name" className={classes.textArea} id='standard-basic' value={nameText} onChange={handleChange} />
                    {renderSelectField()}
                </div>
            )
        }
    }



    return (
        <div className="admin-edit">
            <Button variant="outlined" color="default" onClick={() => changeType('album')}>
                Album
            </Button>
            <Button variant="outlined" color="default" onClick={() => changeType('blogpost')}>
                Blogpost
            </Button>
            <Button variant="outlined" color="default" onClick={() => changeType('picture')}>
                Picture
            </Button>
            {renderEditor()}
            <Button variant="contained" color="primary" onClick={() => back(props)}>
                Back
            </Button>
            {currentType ?
                <Button variant="contained" color="default" onClick={e => submit(e)}>
                    Save
            </Button> : ""}
        </div >
    )
}


export default Create;