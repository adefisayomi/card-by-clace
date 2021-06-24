import styles from './style/nav.module.scss'
import { GlobalState } from '../../context/globalState'
import CardTab from '../cart/cartTab'
import {Icon} from 'semantic-ui-react'
import SearchTab from './searchTab'
import Cart from '../cart/cart'
import DropDown from '../re-usables/dropdown'
import ProfileTab from '../re-usables/profileTab'
import OrderSummary from '../checkout/order_summary'
import { useEffect, useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import LogoTab from './logoTab'
import {useRouter} from 'next/router'
import Popup from '../re-usables/pop_up'



// export default function Nav () {

    // const router = useRouter()
    // const {UI, user, userAction, cart, setAlert} = GlobalState()
    // const [open, setOpen] = useState(false)

//     useEffect(() => {
//         const getPath = () => {
//             return router.asPath.split('/').pop() === 'checkout' ? setOpen(true) : setOpen(false)
//         }
//         getPath()
//     }, [router.asPath])


//     return(
//         <div className= {styles.nav} style= {{ transform: open && 'translateX(0%)' }}>

//             <span className= {styles.nav_logo}><Logo /></span>



//             <div className= {styles.nav_home} style= {{flexDirection: cart && cart.length === 0 && 'row-reverse' }}>
//                 <span>
                    // <DropDown trigger= { <CardTab />}>
                    //     <Cart />
                    // </DropDown>
//                 </span>
//             </div>
//             { open && <span style= {{ padding: '0 10px' }}><OrderSummary /></span> }
//             { !open && <span className= {styles.nav_search}><SearchTab /></span>}
//             { !open && user && <span className= {styles.nav_user}> <ProfileTab user= {user} width= '35px' /> </span>}
//             {!open && 
//                 <span className={styles.nav_login}>
//                     <Icon name= {user ? 'lock open' : 'lock'}
//                         circular link style= {{fontSize: '16px'}}
//                         color= 'black' 
//                         onClick= {user ? () => userAction.logOut() : () => router.push('/login')}
//                     />
//                 </span>}
//             <span><ToggleTheme /></span>
//         </div>
//     )
// }


export default function nav () {

    const router = useRouter()
    const {UI, user, userAction, cart, setAlert} = GlobalState()
    const [open, setOpen] = useState(false)

    return (
        <div className= {styles.nav}>
            <span className= {styles.nav_logo}>
                <LogoTab />
            </span>

            <span className= {styles.nav_cart}>
                    <SearchTab />
            </span>

            { !open && user && <span className= {styles.nav_user}> <ProfileTab user= {user} width= '35px' /> </span>}

            <span className= {styles.nav_theme}>
                <Popup trigger= { <CardTab />} fixed >
                    <Cart />
                </Popup>
                <ToggleUI />
            </span>
        </div>
    )
}

const ToggleUI = () => {

    const {toggleUI, UI} = GlobalState()

    return (
        <div style= {{ width: 'fit-content' }}>
            
            <IconButton onClick= {() => toggleUI({ type: 'TOGGLE_UI' })} aria-label="cart" style= {{ color: 'black' }} color= 'inherit' >
                {
                    UI.dark ? 
                    <Brightness4Icon style= {{ fontSize: '16px' }} /> :
                    <Brightness5Icon style= {{ fontSize: '16px' }} />
                }
            </IconButton>
        </div>
    )
}