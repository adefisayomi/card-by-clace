import IconButton from '@material-ui/core/IconButton';
import styles from './style/action.module.scss'
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import useSWR from 'swr'
import { GlobalState } from '../../context/globalState';


const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}));


export default function Action ({handleExpandClick, expanded, product}) {

  const {UI} = GlobalState()
  const classes = useStyles();
  const {commentAction, setAlert, user} = GlobalState()

  const {data: likes} = useSWR(() => {
      return product ? `/like/${product._id}` : ''
  }, {revalidateOnFocus: true})

  const handleLike = async () => {
    await commentAction.likePost({setAlert, product, likes, user})
  }

  return (
      <div className= {styles.action} style= {{ color: UI.color}}>
        <div className= {styles.action_options}>
            {
              !expanded &&
              <span className= {styles.action_cart}>
                <IconButton aria-label="add to favorites" >
                    <ShoppingCartIcon fontSize= 'small'style= {{ color: UI.color }} />
                </IconButton>
                <p>₦ {product?.details?.price}</p>
              </span>
            }
          

            { expanded && likes &&
              <><span className= {styles.action_like}>
                <IconButton aria-label="add to favorites">
                    <FeedbackIcon fontSize= 'small' style= {{ color: UI.color }} />
                </IconButton>
                <p>{product?.meta?.comments?.length || ''}</p>
              </span>

              <span className= {styles.action_like}>
                <IconButton onClick= {handleLike} aria-label="add to favorites" color= 'inherit'>
                    <ThumbUpIcon fontSize= 'small'/>
                </IconButton>
                <p>{likes.length || ''}</p>
              </span>
              
              <span className= { styles.action_share}>
                <IconButton aria-label="share" color= 'inherit'>
                    <ShareIcon fontSize= 'small' />
                </IconButton>
              </span></>
            }
        </div>

        <div className= {styles.action_dropdown}>
          <IconButton
              color= 'inherit'
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
          </IconButton>
        </div>
    </div>
  );
}
