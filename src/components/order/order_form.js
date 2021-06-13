import { Button, TextArea, Icon, Form } from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'
import styles from './style/order_form.module.css'
import {useState} from 'react'
import OrderOptions from './order_options'


export default function orderForm ({product}) {

  const {cart, cartAction, setAlert, UI} = GlobalState()
  const [form, setForm] = useState({quantity: 1, options: {}})
  const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
  const getOptions = (e, {value}) => setForm({...form, options: { ...form?.options, [e.target.name]: value} })

  const handleAddToCart = async (e) => {
      e.preventDefault()
      await cartAction.addToCart({cart, form, setAlert, product})
  }


    return (
        <div className= {styles.order_form}>
            <Form>
                <header>
                    <h1>{product?.details?.title}</h1> <em>{product?.details?.quantity} remaining.</em>
                </header>
                <span className= {styles.order_form_price}> ₦ {product?.details?.price}</span>
                <p className= {styles.order_form_description}>{product?.details?.description} </p>

                <div className= {styles.order_form_options}>
                    <OrderOptions getOptions= {getOptions} onChange= {getForm} form= {form} />
                </div>

                <TextArea 
                    placeholder= 'Add note...'
                    name= 'note'
                    value= {form?.options?.note || ''}
                    id= {styles.order_form_textarea}
                    onChange= {getOptions}
                    style= {{ border: UI.border }}
                />
                <Button
                    icon= 'cart'
                    content= 'Add to cart'
                    onClick= {handleAddToCart}
                    id= {styles.order_form_button}
                />
            </Form>
        </div>
    )
}