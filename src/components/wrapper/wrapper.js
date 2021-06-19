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
    const {UI, user, setTrigger, trigger, globalLoading, setGlobalLoading} = GlobalState()
    const [open, setOpen] = useState(true)
    const title = router.asPath.split('/').pop().replace('/', '|').replace('[', '').replace(']', '')
    const forbidenPath = ['login', 'signup']
    const toggleOpen = () => forbidenPath.includes(title) ? setOpen(false) : setOpen(true)

    // axios defaults
    axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost:5000/api' : 'https://rango.devbyclace.com/api'
    axios.defaults.headers['Content-Type'] = 'application/json'
    axios.defaults.withCredentials = true
    const source = axios.CancelToken.source();
    const cancelToken = source.token
    axios.defaults.cancelToken = cancelToken

    

    axios.interceptors.request.use(req => {
        // if (!user && req && req.method !== 'get') {
        //     setTrigger(true)
        //     source.cancel('you need to login to continue.')
        // }
        setGlobalLoading(true)
        return req
    }, err => Promise.reject(err))

    axios.interceptors.response.use(res => {
        setGlobalLoading(false)
        return res
    }, err => Promise.reject(err))


    
    

    
    useEffect(() => {
        toggleOpen()
    }, [title, user])


    return (
        <div className= {styles.wrapper} style= {{ backgroundColor: UI.body, color: UI.color }}>
            <Header title= {title} />
            <Alert />
            { open && <div classNam= {styles.wrapper_header}> <Nav /> </div>}
            <div className= {styles.wrapper_main} style= {{ minHeight: !open && '100vh' }}>{children}</div>
            { open && <footer><Footer /></footer>}
        </div>
    )
}