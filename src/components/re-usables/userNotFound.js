import styles from './style/loadingUser.module.css'
import {Icon} from 'semantic-ui-react'
import Empty from './empty'
import { useRouter } from 'next/router'


export default function UserNotFound () {

    const router = useRouter()

    return (
        <div className= {styles.loading}>
            <header>
                <span><Icon name= 'question' color= 'blue' circular size= 'big' /></span>
                <span><Icon name= 'angle double left' color= 'blue' size= 'large' link onClick= {() => router.back()} /></span>
            </header>
            <main>
                <Empty content= {{ text: 'This user does not exist.', icon: 'user close' }} />
            </main>
        </div>
    )
}