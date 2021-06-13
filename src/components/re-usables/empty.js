import styles from './style/empty.module.css'
import {Icon} from 'semantic-ui-react'
import { memo } from 'react'


export default function empty ({content}) {

    return(
        <div className= {styles.empty}>
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