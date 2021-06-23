import { GlobalState } from '../../context/globalState'
import styles from './style/cart_list.module.css'
import useSWR from 'swr'
import { Icon, Placeholder, Image } from 'semantic-ui-react'
import OrderOptions from '../order/order_options'
import { useEffect, useState } from 'react'


export default function CartList ({props}) {

    const {cartAction} = GlobalState()
    const {data: product} = useSWR(() => props ? `/products/query/${props._id}` : '', {revalidateOnFocus: true})
    const [form, setForm] = useState({quantity: props.quantity || '', options: props.options || {}})
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})

    const handleDelete =  () => {
        if(product) {
            cartAction({type: 'REMOVE_FROM_CART', payload: {
            _id: product._id
            }})
        }
    }

    useEffect(() => {
        const updateCart = () => {
            if (product) {
                cartAction({type: 'UPDATE_CART', payload: {
                quantity: form.quantity,
                note: form.note,
                date:  new Date() ,
                options: form.options,
                price: parseInt(form.quantity) * parseInt(product.details?.price),
                _id: product._id
            }})
            }
        }
        updateCart()
    }, [form])
    

    return (
        <div className= {styles.cart_list} >
            {
                product && product._id ? 
                <div className= {styles.cart_list_container}>
                <span className= {styles.cart_list_image}>
                    <Image src= { product?.details?.images[0].url || '' } />
                </span>
                <span className= {styles.cart_list_options}>
                    <OrderOptions product= {product}  form= {form} setForm= {setForm} />
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
                </div> : 
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