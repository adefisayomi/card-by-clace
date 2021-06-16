import { GlobalState } from "../../context/globalState";
import CardLayout from "../re-usables/cardLayout";
import Empty from '../re-usables/empty'
import Client from './client'
import styles from './style/inventory.module.css'



export default function inventory () {

    const {user} = GlobalState()

    return (
        <CardLayout header= 'inventory'  >
            <div className= {styles.inventory}>
                <span> <Client /> </span>
                
                {/* <span>
                    <Empty content= {{ icon: 'file', text: 'Your inventory is empty' }} />
                </span>

                <footer>

                </footer> */}
            </div>
        </CardLayout>
    )
}