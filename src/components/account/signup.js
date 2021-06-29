import { useState } from "react";
import { Button, Checkbox, Form, Input } from "semantic-ui-react";
import { GlobalState } from "../../context/globalState";
import GoogleButton from './buttons'
import Link from 'next/link'
import styles from './style/signup.module.css'
import CardLayout from '../re-usables/cardLayout'
import Footer from '../nav/footer'



export default function signup () {

    const {userAction,  UI, setAlert,user} = GlobalState()
    const [form, setForm] = useState({})
    const [showPass, setShowPass] = useState(false)
    const togglePass = () => setShowPass(!showPass)
    const [loading, setLoading] = useState(false)
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const [useGoogle, setUseGoogle] = useState(true)
    const toggleGoogle = () => setUseGoogle(!useGoogle)

    // 
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await userAction.doSignup({form, setAlert})
        return setLoading(false)
    }

    return(
        <CardLayout  header= 'Card by clace' redirect= {user} width= '500px'>
            <div className= {styles.signup} style= {{ color: UI.color }}>
                <div className= {styles.signup_container}>
                    <div className= {styles.signup_options}>
                        <Form className= {styles.signup_google} style= {{ transform: useGoogle && `translateX(0%)`, position: !useGoogle && 'absolute' }}>
                            <GoogleButton path= {'/account/google/signup'} content= {'Signup with Google'} />
                        </Form>

                        <Form className= {styles.signup_username} style= {{ transform: !useGoogle && `translateX(0%)`, position: useGoogle && 'absolute' }} onSubmit= {handleSubmit}>
                            <input
                                placeholder= 'Username'
                                name= 'username'
                                type= 'text'value= {form.username || ''}
                                style= {{border: UI.border, backgroundColor: UI.body}}
                                id= {styles.form_input}
                                onChange= {getForm}
                            />
                            <input
                                placeholder= 'Email'
                                name= 'email'
                                type= 'text'value= {form.email || ''}
                                style= {{border: UI.border, backgroundColor: UI.body}}
                                id= {styles.form_input}
                                onChange= {getForm}
                            />
                            <input
                                placeholder= 'Password'
                                name= 'password'type= {showPass ? 'text' : 'password'}
                                // icon= {{name: showPass ? 'eye' : 'eye slash', link: true, onClick: togglePass,  circular: UI.dark && true}}
                                value= {form.password || ''}
                                style= {{border: UI.border, backgroundColor: UI.body}}
                                id= {styles.form_input}
                                onChange= {getForm}
                            />
                            <div style= {{marginBottom: '10px'}}></div>
                            <Button
                                content= {loading ? 'creating account...' : 'Create account'}
                                icon= {{ name: loading && 'spinner', loading }}
                                id= {styles.form_button}
                                color= 'blue'
                                type= 'submit'
                            />
                            <span>
                                <Link href= '/account/password/reset'><p>Reset password</p></Link>
                            </span>
                        </Form>
                    </div>
                    <span className= {styles.signup_toggle}>
                    <Checkbox id= 'checkBox' onChange= {toggleGoogle}/>
                    <label htmlFor= 'checkBox' style= {{ color: UI.color }}>{`Create account with ${useGoogle ? 'credentials' : 'Google'}`}</label>
                    <Link href= '/login'><p className= {styles.signup_create_link}>Login</p></Link>
                    </span>
                </div>
                <div>
                   <Footer />
                </div>
            </div>
        </CardLayout>
    )
}