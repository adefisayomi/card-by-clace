import { Button, TextArea, Form } from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'
import styles from './style/order_form.module.scss'
import {useState, useEffect} from 'react'
import OrderOptions from './order_options'


export default function orderForm ({product}) {

  const {cart, cartAction, setAlert, UI} = GlobalState()
  const [form, setForm] = useState({quantity: 1, options: {} })
  const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
  const getNote = (e) => setForm({...form, options: { ...form.options, [e.target.name]: e.target.value }})
  const getColor = (e, {value}) => setForm({...form, options: {...form.options, color: value}})
  const getSize = (e, {value}) => setForm({...form, options: {...form.options, size: value}})
  // 
  useEffect(() => {
      if (product) {
          setForm({...form, _id: product._id, price: product.details.price})
      }
  }, [product])
//   
  const handleAddToCart = () => {
    cartAction({ type: 'ADD', payload: form })
    setAlert({message: `${form.quantity} ${product.details?.title} added to cart.`})
  } 

    return (
        <div className= {styles.order_form} style= {{color: UI.color}}>
            <Form>
                <span>
                    <h1>{product?.details?.title}</h1> <em>{product?.details?.quantity} left in stock.</em>
                </span>
                <span className= {styles.order_form_price}> ₦ {product?.details?.price}</span>
                <p>{product?.details?.description || ''} </p>

                <span className= {styles.order_form_options}>
                    <OrderOptions getColor= {getColor} getSize= {getSize} getForm= {getForm} form= {form} product= {product} />
                </span>

                <TextArea 
                    placeholder= 'Add note...'
                    name= 'note'
                    value= {form.options?.note || ''}
                    id= {styles.order_form_textarea}
                    onChange= {getNote}
                    style= {{border: UI.border, backgroundColor: UI.body}}
                />
                <Button
                    icon= 'cart'
                    color= 'blue'
                    content= 'Add to cart'
                    onClick= {handleAddToCart}
                    style= {{ width: 'fit-content' }}
                    floated= 'left'
                    id= {styles.order_form_button}
                />
            </Form>
        </div>
    )
}