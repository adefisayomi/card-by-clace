import { GlobalState } from '../../context/globalState'
import styles from './style/cart_list.module.css'
import useSWR from 'swr'
import Slider from '../slider/slider'
import { Icon, Placeholder } from 'semantic-ui-react'
import OrderOptions from '../order/order_options'
import { useState } from 'react'


export default function CartList ({props}) {

    const {setAlert, cartAction, cart} = GlobalState()
    const {data: product} = useSWR(() => props ? `/products/query/${props._id}` : '', {revalidateOnFocus: true})
    const [form, setForm] = useState({})
    const getForm = (e) => setForm({...form, [e.target.name ]: e.target.value})

    const handleDelete = async () => {
        await cartAction.removeFromCart({setAlert, product, cart})
    }

    

    return (
        <div className= {styles.cart_list} >
            {
                product && product._id ? 
                <>
                <span className= {styles.cart_list_image}>
                    <Slider dots= {false} images= {product?.details?.images} />
                </span>
                <span className= {styles.cart_list_options}>
                    <OrderOptions form= {form} getForm= {getForm} availableQuantity= {product?.details?.quantity} />
                </span>
                <span className= {styles.cart_list_delete}>
                    <Icon
                        name= 'cancel'
                        color= 'red'
                        link
                        circular
                        onClick= {handleDelete}
                    />
                </span>
                </> : 
                <Placeholder inverted>
                    <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Header>
                </Placeholder>
            }
        </div>
    )
}