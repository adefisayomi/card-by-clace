import styles from './style/shipping.module.css'
import { Button, Form, Dropdown, Icon } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import {GlobalState} from '../../context/globalState'
import {state} from '../../utils/static_files/menu'
import {useRouter} from 'next/router'


export default function Shipping () {

    const router = useRouter()
    const {UI, user, cart, setAlert} = GlobalState()
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
    }

    useEffect(() => {
        if ( !cart.lenght > 0) {
            setAlert({message: 'Your cart is empty.'})
            router.back()
        }
    }, [user,cart])


    return (
        <div className= {styles.shipping} id= {styles.shipping} >
            <header style= {{ borderBottom: UI.border }}>
                <h1>shipping details</h1>
                <span>
                    <Icon name= 'cancel' link bordered onClick= {() => router.back()} />
                </span>
            </header>

            <Form onSubmit= {handleSubmit}>
                
                 <Form.Group widths= '16'>
                    <Form.Field width= '10'>
                        <label htmlFor="first_name">First name</label>
                        <input
                            placeholder= 'first name'
                            name= 'first_name'
                            type= 'text'
                            value= {form.first_name || ''}
                            style= {{border: UI.border}}
                            onChange= {getForm}
                        />
                    </Form.Field>
                    <Form.Field width= '8'>
                        <label htmlFor="phone">Phone</label>
                        <input
                            placeholder= 'phone number'
                            name= 'phone'
                            type= 'text'
                            value= {form.phone || ''}
                            style= {{border: UI.border}}
                            onChange= {getForm}
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Field>
                    <label htmlFor="email">Email</label>
                    <input
                        placeholder= 'email'
                        name= 'email'
                        type= 'email'
                        value= {form.email || ''}
                        style= {{border: UI.border}}
                        onChange= {getForm}
                    />
                </Form.Field>

                <Form.Field>
                    <label htmlFor="address">Street address</label>
                    <input
                        placeholder= 'address'
                        name= 'address'
                        type= 'text'
                        value= {form.address || ''}
                        style= {{border: UI.border}}
                        onChange= {getForm}
                    />
                </Form.Field>

                <Form.Field>
                    <label htmlFor="city">state</label>
                    <Dropdown
                        placeholder= 'state...'
                        name= 'state'
                        type= 'text'
                        selection
                        clearable
                        options= {state}
                        id= {styles.shipping_state}
                        value= {form.city || ''}
                        style= {{border: UI.border}}
                        onChange= {getForm}
                    />
                </Form.Field>

                <Form.Field>
                    <label htmlFor="note">Add a note <em>(optional)</em></label>
                    <textarea
                        name= 'note'
                        type= 'text'
                        value= {form.note || ''}
                        style= {{border: UI.border}}
                        onChange= {getForm}
                        placeholder= 'add a note...'
                    />
                </Form.Field>
                <Button
                    content= {loading ? 'processing order...' : 'Place Order' }
                    color= 'blue'
                    icon= {{ name: loading ? 'spinner' : '', loading }}
                    type= 'submit'
                    id= {styles.shipping_button}
                />
            </Form>
        </div>
    )
}