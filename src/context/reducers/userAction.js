import axios from "axios"
import { trigger, mutate } from "swr"
import firebase from '../../utils/firebase'
import convertToFormData from '../../utils/actions/convertToFormData'


async function logOut () {
    mutate(`/user`, null, false)
    await axios.delete('/account/logout')
    trigger('/user')
}

// Login
async function doLogin ({form, setAlert}) {
    try {
        // gets authToken
        const token = await axios.post('/account/login', form)
        if(token && !token.data.success) throw new Error(token.data.message)
        // 
        const user = await axios.get('/user', {headers: { authorization: `Bearer ${token.data.data}` }})
        if(user && !user.data.success) throw new Error(user.data.message)
        // 
        setAlert({message: `login successful`})
        trigger('/user')
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

// signup
async function doSignup ({form, setAlert}) {
    try {
        // gets authToken
        const token = await axios.post('/account/signup', form)
        if(token && !token.data.success) throw new Error(token.data.message)
        // 
        setAlert({message: 'account successfuly created.'})
        // 
        const user = await axios.get('/user', {headers: { authorization: `Bearer ${token.data.data}` }})
        if(user && !user.data.success) throw new Error(user.data.message)
        //
        setAlert({message: `login successful`})
        return trigger('/user')
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'}) 
    }
}

// signin with google
const googleSignin = async ({path, setAlert}) => {
    try {
        const Provider = new firebase.auth.GoogleAuthProvider();
        const googleToken = await firebase.auth().signInWithPopup(Provider)
        const token = await axios.post(path, {token: googleToken.user.za})
        if(token && !token.data.success) throw new Error(token.data.message)
        // 
        const user = await axios.get('/user', {headers: { authorization: `Bearer ${token.data.data}` }})
        if(user && !user.data.success) throw new Error(user.data.message)
        mutate('/user')
        const message = path == '/account/google/login' ?
                    ` login successful` :
                    `account successfuly created.`
        setAlert({message: message})
        return
    }
    catch(err) {
        setAlert({message: err.message, type: 'error'})
        return
    }
}

// update user
const updateUser = async ({form, setAlert}) => {
    try{
        const data = convertToFormData(form)  //convert form to Form data
        const res = await axios.put(`/user`, data)
        if(res && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message})
        return trigger(`/user`)
    }
    catch(err){
        return setAlert({message: err.message, type: 'error'})
    }
}

export const userAction = {googleSignin, logOut, doLogin, doSignup, updateUser}