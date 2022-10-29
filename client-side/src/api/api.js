import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000'})

API.interceptors.request.use( (req)=> {
    if(localStorage.getItem('userProfile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userProfile')).token}`
    }

    return req;
})

//We are using this ( interceptor.request ) because we have to send our token back to our backend so that the backened middleware(authMW.js) can verify that the user is actually loggedIn...

export const fetchPosts = ()=> API.get('/posts')

export const createPost = (newPost)=> API.post('/posts', newPost)
 
export const deletePost = (id)=> API.delete(`/posts/${id}`)

export const likePost = (id)=> API.patch(`/posts/${id}/likePost`)   

export const signIn = (formData)=> API.post(`/user/signIn`, formData)

export const signUp = (formData)=> API.post(`/user/signUp`, formData)