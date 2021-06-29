import styles from './style/customer.module.scss'
import CardLayout from '../re-usables/cardLayout'
import GoogleButton from './buttons'


export default function customer () {

    return (
        <CardLayout header= 'Keep your activities private..'>
            <div className= {styles.customer}>
                <GoogleButton content= 'continue with google' path= '/customer' />
            </div>
        </CardLayout>
    )
}