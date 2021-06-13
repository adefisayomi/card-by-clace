import styles from './style/wrapper.module.css'
import {GlobalState} from '../../context/globalState'
import Footer from '../nav/footer'
import Alert from './alert'
import Header from './header'
import axios from 'axios'
import Nav from '../nav/nav'
import { useEffect, useState } from 'react'
import {useRouter} from 'next/router'

export default function wrapper ({children}) {

    const router = useRouter()
    const {UI, user} = GlobalState()
    const [open, setOpen] = useState(true)
    const title = router.asPath.split('/').pop().replace('/', '|').replace('[', '').replace(']', '')
    const forbidenPath = ['login', 'signup']
    const toggleOpen = () => forbidenPath.includes(title) ? setOpen(false) : setOpen(true)

    // axios defaults
    axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost:5000/api' : 'https://rango.devbyclace.com/api'
    axios.defaults.headers['Content-Type'] = 'application/json'
    axios.defaults.withCredentials = true

    
    

    
    useEffect(() => {
        toggleOpen()
    }, [title, user])


    return ( 
        <div className= {styles.wrapper} style= {{ backgroundColor: UI.dark ? 'rgb(22,27,34)' : 'rgb(9,12,16)', color: UI.color }}>
            <Header title= {title} />
            <Alert />
            { open && <header> <Nav /> </header>}
            <main style= {{ minHeight: !open && '100vh' }}>{children}</main>
            { open && <footer><Footer /></footer>}
        </div>
    )
}