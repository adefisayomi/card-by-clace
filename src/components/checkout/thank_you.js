import { Icon } from 'semantic-ui-react'
import CardLayout from '../re-usables/cardLayout'
import styles from './style/thankyou.module.css'
import router from 'next/router'



export default function thankYou () {

    return (
        <CardLayout header= 'From adefisayomi oluwole.'>
            <div className= {styles.thanks}>
                <h1>thank you</h1>
                <p>your purchase was successful</p>
                <span><Icon name= 'like' size= 'massive' color= 'blue' /></span>
            </div>
        </CardLayout>
    )
}