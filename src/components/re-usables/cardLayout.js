import styles from './style/cardLayout.module.scss'
import {GlobalState} from '../../context/globalState'
import router from 'next/router'
import {Icon} from 'semantic-ui-react'
import { useEffect } from 'react'
import Card from '@material-ui/core/Card';


export default function CardLayout ({children, redirect, header}) {

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
            <Card variant= {!UI.dark && 'outlined'}  className= {styles.layout} style= {{ backgroundColor: UI.bgColor, color: UI.color }}>
                {
                    header && 
                    <header style= {{ borderBottom: UI.border }}>
                        <h1>{header}</h1>
                        <span className= {styles.product_cancel}>
                            <Icon name= 'cancel' link onClick= {() => router.back()} />
                        </span>
                    </header>
                }
                
                {children}
            </Card>
    )
}