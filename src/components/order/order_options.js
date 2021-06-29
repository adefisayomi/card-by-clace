import {  Dropdown } from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'
import styles from './style/order_options.module.css'



export default ({form, product, getColor, getSize, getForm}) => {

    const {UI} = GlobalState()

    const size = returnOption(product?.details?.options?.size)
    const color = returnOption(product?.details?.options?.color)


    return (
        <div className= {styles.options} style= {{ color: UI.color }}>

                <span className= {styles.options_input}>
                    <label htmlFor="quantity">quantity</label>
                    <input
                        name= 'quantity'
                        type="number"
                        min= '1'
                        max= '50'
                        onChange= {getForm}
                        id= {styles.options_dropdown}
                        placeholder= 'quantity...'
                        style= {{ border: UI.border, width: '100%', backgroundColor: UI.body }}
                        value= {form.quantity || ''}
                    />
                </span>
                {
                    size && size.length > 0 &&
                    <span>
                        <label htmlFor="size">size</label>
                        <Dropdown 
                            id= {styles.options_dropdown} 
                            onChange= {getSize}
                            fluid 
                            labeled 
                            name= 'size'
                            placeholder= 'size...'
                            clearable
                            value= {form?.options?.size || ''}
                            options={size}
                            selection
                            style= {{border: UI.border, backgroundColor: UI.body}}
                        />
                    </span>
                }

                {
                    color && color.length > 0 && 
                   <span>
                        <label htmlFor="color">color</label>
                        <Dropdown 
                            id= {styles.options_dropdown} 
                            onChange= {getColor}
                            fluid 
                            labeled 
                            name= 'color'
                            placeholder= 'color...'
                            clearable
                            value= {form?.options?.color || ''}
                            options={color}
                            selection
                            style= {{border: UI.border, backgroundColor: UI.body}}
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