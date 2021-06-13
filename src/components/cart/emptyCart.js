import styles from './style/empty_cart.module.css'
import {Icon} from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'


export default function EmptyCart () {

    const {UI} = GlobalState()

    
    return (
        <div className= {styles.empty_cart} style= {{ backgroundColor: UI.body }}>
            <Icon
                name= 'opencart'
                color= 'teal'
                circular
                size= 'large'
            />
            <p>Your cart is completely Empty.</p>
        </div>
    )
}