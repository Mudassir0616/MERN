import * as api from '../api/api'

//-----------------Actions------------------

export const getPosts = ()=> async(dispatch)=>{
    try {
        const { data } = await api.fetchPosts()

        dispatch({ type:'FETCH_POSTS', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post)=> async(dispatch)=>{
    try {
        const { data } = await api.createPost(post)
        
        dispatch({type:'CREATE_POSTS', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id)=> async(dispatch)=>{
    try {
        await api.deletePost(id)

        dispatch({ type:'DELETE_POST', payload: id})
        // alert('Your memory will be removed .!!!')
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id)=> async(dispatch)=>{
    try {
        const { data } = await api.likePost(id);

        dispatch({ type:'LIKE_POST', payload: data})

    } catch (error) {
        console.log(error)
    }
}