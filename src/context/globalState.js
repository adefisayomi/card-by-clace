import { useContext, createContext, useState, useCallback, useReducer} from "react";
import useSWR from "swr";
import {themeObject, themeReducer} from './reducers/theme'
import {userAction} from './reducers/userAction'
import {cartAction} from './reducers/cartAction'
import {commentAction} from './reducers/commentAction'
import {productAction} from './reducers/productAction'


const StateContext = createContext()

export default function GlobalStateProvider ({children}) {

    // theme
    const [theme, dispatchTheme] = useReducer(themeReducer, themeObject)
    const UI = theme.isDark ? theme.dark : theme.light
    const toggleUI = useCallback(() => dispatchTheme({type: 'TOGGLE_UI'}))
    //
    const [alert, setAlert] = useState({message: '', type: ''})

    //
    const {data: user} = useSWR('/user', {initialData: null, revalidateOnFocus: true})
    const {data: cart} = useSWR('/cart' , {revalidateOnFocus: true, initialData: []})
    const {data: products} = useSWR(() => user && !user.guest ? `/products/${user._id}` : '' , {revalidateOnFocus: true, initialData: []})
    const {data: total} = useSWR(() => cart && cart.length > 0 ? '/checkout/total' : '', {initialData: 0, revalidateOnFocus: true})
    console.log('Globals State: -- ', user)
    return(
        <StateContext.Provider value= {{UI, toggleUI, user, alert, setAlert, cart, userAction,commentAction, cartAction, productAction}}>
            {children}
        </StateContext.Provider>
    )
}

export const GlobalState = () => useContext(StateContext)