import { GlobalState } from "../../context/globalState"
import CartList from "./cartList"
import EmptyCart from "./emptyCart"
import styles from './style/cart.module.css'
import {useRouter} from 'next/router'
import {Button} from 'semantic-ui-react'



export default function cart () {

    const {cart} = GlobalState()
    const router = useRouter()
    
    return (
        <div className= {styles.cart}>
            {
                cart && cart.length > 0 ? 
                cart.map((prod, index) => (
                    <CartList key= {index} props= {prod} />
                )) : 
                <EmptyCart />
            }
            {
              cart && cart.length > 0 &&
              <Button
                content= 'Proceed to checkout'
                color= 'blue'
                style= {{ width: '100%', maxWidth: '200px', textAlign: 'center' }}
                onClick= {() => router.push('/checkout')}
              />  
            }
        </div>
    )
}