import styles from './style/order_summary.module.css'
import {GlobalState} from '../../context/globalState'
import { useState } from 'react'



export default function orderSummary () {

    const {cart} = GlobalState()
    let total = cart.reduce((a, b) => a + b.price, 0)

    return (
        <div className= {styles.order_summary}>
            <span>
                <h1>total -- </h1>
                <h4>{total || '₦ 0:00'}</h4>
            </span>
        </div>
    )
}