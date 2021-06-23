import styles from './style/loadingUser.module.scss'
import {Placeholder} from 'semantic-ui-react'
import CardLayout from './cardLayout'
import { GlobalState } from '../../context/globalState'


export default function LoadingUser ({reverse}) {

    const {UI} = GlobalState()

    return (
        <CardLayout>
            <div className= {styles.loading}  style= {{ flexDirection: reverse && 'column-reverse' }}>
                <header>
                    <Placeholder className= {styles.profile} inverted= {UI.dark}>
                        <Placeholder.Image />
                    </Placeholder>
                </header>
                <Placeholder fluid className= {styles.images}  inverted= {UI.dark}>
                    <Placeholder.Image />
                </Placeholder>
            </div>
        </CardLayout>
    )
}