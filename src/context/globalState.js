import { useContext, createContext, useState, useReducer} from "react";
import useSWR from "swr";
import {themeObject, themeReducer} from './reducers/themeAction'
import {userAction} from './reducers/userAction'
import {cartReducer} from './reducers/cartAction'
import {commentAction} from './reducers/commentAction'
import {productAction} from './reducers/productAction'
import {checkoutAction} from './reducers/checkoutAction'
import cookie from '../utils/actions/cookie'


const StateContext = createContext()

export default function GlobalStateProvider ({children}) {

    const [UI, toggleUI] = useReducer(themeReducer, {}, () => cookie.get('card_theme') || themeObject.dark )

    //  ----set ALert -------
    const [alert, setAlert] = useState({message: '', type: ''})

    const [trigger, setTrigger] = useState(false)   //enforces user login || signup
    const [globalLoading, setGlobalLoading] = useState(false)

    // -------- get USER -----
    const {data: user} = useSWR('/user', {initialData: null, revalidateOnFocus: true})
    
    // -------- get cart -------
    const [cart, cartAction] = useReducer(cartReducer, [], () => cookie.get('card_cart') || [])

    const {data: products} = useSWR(() => user ? `/products/${user._id}` : '' , {revalidateOnFocus: true, initialData: []})
    
    return(
        <StateContext.Provider value= {{UI, toggleUI, user, products, alert, setAlert, cart, userAction, commentAction, checkoutAction, cartAction, productAction, trigger, setTrigger, globalLoading, setGlobalLoading}}>
            {children}
        </StateContext.Provider>
    )
}

export const GlobalState = () => useContext(StateContext)