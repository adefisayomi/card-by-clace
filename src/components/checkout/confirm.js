import { Loader } from 'semantic-ui-react'
import styles from './style/confirm.module.scss'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { GlobalState } from '../../context/globalState'
import Checkout from './checkout'
import axios from 'axios'



export default function ConfirmOrder ({amount}) {

    const router = useRouter()
    const {UI, checkoutAction, cartAction, setAlert} = GlobalState()
    const reference = getParams('reference')
    
    const handleSubmit = async () => {
       
        if (reference) {
          clearParams('reference')
          // initiaite transaction
          try {
            const res = await axios.post('/checkout/confirm', {reference})
            if (!res.data.success) throw new Error(res.data.message)
            setAlert({message: 'Order confirmed...'})
            router.push('/')
          }
          catch(err) {
            return setAlert({message: err.message, type: 'error'})
          }
        }
        else router.back()
    }

    useEffect(() => {
        handleSubmit()
    }, [reference, router.query])

    return (
      <Checkout>
      <div className= {styles.confirm} style= {{ color: UI.color }}>
          <span className= {styles.confirm_loader}>
            <Loader indeterminate active content= 'validating transaction...' />
          </span>
      </div>
      </Checkout>
    )
  }



const getParams = (arr) => {
    const query = typeof window !== 'undefined' && window.location.search
    const params = new URLSearchParams(query);
    const ref = params.get(arr)
    return ref
}

const clearParams = (arr) => {
    const query = typeof window !== 'undefined' && window.location.search
    const params = new URLSearchParams(query)
    return params.delete(arr)
}