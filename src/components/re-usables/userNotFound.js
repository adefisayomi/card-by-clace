import styles from './style/loadingUser.module.scss'
import {Icon} from 'semantic-ui-react'
import Empty from './empty'
import { useRouter } from 'next/router'
import { GlobalState } from '../../context/globalState'


export default function UserNotFound ({width}) {

    const router = useRouter()
    const {UI} = GlobalState()

    return (
        <div className= {styles.loading} style= {{ maxWidth: width, backgroundColor: UI.bgColor }}>
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