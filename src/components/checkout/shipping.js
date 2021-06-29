import styles from './style/shipping.module.css'
import { Form, Dropdown, Divider } from 'semantic-ui-react'
import {GlobalState} from '../../context/globalState'
import {state} from '../../utils/static_files/menu'



export default function ShippingForm ({form, getForm, getAddress, getOption}) {

    const {UI} = GlobalState()

    return (
        <Form id= {styles.shipping_form}>

            <Form.Field>
                <label htmlFor="email">Email</label>
                <input
                    placeholder= 'email'
                    name= 'email'
                    type= 'email'
                    value= {form.email || ''}
                    style= {{border: UI.border, backgroundColor: UI.body}}
                    onChange= {getForm}
                />
            </Form.Field>

            <Form.Group widths= '16'>
                <Form.Field width= '12'>
                    <label htmlFor="name">Name</label>
                    <input
                        placeholder= 'name...'
                        name= 'name'
                        type= 'text'
                        value= {form.name || ''}
                        style= {{border: UI.border, backgroundColor: UI.body}}
                        onChange= {getForm}
                    />
                </Form.Field>
                <Form.Field width= '6'>
                    <label htmlFor="phone">Phone</label>
                    <input
                        placeholder= 'phone number'
                        name= 'phone'
                        type= 'text'
                        value= {form.phone || ''}
                        style= {{border: UI.border, backgroundColor: UI.body}}
                        onChange= {getForm}
                    />
                </Form.Field>
            </Form.Group>

            <Form.Field>
                  <label htmlFor="street">Street</label>
                  <input
                      placeholder= 'street...'
                      name= 'street'
                      type= 'text'
                      value= {form.address.street || ''}
                      style= {{border: UI.border, backgroundColor: UI.body}}
                      onChange= {getAddress}
                  />
              </Form.Field>

            <Form.Group widths='equal'>
              <Form.Field>
                  <label htmlFor="city">city</label>
                  <input
                      placeholder= 'city'
                      name= 'city'
                      type= 'text'
                      value= {form.address.city || ''}
                      style= {{border: UI.border, backgroundColor: UI.body}}
                      onChange= {getAddress}
                  />
              </Form.Field>

              <Form.Field>
                <label htmlFor="state">state</label>
                <Dropdown
                    placeholder= 'state...'
                    name= 'state'
                    type= 'text'
                    selection
                    clearable
                    options= {state}
                    id= {styles.shipping_form_state}
                    value= {form.address?.state || ''}
                    style= {{border: UI.border, backgroundColor: UI.body, marginBottom: '20px'}}
                    onChange= {getOption}
                />
               </Form.Field>
            </Form.Group>

            

            {/* <Form.Field>
                <label htmlFor="note">Add a note <em>(optional)</em></label>
                <textarea
                    name= 'note'
                    type= 'text'
                    value= {form.note || ''}
                    style= {{border: UI.border, backgroundColor: UI.body}}
                    onChange= {getForm}
                    placeholder= 'add a note...'
                />
            </Form.Field> */}
    </Form>
    )
}
