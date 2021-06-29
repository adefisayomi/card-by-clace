import ProfileTab from '../re-usables/profileTab'
import styles from './style/comment_list.module.css'
import {Placeholder} from 'semantic-ui-react'
import useSWR from 'swr'
import { GlobalState } from '../../context/globalState'


export default function CommentList ({comment, product}) {

    const {user, commentAction, setAlert} = GlobalState()
    const {data: commentUser} = useSWR( () => comment && comment._id? `/user/${comment.body._id}` : null)
    const {data: comments} = useSWR(() => product ? `/comments/${product._id}` : null)

    const handleDelete = async () => {
        await commentAction.deleteComment({comments, product, comment, setAlert})
    }

    return (
        <div className= {styles.comment_list} >
            { commentUser && comment ?
            <>
            <div className= {styles.comment_list_image}>
               <ProfileTab width= '35px' user= {commentUser}/>
            </div>
            <div>
                <div className= {styles.comment_list_header}>
                    <h4>@{commentUser.username}</h4>
                    <em>{new Date(comment.date).toDateString()}</em>
                </div>
                <div className= {styles.comment_list_message}>
                    <p>{comment?.body?.comment}</p>
                </div>
                <div className= {styles.comment_list_action}>
                    <a>reply</a>
                    {user && user._id === commentUser._id && <a style= {{ color: 'grey' }} onClick= {handleDelete}>delete</a>}
                    {/* <a style= {{ color: 'grey' }}>edit</a> */}
                </div>
            </div>
            </> : 
            <Placeholder inverted style= {{ width: 35, height: 35, borderRadius: '100%' }}>
                <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                </Placeholder.Header>
            </Placeholder>
            }
        </div>
    )
}