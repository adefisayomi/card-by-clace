import styles from './style/footer.module.css'
import { GlobalState } from '../../context/globalState'
import {Button, Icon} from 'semantic-ui-react'
import Link from 'next/link'
import router from 'next/router'

export default function footer ({content= {}}) {

    const {UI} = GlobalState()
    
    return (

        <div  className= {styles.footer} style= {{ borderTop: UI.border}} >
                <span>
                    <span><Icon name= 'linkify' color= 'blue' link/></span> 
                    
                    <a onClick= {() => router.push(`${router.asPath}/inventory`)}>inventory</a>
                </span>
                <Button
                    content= {content?.content || ''}
                    color= 'blue'
                    icon= {content?.icon || ''}
                    floated= 'right'
                    onClick= {content?.onClick || ''}
                    id= {styles.footer_button}
                />
            </div>
    )
}