import { useContext, createContext, useState, useEffect, useCallback, useReducer} from "react";
import useSWR from "swr";
import {themeObject, themeReducer} from './reducers/themeAction'
import {userAction} from './reducers/userAction'
import {cartReducer} from './reducers/cartAction'
import {commentAction} from './reducers/commentAction'
import {productAction} from './reducers/productAction'
import {checkoutAction} from './reducers/checkoutAction'
import cookie from 'cookie'


const StateContext = createContext()

export default function GlobalStateProvider ({children}) {


    const [themeRef, toggleUI] = useReducer( themeReducer, {}, () => {
        const theme = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('card_theme'))
        return theme ? theme : themeObject
    } )
    const UI = themeRef && themeRef.isDark ? themeRef.dark : themeRef.light


    //  ----set ALert -------
    const [alert, setAlert] = useState({message: '', type: ''})

    const [trigger, setTrigger] = useState(false)   //enforces user login || signup
    const [globalLoading, setGlobalLoading] = useState(false)

    // -------- get USER -----
    const {data: user} = useSWR('/user', {initialData: null, revalidateOnFocus: true})
    
    // -------- get cart -------
    const [cart, cartAction] = useReducer(cartReducer, [], () => {
            let cartRef = typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('card_cart'))
            return  cartRef ? cartRef : []
    })

    const {data: products} = useSWR(() => user ? `/products/${user._id}` : '' , {revalidateOnFocus: true, initialData: []})
    
    return(
        <StateContext.Provider value= {{UI, toggleUI, user, products, alert, setAlert, cart, userAction, commentAction, checkoutAction, cartAction, productAction, trigger, setTrigger, globalLoading, setGlobalLoading}}>
            {children}
        </StateContext.Provider>
    )
}

export const GlobalState = () => useContext(StateContext)