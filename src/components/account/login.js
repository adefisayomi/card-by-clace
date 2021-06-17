import { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { GlobalState } from "../../context/globalState";
import GoogleButton from './buttons'
import Link from 'next/link'
import CardLayout from '../re-usables/cardLayout'
import styles from './style/login.module.css'
import Footer from '../nav/footer'



export default function login () {

    const {userAction,  UI, setAlert, user} = GlobalState()
    const [form, setForm] = useState({})
    const [showPass, setShowPass] = useState(false)
    const togglePass = () => setShowPass(!showPass)
    const [loading, setLoading] = useState(false)
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const [useGoogle, setUseGoogle] = useState(true)
    const toggleGoogle = () => setUseGoogle(!useGoogle)

    // // 
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await userAction.doLogin({form, setAlert})
        return setLoading(false)
    }
   
    return(
        <CardLayout header= 'Card by clace' redirect= {user}>
            <div className= {styles.login}>
                 <div className= {styles.login_container}>
                    <div className= {styles.login_options}>
                        <Form className= {styles.login_google} style= {{ transform: useGoogle && `translateX(0%)`, position: !useGoogle && 'absolute' }}>
                            <GoogleButton path= {'/account/google/login'} content= {'Continue with Google'} />
                        </Form>

                        <Form className= {styles.login_username} style= {{ transform: !useGoogle && `translateX(0%)`, position: useGoogle && 'absolute', color: UI.color }} onSubmit= {handleSubmit}>
                            <input
                                placeholder= 'Username, email or Phone'
                                name= 'username'
                                type= 'text'
                                value= {form.username || ''}
                                style= {{border: UI.border}}
                                id= {styles.form_input}
                                onChange= {getForm}
                                />
                            <input
                                placeholder= 'Password'
                                name= 'password'
                                type= {showPass ? 'text' : 'password'}
                                // icon= {{name: showPass ? 'eye' : 'eye slash', link: true, onClick: togglePass, circular: UI.dark && true}}
                                value= {form.password || ''}
                                style= {{border: UI.border}}
                                id= {styles.form_input}
                                onChange= {getForm}
                            />
                            <Button
                                content= { loading ? 'verifying...' : 'Log in' }
                                color= 'black'
                                type= 'submit'
                                id= {styles.form_button}
                                icon= {{ name: loading && 'spinner', loading }}
                            />
                            <span>
                                <Link href= '/password/reset'><p>Reset password</p></Link>
                            </span>
                        </Form>
                    </div>
                    <span className= {styles.login_toggle}>
                        <Checkbox id= 'checkBox' onChange= {toggleGoogle}/>
                        <label htmlFor= 'checkBox' style= {{ color: UI.color }}>{`signin with ${useGoogle ? 'credentials' : 'Google'}`}</label>
                        <Link href= '/signup'><p className= {styles.login_create_link}>Create account</p></Link>
                    </span>
                    </div>
                <div>
                    <Footer />
                </div> 
            </div>
        </CardLayout>
    )
}