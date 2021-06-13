import styles from './style/nav.module.css'
import { GlobalState } from '../../context/globalState'
import CardTab from '../cart/cartTab'
import {Icon} from 'semantic-ui-react'
import SearchTab from './searchTab'
import Cart from '../cart/cart'
import DropDown from '../re-usables/dropdown'
import ProfileTab from '../re-usables/profileTab'
import OrderSummary from '../checkout/order_summary'
import { useEffect, useState } from 'react'
import Logo from './logoTab'
import {useRouter} from 'next/router'



export default function Nav () {

    const router = useRouter()
    const {UI, user, userAction, cart, setAlert} = GlobalState()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const getPath = () => {
            return router.asPath.includes('checkout') ? setOpen(true) : setOpen(false)
        }
        getPath()
    }, [router.asPath])


    return(
        <div className= {styles.nav} style= {{ transform: open && 'translateX(0%)' }}>
            <div className= {styles.nav_home} style= {{flexDirection: cart?.length > 0 && 'row-reverse' }}>
                <span><Logo /></span>
                {!open && 
                    <span>
                        <DropDown trigger= { <CardTab />}>
                            <Cart />
                        </DropDown>
                    </span>}
                {
                    open && <span style= {{ padding: '0 10px' }}><OrderSummary /></span>
                }
            </div>
            { !open && <span className= {styles.nav_search}><SearchTab /></span>}
            { !open && user && !user.guest && <span className= {styles.nav_user}> <ProfileTab user= {user} /> </span>}
            <span>
                <Icon name= {user ? 'sign-out' : 'sign-in'}
                circular link style= {{fontSize: '16px'}} 
                color= 'black' 
                onClick= {user && !user.guest ? () => userAction.logOut() : () => router.push('/login')}
                />
            </span>
        </div>
    )
}