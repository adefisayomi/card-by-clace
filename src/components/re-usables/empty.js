import styles from './style/empty.module.css'
import {Icon} from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'


export default function empty ({content}) {

    const {UI} = GlobalState()

    return(
        <div className= {styles.empty} style= {{ backgroundColor: UI.bgColor, color: UI.color }}>
            <Icon
                name= {content.icon}
                color= 'black'
                circular
                style= {{ fontSize: '40px' }}
            />
            <p>{content.text}</p>
        </div>
    )
}