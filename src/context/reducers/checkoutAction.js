import axios from "axios"


export const checkout = async ({form}) => {
    try {
        const res = await axios.post('/checkout', form)
        if(res && !res.data.success) throw new Error(res.data.message)
        // 
        return ({success: true, message: null, data: res.data.data})
    }
    catch(err) {
        return ({success: false, message: err.message, data: null})
    }
}

export const validateTransaction = async ({setAlert, cartAction, reference, amount}) => {
    try {
        const res = await axios.post(`/checkout/confirm`, {amount, reference})
        if (!res.data.success) throw new Error(res.data.message)
        // transaction successful ----
        setAlert({message: 'transaction completed'})
        cartAction({type: 'CLEAR_CART'})
        return 
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}


export const checkoutAction = {
    checkout, validateTransaction
}

// export const checkoutObject = {
//     loading: false,
//     success: false,
//     message: null,
//     data: null,
//     reference: null,
//     amount: null,
//     error: null
// }

// export default async function checkoutReducer (state, action) {

//     if (action.type === 'INITIALIZE') {
//         try {
//             state = {...state, loading: true}  // loading state ...
//             const res = await axios.post('/checkout', action.payload)
//             if (res.data && !res.data.success) throw new Error(res.data.message)
//             // 
//             return {...state, loading: true, error: null}
//         }
//         catch(err) {
//             return {...state, loading: false, error: err.message}
//         }
//     }
//     if (action.type === 'VERIFY') {
//         state = {...state, loading: true}
//         const {reference, amount} = action.payload
//         try{
//             const res = await axios.post(`/checkout/verify/${reference}/${amount}`)
//             if (res && !res.data.success) throw new Error(res.data.message)
//             // 
//             return {...state, loading: false, verify: true, message: res.data.data.message}
//         }
//         catch(err) {
//             return state = { ...checkoutObject, error: err.message }
//         }
//     }
//     // 
//     if (action.type === 'RESET') {
//         return state = checkoutObject
//     }
//     else return state
// }