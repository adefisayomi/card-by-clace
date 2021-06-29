import { GlobalState } from '../../context/globalState'
import styles from './style/cart_list.module.css'
import useSWR from 'swr'
import { Icon, Placeholder, Image } from 'semantic-ui-react'
import OrderOptions from '../order/order_options'
import { useEffect, useState } from 'react'


export default function CartList ({props}) {

    const {cartAction, UI, cart} = GlobalState()
    const {data: product} = useSWR(() => props ? `/products/query/${props._id}` : '', {revalidateOnFocus: true})
    const [form, setForm] = useState({quantity: props?.quantity, options: props?.options})
    const getNote = (e) => setForm({...form, options: { ...form.options, [e.target.name]: e.target.value }})
    const getColor = (e, {value}) => setForm({...form, options: {...form.options, color: value}})
    const getSize = (e, {value}) => setForm({...form, options: {...form.options, size: value}})
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})

    const handleDelete =  () => {
        if(product) {
            cartAction({type: 'REMOVE', payload: {_id: product._id}})
        }
    }

    useEffect(() => {
        const updateCart = () => {
            if (product) {
                cartAction({type: 'UPDATE', payload: {
                ...form,
                price: product.details.price,
                _id: product._id
            }})
            }
        }
        updateCart()
    }, [form])

    return (
        <div className= {styles.cart_list} style= {{ borderBottom: UI.border }} >
            {
                product && product._id ? 
                <div className= {styles.cart_list_container}>
                <span className= {styles.cart_list_image}>
                    <Image src= { product?.details?.images[0].url || '' } />
                </span>
                <span className= {styles.cart_list_options}>
                    <OrderOptions getColor= {getColor} getSize= {getSize} getForm= {getForm} form= {form} product= {product} />
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