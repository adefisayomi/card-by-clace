import { useContext, createContext, useState, useCallback, useReducer} from "react";
import useSWR from "swr";
import {themeObject, themeReducer} from './reducers/themeAction'
import {userAction} from './reducers/userAction'
import {cartReducer} from './reducers/cartAction'
import {commentAction} from './reducers/commentAction'
import {productAction} from './reducers/productAction'
import {checkoutAction} from './reducers/checkoutAction'


const StateContext = createContext()

export default function GlobalStateProvider ({children}) {

   // theme
   const [theme, dispatchTheme] = useReducer(themeReducer, themeObject)
   const UI = theme.isDark ? theme.dark : theme.light
   const toggleUI = useCallback(() => dispatchTheme({type: 'TOGGLE_UI'}))

    //  ----set ALert -------
    const [alert, setAlert] = useState({message: '', type: ''})

    const [trigger, setTrigger] = useState(false)   //enforces user login || signup

    // -------- get USER -----
    const {data: user} = useSWR('/user', {initialData: null, revalidateOnFocus: true})
    
    // -------- get cart -------
    const [cart, cartAction] = useReducer(cartReducer, [], () => {
            let cartRef = typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('card_cart'))
            return  user && cartRef ? cartRef : []
    })
    
    const {data: products} = useSWR(() => user ? `/products/${user._id}` : '' , {revalidateOnFocus: true, initialData: []})
    
    return(
        <StateContext.Provider value= {{UI, toggleUI, user, alert, setAlert, cart, userAction, commentAction, checkoutAction, cartAction, productAction, trigger, setTrigger}}>
            {children}
        </StateContext.Provider>
    )
}

export const GlobalState = () => useContext(StateContext)