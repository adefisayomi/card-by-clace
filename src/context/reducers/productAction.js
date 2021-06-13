import convertToFormData from '../../utils/actions/convertToFormData'
import axios from 'axios'
import {trigger, mutate} from 'swr'


const uploadProduct = async ({form, setAlert}) => {
    const newForm = await convertToFormData(form)
    const res = await axios.post(`/products`, newForm)

    if (res && !res.data.success) {
        setAlert({message: res.data.message, type: 'error'})
        return ({success: false})
    }
    else {
        setAlert({message: res.data.message })
        return ({success: true})
    }
}

const deleteProduct = async ({product, user, setAlert}) => { 
    try{
        const res = await axios.delete(`/products/${product._id}`)
        if(res && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        return trigger(`/products/${user._id}`)
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}
// Update product
const updateProduct = async ({form, setAlert, product, user}) => {
    try{
        const data = await convertToFormData(form) //Convert form to form-data
        // 
        const res = await axios.put(`/products/${product._id}`, data)
        if(res && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        return trigger(`/products/${user._id}`)
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

export const productAction = {
    uploadProduct, updateProduct, deleteProduct
}