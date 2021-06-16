import { Icon, Modal } from "semantic-ui-react";
import {useRouter} from 'next/router'
import { useState } from "react";
import styles from './style/modal.module.css'
import {GlobalState} from '../../context/globalState'



export default function modal ({openState, onClose, children, width }) {

    const router = useRouter()
    const {UI} = GlobalState()
    const [open, setOpen] = useState(true)
    const goBack = () => router.back()
    const close = () => {
        goBack()
        setOpen(false)
    }

    
    return (
        <div className= {styles.modal} style= {{ maxWidth: width && width }}>
        <Modal
            className= {styles.modal}
            open= {openState || open}
            style= {{backgroundColor: UI.bgColor, color:UI.color, maxWidth: width && width }}
            onClose= {onClose || goBack}
        >
            <header className= {styles.modal_header} style= {{ borderBottom: UI.border }}>
                <Icon 
                    fitted
                    name= 'cancel'
                    bordered
                    link
                    onClick= {onClose || close}
                />
            </header>
            {children}
        </Modal>
        </div>
    )
}