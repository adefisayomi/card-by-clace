import {mutate, trigger} from "swr"
import axios from 'axios'


async function addToCart({form, cart, setAlert, product}) {
    mutate('/cart', () => {
        const alreadyAdded = cart && cart.length > 0 && cart.filter(prod => prod._id == form._id)[0]
        if(alreadyAdded) {
            const productIndex = cart.findIndex( prod => prod._id == form._id )
            cart[productIndex] = {
                _id: form._id,
                quantity: form.quantity,
                options: form.options || ''
            }
            return cart
        }
        else {
            return [...cart, form]
        }
    }, false)
    // 
    const res = await axios.post(`/cart/${product._id}`, form)
    if(res && !res.data.success) {
        return setAlert({ message: res.data.message, type: 'error'})
    }
    trigger('/checkout/total')
    trigger('/cart')
    return setAlert({ message: res.data.message})
}


const removeFromCart = async ({cart, product, setAlert}) => {
    mutate('/cart', cart.filter(cart => cart._id !== product._id), false)

    const res = await axios.delete(`/cart/${product._id}`)
    if (res && !res.data.success) {
        return setAlert({message: res.data.message, type: 'error'})
    }
    trigger('/checkout/total')
    trigger('/cart')
    return setAlert({message: res.data.message})
}


export const cartAction = {
    addToCart, removeFromCart
}
