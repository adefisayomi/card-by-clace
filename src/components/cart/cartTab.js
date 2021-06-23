import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { GlobalState } from '../../context/globalState';
import styles from './style/cart_tab.module.css'



export default function CardTab () {

  const { cart } = GlobalState()

  return (

    <div className= {styles.cart_tab}>
        <IconButton aria-label="add to cart" color= 'inherit'>
            <ShoppingCartIcon style= {{ fontSize: '16px' }} />
        </IconButton>
        <p>{cart && cart.length > 0 ? cart?.length : '0' }</p>
    </div>
  );
}
