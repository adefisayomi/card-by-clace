import styles from './style/cardLayout.module.scss'
import {GlobalState} from '../../context/globalState'
import router from 'next/router'
import {Icon} from 'semantic-ui-react'
import { useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';


export default function CardLayout ({children, redirect, header, width, borderRadius}) {

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
            <Card variant= {!UI.dark && 'outlined'}  
                  className= {styles.layout}
                  style= {{ maxWidth: width, backgroundColor: UI.bgColor, color: UI.color, borderRadius: borderRadius }}
            >
                {
                    header && 
                    <header style= {{ borderBottom: UI.border }}>
                        <h1>{header}</h1>
                        <span className= {styles.product_cancel}>
                            <Icon name= 'cancel' link onClick= {() => router.back()} />
                        </span>
                    </header>
                }
                <CardMedia style= {{ width: '100%' }}> {children} </CardMedia>
            </Card>
    )
}