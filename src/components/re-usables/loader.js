import { Loader } from 'semantic-ui-react'
import styles from './style/loader.module.scss'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { GlobalState } from '../../context/globalState'



export default function loadingPage ({content}) {

    const router = useRouter()
    const {UI} = GlobalState()
  
    return (
      <div className= {styles.loading} style= {{ color: UI.color }}>
          <span className= {styles.loading_loader}>
            <Loader indeterminate active content= {content} />
          </span>
      </div>
    )
  }