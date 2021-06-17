import { Button, TextArea, Icon, Form } from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'
import styles from './style/order_form.module.css'
import {useState} from 'react'
import OrderOptions from './order_options'


export default function orderForm ({product}) {

  const {cart, cartAction, setAlert, UI} = GlobalState()
  const [form, setForm] = useState({quantity: 1, options: {}})
  const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})

  const handleAddToCart = (e) => {
      e.preventDefault()
      cartAction({type: 'ADD_TO_CART', payload: {
        quantity: form.quantity,
        date:  new Date() ,
        options: form.options,
        note: form.note,
        price: parseInt(form.quantity) * parseInt(product.details.price),
        _id: product._id
      }})
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
                    <OrderOptions setForm= {setForm} form= {form} product= {product} />
                </div>

                <TextArea 
                    placeholder= 'Add note...'
                    name= 'note'
                    value= {form?.note || ''}
                    id= {styles.order_form_textarea}
                    onChange= {getForm}
                    style= {{ border: UI.border }}
                />
                <Button
                    icon= 'cart'
                    color= 'blue'
                    content= 'Add to cart'
                    onClick= {handleAddToCart}
                    id= {styles.order_form_button}
                />
            </Form>
        </div>
    )
}