import {useState} from 'react';
import styles from './style/checkout.module.css'
import router from 'next/router'
import ShippingForm from './shipping'
import CardLayout from '../re-usables/cardLayout'
import { useEffect } from 'react';
import { GlobalState } from '../../context/globalState';



export default function checkout () {

  const {cart, setAlert, checkoutAction} = GlobalState()
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)
  const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
  const getOption = (e, {value}) => setForm({...form, state: value})
  console.log(form)

  const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      await checkoutAction.checkout({form, setAlert, router})
      setLoading(false)
  }



  // monitor cart length
  useEffect(() => {
    if ( !cart || cart.length === 0) {
      setAlert({message: 'Your cart is empty.', type: 'error'})
      router.back()
    }
    else {
      const total = cart.reduce((a, b) => a + b.price, 0)
      setForm({...form, cart, total})
    }
  }, [cart])

  return (
        <CardLayout redirect= { !cart || cart.length === 0 }>
          <div className= {styles.checkout}>
            <span className= {styles.checkout_shipping_form}>
              <ShippingForm form= {form} getForm= {getForm} handleSubmit= {handleSubmit} loading= {loading} getOption= {getOption} />
            </span>
          </div>
        </CardLayout>
  );
}
