import styles from './style/footer.module.css'
import { GlobalState } from '../../context/globalState'
import {Button} from 'semantic-ui-react'

export default function footer ({content= {}}) {

    const {UI} = GlobalState()
    
    return (

        <div  className= {styles.footer} style= {{ borderTop: UI.border}} >
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