import axios from "axios"


export const checkout = async ({form, setAlert, router}) => {
    try {
        const res = await axios.post('/checkout', form)
        if(res && !res.data.success) throw new Error(res.data.message)
        setAlert({message: 'Redirecting... to Billing Page.'})
        router.push(res.data.data)
        // continue

        // if payment is confirmed

        // clear cart
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

export const validateTransaction = async ({setAlert, cartAction}) => {
    try {
        const res = await axios.post(`/checkout/validate`, form)

        // transaction successful ----
        setAlert({message: 'validating transaction...'})
        cartAction({type: 'CLEAR_CART'})
        router.push(res.data.data)  // thank you page
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}


export const checkoutAction = {
    checkout, validateTransaction
}