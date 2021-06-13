import { Icon, Dropdown, Select } from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'
import styles from './style/order_options.module.css'



export default ({onChange, form, getOptions}) => {

    const {UI} = GlobalState()
    const options = []

    return (
        <div className= {styles.options}>
            <div className= {styles.options_dropdown}>
                <span className= {styles.options_input}>
                    <label htmlFor="quantity">quantity</label>
                    <input
                        name= 'quantity'
                        type="number"
                        min= '1'
                        max= '20'
                        onChange= {onChange}
                        id= {styles.options_dropdown}
                        placeholder= 'quantity'
                        style= {{ border: UI.border, width: '100%' }}
                        value= {form.quantity || ''}
                    />
                </span>

                <span style= {{ margin: '0 5px' }}>
                    <label htmlFor="size">size</label>
                    <Dropdown 
                        id= {styles.options_dropdown} onChange= {getOptions || ''} 
                        fluid labeled name= 'size' placeholder= 'Color' 
                        clearable options={options} selection
                        style= {{ border: UI.border }}
                        />
                </span>

                <span>
                    <label htmlFor="color">color</label>
                    <Dropdown 
                        id= {styles.options_dropdown} onChange= {getOptions || ''}
                        fluid labeled name= 'color' placeholder= 'Color' clearable
                        options={options} selection
                        style= {{ border: UI.border }}
                        />
                </span>
            </div>
             
        </div>
    )
}