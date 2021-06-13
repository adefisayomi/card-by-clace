import { Loader } from 'semantic-ui-react'
import styles from './style/logoTab.module.css'
import Link from 'next/link'
import { GlobalState } from '../../context/globalState'

export default function LogoTab () {

    const {UI, globalLoadingState} = GlobalState()

    return(
        <div className= {styles.logo} >
            {globalLoadingState ? 
            <span className= {styles.logo_loading}>
               <Loader active size= 'tiny' />
            </span>
             : 
            <Link href= '/'><a>c</a></Link>
            }
        </div>
    )
}