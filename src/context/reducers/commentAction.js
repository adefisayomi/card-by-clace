import {mutate, trigger} from 'swr'
import axios from 'axios'



const addComment = async ({comments, product, comment, setAlert}) => {
    try{
        mutate(`/comments/${product._id}`, [...comments, { body: {comment}}], false)
        const res = await axios.post(`/comments/${product._id}`, {comment})
        if(res && !res.data.success) {
            return setAlert({message: res.data.message, type: 'error'})
        }
        setAlert({message: res.data.message})
        trigger(`/comments/${product._id}`)
    }
    catch(err) {
        return ({success: false, message: err.message, data: null})
    }
}

const deleteComment = async ({comments, product, comment, setAlert}) => {
    mutate(`/comments/${product._id}`, comments.filter(comments => comments._id !== comment._id), false)
    const res = await axios.delete(`/comments/${product._id}/${comment._id}`)
    if (res && !res.data.success) {
        return setAlert({message: res.data.message, type: 'error'})
    }
    setAlert({message: res.data.message})
    trigger(`/comments/${product._id}`)
}

const likePost = async ({likes, product, user, setAlert}) => {
    mutate(`/like/${product._id}`, () => {
        const alreadyLiked = likes.filter(like => like._id === user._id)[0]
        if(alreadyLiked) {
            return likes.filter(like => like._id !== user._id)
        }
        else {
            return [...likes, {_id: user._id}]
        }
    }, false)
    const res = await axios.post(`/like/${product._id}`)
    if (res && !res.data.success) {
        return setAlert({message: res.data.message, type: 'error'})
    }
    setAlert({message: res.data.message})
    trigger(`/like/${product._id}`)
}

export const commentAction = {
    addComment, likePost, deleteComment
}