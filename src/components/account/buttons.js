import { Button, Icon } from 'semantic-ui-react'
import styles from './style/button.module.css'
import { GlobalState } from '../../context/globalState'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function button ({path, content}) {

    const router = useRouter()
    const {setAlert, userAction} = GlobalState()
    const [loading, setLoading] = useState(false)

    const signInWithGoogle = async (e) => {
        e.preventDefault()
        setLoading(true)

        await userAction.googleSignin({path, setAlert})
        return setLoading(false)
    }

    return(
        <div className= {styles.google_button} onClick= {signInWithGoogle}>
            <Button
                color= 'black'
                style= {{ display: 'flex' }}
                size= 'mini'
                id= {styles.button}
            >
                <span className= {styles.google_button_icon}>
                  <Icon
                    name= {loading ? 'spinner' : 'google'}
                    loading= {loading}
                    circular
                    color= 'blue'
                    fitted
                    link
                /> 
                </span>
               
                <h1>{content}</h1>
            </Button>
        </div>
    )
}