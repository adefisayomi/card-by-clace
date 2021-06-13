import styles from './style/loadingUser.module.css'
import {Placeholder} from 'semantic-ui-react'
import CardLayout from './cardLayout'
import { GlobalState } from '../../context/globalState'


export default function LoadingUser ({title}) {

    const {UI} = GlobalState()

    return (
        <CardLayout>
            <div className= {styles.loading}>
                <header style= {{ borderBottom: UI.border }}>
                    <Placeholder style={{ height: 50, width: 50, borderRadius: '100%' }} inverted= {UI.dark}>
                        <Placeholder.Image />
                    </Placeholder>
                </header>
                <Placeholder fluid style={{ minHeight: '320px', height: '100%', width: '100%'}} inverted= {UI.dark}>
                    <Placeholder.Image />
                </Placeholder>
            </div>
        </CardLayout>
    )
}