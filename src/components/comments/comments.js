import { Divider } from 'semantic-ui-react'
import CommentList from './commentList'
import styles from './style/comments.module.css'
import useSWR from 'swr'
import { Fragment} from 'react'


export default function comments ({product}) {

    const {data: comments} = useSWR(() => product ? `/comments/${product._id}` : null)
    
    return (
        <div className= {styles.comments} >
            <header>
                <a>{!comments ? 'Be the first to post a comment.' : comments.length === 0 ? '0 comments' : comments.length == 1 ? '1 comment' : `${comments.length} comments` }</a>
            </header>
            <div className= {styles.comments_body}>
                {comments && comments.length > 0 &&
                    comments.map((comment, index) => (
                        <Fragment key= {index}>
                        <CommentList comment= {comment} product= {product} />
                        <Divider/>
                        </Fragment>
                    ))
                }
            </div>
            
        </div>
    )
}