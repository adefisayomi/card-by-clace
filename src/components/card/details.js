import IconButton from '@material-ui/core/IconButton';
import styles from './style/details.module.scss'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import useSWR from 'swr'
import { GlobalState } from '../../context/globalState';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import router from 'next/router'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';




export default function details ({product}) {

  const {UI} = GlobalState()
  const {commentAction, setAlert, user} = GlobalState()

  const {data: likes} = useSWR(() => {
      return product ? `/like/${product._id}` : ''
  }, {revalidateOnFocus: true})

  const handleLike = async () => {
    await commentAction.likePost({setAlert, product, likes, user})
  }

  return (
      <div className= {styles.action}>

          <span className= {styles.action_like}>
            <IconButton aria-label="add to favorites"  onClick= {handleLike}>
                <ThumbUpAltIcon fontSize= 'small' style= {{ color: 'rgb(29, 162, 250)' }}/>
            </IconButton>
            <p>{likes?.length || ''}</p>
          </span>
        
          <span className= {styles.action_cart}>
            <IconButton aria-label="add to favorites" >
                <ShoppingCartIcon fontSize= 'small' style= {{ color: 'white' }}/>
            </IconButton>
            <p>₦ {product?.details?.price || '0:00'}</p>
          </span>

          <span>
            <IconButton aria-label="view product" onClick={() => router.push(`${router.asPath}/${product?._id}`)} >
                <ArrowForwardIosIcon style= {{ color: 'rgb(29, 162, 250)' }} />
            </IconButton>
          </span>
    </div>
  );
}
