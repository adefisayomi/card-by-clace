import {randomBytes} from 'crypto'
import cookie from '../../utils/actions/cookie'

export const cartReducer = (state,  action) => {

    if (action.type === 'ADD') {

        let cartRef = cookie.get('card_cart')
        state = cartRef || []
        const order = createOrder(action.payload)
        // check if the product is already in the cart
        const productExist = state && state.length > 0 && state.filter(prod => prod._id === order._id)[0]
        if(productExist) {
            // update product instaed
            const productIndex = state.findIndex( prod => prod._id == order._id )
            state[productIndex] = order
            cookie.set('card_cart', state)
            return state
        }
        else {
            state = order && [...state, order ]
            cookie.set('card_cart', state)
            return state
        }
    }
    if (action.type === 'UPDATE') {
        let cartRef = cookie.get('card_cart')
        const order = createOrder(action.payload)
        state = cartRef || []
        if (state.length > 0) {
            const indexToUpdate = state.findIndex(prod => prod._id === order._id)
            state[indexToUpdate] = order
            cookie.set('card_cart', state) //update localStorage
            return state
        }
        return 
    }
    if (action.type === 'REMOVE') {
        let cartRef = cookie.get('card_cart')
        state = cartRef
        
        state = state.filter(prod => prod._id !== action.payload._id)
        cookie.set('card_cart', state) //update localStorage
        return state
    }
    if (action.type === 'CLEAR') {
        cookie.set('card_cart', [])
        return state = []
    }
    else return state
}



const createOrder = (payload) => {
    const order = {
     _id: payload._id,
     quantity: payload.quantity,
     options: {
         color: payload.options.color,
         size: payload.options.size,
         note: payload.options.note,
     },
     price: payload.quantity * payload.price,
     date: new Date()
    }
    return order
 }