import IconButton from '@material-ui/core/IconButton';
import styles from './style/details.module.scss'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import useSWR from 'swr'
import { GlobalState } from '../../context/globalState';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';




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
        
          <span className= {styles.action_cart}>
            <IconButton aria-label="add to favorites" >
                <ShoppingCartIcon fontSize= 'small'style= {{ color: UI.color }} />
            </IconButton>
            <p>₦ {product?.details?.price}</p>
          </span>

          <span>
            <IconButton aria-label="add to favorites" >
                <ArrowForwardIosIcon style= {{ color: 'rgb(29, 162, 250)' }} />
            </IconButton>
          </span>
          
    </div>
  );
}
