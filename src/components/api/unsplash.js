import axios from "axios";

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID rrxOOm2wxNVnci1QQ8wSkOAzlRe_mlZueQgIq-cModk',
    }
});