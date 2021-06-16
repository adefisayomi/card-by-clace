// import {mutate, trigger} from "swr"
// import axios from 'axios'

import axios from "axios"


// async function addToCart({form, cart, setAlert, product}) {
//     mutate('/cart', () => {
//         const alreadyAdded = cart && cart.length > 0 && cart.filter(prod => prod._id == form._id)[0]
//         if(alreadyAdded) {
            // const productIndex = cart.findIndex( prod => prod._id == form._id )
            // cart[productIndex] = {
            //     _id: form._id,
            //     quantity: form.quantity,
            //     options: form.options || ''
            // }
            // return cart
//         }
//         else {
//             return cart && cart.length > 0 ? [...cart, form] : [form]
//         }
//     }, false)
//     // 
//     const res = await axios.post(`/cart/${product._id}`, form)
//     if(res && !res.data.success) {
//         return setAlert({ message: res.data.message, type: 'error'})
//     }
//     trigger('/checkout/total')
//     trigger('/cart')
//     return setAlert({ message: res.data.message})
// }


// const removeFromCart = async ({cart, product, setAlert}) => {
//     mutate('/cart', cart.filter(cart => cart._id !== product._id), false)

//     const res = await axios.delete(`/cart/${product._id}`)
//     if (res && !res.data.success) {
//         return setAlert({message: res.data.message, type: 'error'})
//     }
//     trigger('/checkout/total')
//     trigger('/cart')
//     return setAlert({message: res.data.message})
// }


// export const cartAction = {
//     addToCart, removeFromCart
// }
// const dbCart = async () => {
//     const res = await axios.get('/cart')
//     if (res && res.data.success && res.data.data.length > 0) {
//         return res.data.data
//     }
//     return []
// }

export const cartReducer = (state,  action) => {

    if (action.type === 'ADD_TO_CART') {

        let cartRef = JSON.parse(window.localStorage.getItem('card_cart'))
        state = cartRef || []
        // checl if the product is already in the cart
        const productExist = state && state.length > 0 && state.filter(prod => prod._id === action.payload._id)[0]
        if(productExist) {
            // update product instaed
            const productIndex = state.findIndex( prod => prod._id == action.payload._id )
            state[productIndex] = action.payload
            return state
        }
        else {
            state = [...state, action.payload, ]
            window.localStorage.setItem('card_cart', JSON.stringify(state)) //update localStorage
            return state
        }
    }
    if (action.type === 'UPDATE_CART') {
        let cartRef = JSON.parse(window.localStorage.getItem('card_cart'))
        state = cartRef || []
        if (state.length > 0) {
            const indexToUpdate = state.findIndex(prod => prod._id === action.payload._id)
            state[indexToUpdate] = action.payload
            window.localStorage.setItem('card_cart', JSON.stringify(state)) //update localStorage
            return state
        }
        return 
    }
    if (action.type === 'REMOVE_FROM_CART') {
        let cartRef = JSON.parse(window.localStorage.getItem('card_cart'))
        state = cartRef
        
        state = state.filter(prod => prod._id !== action.payload._id)
        window.localStorage.setItem('card_cart', JSON.stringify(state)) //update localStorage
        return state
    }
    return state
}