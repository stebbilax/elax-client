import axios from "axios";

const createPicture = async (file, title, body, token, id) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', title)
    formData.append('description', body)
    try {
        await axios.post(`https://elax-api.herokuapp.com/api/v1/albums/${id}/pictures`, formData, {
            'headers': {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.error(error);
    }
}
const createBlogpost = async (file, title, body, token) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', title)
    formData.append('body', body)
    try {
        await axios.post(`https://elax-api.herokuapp.com/api/v1/blogposts`, formData, {
            'headers': {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.error(error);
    }
}
const createAlbum = async (title, token) => {
    try {
        await axios.post(`https://elax-api.herokuapp.com/api/v1/albums`, {
            name: title
        }, {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.error(error);
    }
}




export const CreateHelper = (token, type, title, body, file, albumId) => {
    if (type === "picture") return createPicture(file, title, body, token, albumId);
    if (type === "blogpost") return createBlogpost(file, title, body, token);
    if (type === "album") return createAlbum(title, token);
}