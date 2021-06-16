import axios from "axios"


export const checkoutAction = async ({form, setAlert, router}) => {
    try {
        const res = await axios.post('/checkout', form)
        if(res && !res.data.success) throw new Error(res.data.message)
        setAlert({message: 'Redirecting... to payment Page.'})
        router.push(res.data.data)
        // continue

        // if payment is confirmed

        // clear cart
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}


const clearCart = () => {
    if (typeof window != 'undefined') {
        window.localStorage.removeItem('card_cart')
    }
}