import { GlobalState } from "../../context/globalState"
import CartList from "./cartList"
import EmptyCart from "./emptyCart"
import styles from './style/cart.module.css'
import {useRouter} from 'next/router'
import {Button} from 'semantic-ui-react'
import {useState, useEffect} from 'react'



export default function cart () {

    const {cart} = GlobalState()
    const {UI} = GlobalState()
    const router = useRouter()
    const [hide, setHide] = useState(false)

    useEffect(() => {
        const getPath = () => {
            return router.asPath.includes('checkout') ? setHide(true) : setHide(false)
        }
        getPath()
    }, [router.asPath])
    
    return (
        <div className= {styles.cart} style= {{backgroundColor: UI.body }} >
            {
                cart && cart.length > 0 ? 
                cart.map((prod, index) => (
                    <CartList key= {index} props= {prod} />
                )) : 
                <EmptyCart />
            }
            {
              !hide && cart && cart.length > 0 &&
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