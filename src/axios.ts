import axios from 'axios';

 const instance = axios.create({
    baseURL: 'https://burger-builder-c1aad.firebaseio.com/'
})

export default instance;