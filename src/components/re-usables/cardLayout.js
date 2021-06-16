import styles from './style/cardLayout.module.css'
import {GlobalState} from '../../context/globalState'
import router from 'next/router'
import { useEffect } from 'react'


export default function CardLayout ({children, redirect}) {

    const {UI} = GlobalState()
    useEffect(() => {
        if (redirect) {
            router.back()
        }
        if (redirect?.path) {
            router.push(`/${redirect.path}`)
        }
        return
    }, [redirect])

    return (
        <div className= {styles.layout} style= {{ backgroundColor: UI.bgColor }}>
            {children}
        </div>
    )
}