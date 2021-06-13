import styles from './style/cardLayout.module.css'
import {GlobalState} from '../../context/globalState'


export default function CardLayout ({children}) {

    const {UI} = GlobalState()

    return (
        <div className= {styles.layout} style= {{ backgroundColor: UI.bgColor }}>
            {children}
        </div>
    )
}