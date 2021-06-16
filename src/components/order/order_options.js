import { Icon, Dropdown, Select } from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'
import styles from './style/order_options.module.css'



export default ({form, setForm, product}) => {

    const {UI} = GlobalState()

    const size = returnOption(product?.details?.options?.size)
    const color = returnOption(product?.details?.options?.color)
    const getColor = (e, {value}) => setForm({...form, options: {...form?.options, color: value}})
    const getSize = (e, {value}) => setForm({...form, options: {...form?.options, size: value}})


    return (
        <div className= {styles.options}>

                <span className= {styles.options_input}>
                    <label htmlFor="quantity">quantity</label>
                    <input
                        name= 'quantity'
                        type="number"
                        min= '1'
                        max= '20'
                        onChange= {(e) => setForm({...form, [e.target.name]: e.target.value})}
                        id= {styles.options_dropdown}
                        placeholder= {form.quantity || 'quantity'}
                        style= {{ border: UI.border, width: '100%' }}
                        value= {form.quantity || ''}
                    />
                </span>
                {
                    size && size.length > 0 &&
                    <span style= {{ margin: '0 5px' }}>
                        <label htmlFor="size">size</label>
                        <Dropdown 
                            id= {styles.options_dropdown} 
                            onChange= {getSize || ''}
                            fluid 
                            labeled 
                            name= 'size'
                            placeholder= 'size...'
                            clearable
                            value= {form?.options?.size || ''}
                            options={size}
                            selection
                            style= {{ border: UI.border }}
                        />
                    </span>
                }

                {
                    color && color.length > 0 && 
                   <span>
                        <label htmlFor="color">color</label>
                        <Dropdown 
                            id= {styles.options_dropdown} 
                            onChange= {getColor || ''}
                            fluid 
                            labeled 
                            name= 'color'
                            placeholder= 'color...'
                            clearable
                            value= {form?.options?.color || ''}
                            options={color}
                            selection
                            style= {{ border: UI.border }}
                        />
                    </span> 
                }
        </div>
    )
}



const returnOption = (arr) => {
    const option = arr && arr.map((arr, index) => (
        {key: index, value: arr, text: arr}
    ))
    return option
}