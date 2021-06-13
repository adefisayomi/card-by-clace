import styles from './style/order_summary.module.css'
import {GlobalState} from '../../context/globalState'



export default function orderSummary () {

    const {total} = GlobalState()

    return (
        <div className= {styles.order_summary}>
            <span>
                <h1>total -- </h1>
                <h4>{total || '₦ 0:00'}</h4>
            </span>
        </div>
    )
}