import {useState} from 'react';
import styles from './style/checkout.module.css'
import {useRouter} from 'next/router'
import ShippingForm from './shipping'
import CardLayout from '../re-usables/cardLayout'



export default function checkout () {

  const router = useRouter()
  const [expanded, setExpanded] = useState(false)
  const handleExpandClick = () => setExpanded(!expanded)


  return (
        <CardLayout>
          <div className= {styles.checkout}>
            <span className= {styles.checkout_shipping_form}>
              <ShippingForm />
            </span>
          </div>
        </CardLayout>
  );
}
