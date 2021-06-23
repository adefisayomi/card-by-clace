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
    if (action.type === 'CLEAR_CART') {
        window.localStorage.removeItem('card_cart')
        state = []
        return state
    }
    return state
}
