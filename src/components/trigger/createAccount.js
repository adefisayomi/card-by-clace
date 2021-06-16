import CardLayout from '../re-usables/cardLayout'
import styles from './style/create_account.module.css'
import GoogleButton from '../account/buttons'
import {Divider} from 'semantic-ui-react'
import Modal from '../re-usables/modal'
import { GlobalState } from '../../context/globalState'
import router from 'next/router'


export default function createAccount () {

    const {setTrigger, UI} = GlobalState()

    return (
        <Modal width= '450px' onClose= {() => setTrigger(false)}>
            <CardLayout>
                <div className= {styles.createAccount}>
                    
                    <span className= {styles.createAccount_google}>
                        <GoogleButton content= 'continue with google' path= '/account/google/signup' />
                    </span>

                    <Divider content='OR' inverted= {UI.dark} horizontal />

                    <p> click <a onClick= {() => router.push('/login')}>here</a> if you aldready have an account. </p>
                        
                </div>
            </CardLayout>
        </Modal>
    )
}