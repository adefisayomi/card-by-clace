import { GlobalState } from '../../context/globalState'
import styles from './style/comment_form.module.css'
import { useState } from 'react'
import useSWR from 'swr'


export default function CommentForm ({product}) {

    const {UI} = GlobalState()
    const {commentAction, setAlert} = GlobalState()
    const [comment, setComment] = useState('')
    const getComment = (e) => setComment(e.target.value)
    const {data: comments} = useSWR(() => product ? `/comments/${product._id}` : null)


    const handleComment = async (e) => {
        if (comment) {e.preventDefault()
        await commentAction.addComment({comments, product, comment, setAlert})
        setComment('')}
    }

    return (
        <div className= {styles.comment_form} style= {{ backgroundColor: UI.body, border: UI.border}}>
        <textarea
          onChange= {getComment}
          value= {comment || ''}
          placeholder= 'Post a Comment...'
          />
          <a onClick= {handleComment} href="#">post</a>
    </div> 
    )
}