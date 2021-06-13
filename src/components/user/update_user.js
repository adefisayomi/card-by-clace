import styles from './style/update_user.module.css'
import {Form, Button, Icon, Dropdown, Divider} from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import {GlobalState} from '../../context/globalState'
import {socialMediaOptions, genderOptions} from '../../utils/static_files/menu'
import { GetSingleImage} from '../../utils/actions/getImage'
import {useRouter} from 'next/router'
import UploadProfilePicture from '../re-usables/UploadProfilePicture'
import CardLayout from '../re-usables/cardLayout'


export default function update ({user}) {
console.log(user)
    const router = useRouter()
    const {UI, setAlert, userAction} = GlobalState()
    const [form, setForm] = useState({...user})
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    // -----------
    useEffect(() => {
        if (user) {
            setForm({...user, name: `${user.first_name || ''} ${user.last_name || ''}`})
        }
    }, [user])
    // -----------
    const [loading, setLoading] = useState(false)
    const getImage = async (e) => {  //Get image
        const img = await GetSingleImage(e)
        setForm({...form, image: img.data})
    }
    const deleteImage = () => {  //Delete image
        setForm({...form, image: {}})
   }
   const [socialList, setSocialList] = useState({})
   const getSocialListName = (e, {value}) => setSocialList({...socialList, name: value})
   const getSocialListUrl = (e) => setSocialList({...socialList, url: e.target.value})
   const getGender = (e, {value}) => setForm({...form, gender: value})
   const getSocialMedia = (e) => {
       if(socialList.name  && socialList.url) {
            setForm({...form, social_media: {...form.social_media, [socialList.name]: socialList.url}})
            setSocialList({name: '', url: ''})
       }
   }

   const handleSubmit = async (e) => {  //Submit form data for update
       e.preventDefault()
       setLoading(true)

       await userAction.updateUser({form, setAlert})
       setLoading(false)
   }


    return(
        <CardLayout >
                <div className= {styles.profile} id = {styles.profile} style= {{ color: UI.color }}>
                    <header style= {{ borderBottom: UI.border }}>
                    <UploadProfilePicture 
                        text= {form.username || form.first_name || ''}
                        image= {form?.image}
                        onDelete= {deleteImage}
                        onChange= {getImage}
                    />
                    <span><Icon name= 'angle double left' color= 'blue' size= 'large' link onClick= {() => router.back()} /></span>
                    </header>
                    <Divider />
                    <Form onSubmit= {handleSubmit}>
                        <Form.Field>
                            <label>Name</label>
                            <input
                                placeholder= 'name...'
                                name= 'name'
                                type= 'text'
                                value= { form.name || '' }
                                style= {{ border: UI.border }}
                                onChange= {getForm}
                            />
                        </Form.Field>

                        <Form.Group widths= '16'>
                            <Form.Field width= '14'>
                                <label>Email</label>
                                <input
                                    placeholder= 'email'
                                    name= 'email'
                                    type= 'text'
                                    style= {{ border: UI.border }}
                                    value= { form.email || '' }
                                    onChange= {getForm}
                                /> 
                            </Form.Field>
                            <Form.Field width= '6'>
                                <label>Username</label>
                                <input
                                    placeholder= 'username'
                                    name= 'username'
                                    type= 'text'
                                    style= {{ border: UI.border }}
                                    value= { form.username || '' }
                                    onChange= {getForm}
                                />
                            </Form.Field>
                        </Form.Group>

                        <Form.Group widths= '16'>
                            <Form.Field width= '6'>
                                <label>Phone</label>
                                <input
                                    placeholder= 'phone number'
                                    name= 'phone'
                                    type= 'text'
                                    style= {{ border: UI.border }}
                                    value= { form.phone || '' }
                                    onChange= {getForm}
                                /> 
                            </Form.Field>
                            <Form.Field width= '14'>
                                <label>Gender</label>
                                <Dropdown
                                    placeholder= 'gender'
                                    options= {genderOptions}
                                    selection
                                    name= 'gender'
                                    id= {styles.profile_dropdown}
                                    type= 'text'
                                    style= {{ border: UI.border }}
                                    value= { form.gender || '' }
                                    onChange= {getGender}
                                />
                            </Form.Field>
                        </Form.Group>

                        <Form.Field>
                            <label>Address</label>
                            <input
                                placeholder= 'Office Adress...'
                                name= 'address'
                                type= 'text'
                                style= {{ border: UI.border }}
                                value= {form.address || ''}
                                onChange= {getForm}
                            />
                        </Form.Field>
                            <span className= {styles.profile_social} style= {{ border: UI.border }}>
                            <Form.Field width= '6'>
                                <label>Social media</label>
                                <Dropdown
                                    placeholder= 'account'
                                    name= 'social_media'
                                    type= 'text'
                                    options= {socialMediaOptions}
                                    id= {styles.profile_dropdown}
                                    selection
                                    style= {{ border: UI.border }}
                                    search
                                    onChange= {getSocialListName}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Url</label>
                                <input
                                    placeholder= 'url...'
                                    name= 'url'
                                    type= 'text'
                                    style= {{ border: UI.border }}
                                    value= {socialList.url || ''}
                                    onChange= {getSocialListUrl}
                                    icon= {{ inverted: true, name: 'plus', link: true, circular: true, onClick: getSocialMedia }}
                                />
                            </Form.Field>
                            
                            { 
                                form.social_media && Object.keys(form.social_media).length > 0 &&
                                <div>
                                    {Object.entries(form.social_media).map((data, index) => (
                                        <div key= {index} style= {{ marginBottom: '5px' }}>
                                        <Divider fitted/>
                                        <span className= {styles.social_media_list}>
                                            <Icon name= {data[0]} color= 'black' size= 'small' circular inverted />
                                            <a href= {data[1]} target= '_blank' >{data[1]}</a>
                                        </span>
                                        <Divider fitted/>
                                        </div>
                                    ))}
                                </div>
                            }
                        </span>
                        <span style= {{ padding: '10px 0' }}></span>
                        <Button
                            type= 'submit'
                            content= {loading ? 'Updating...' : 'Update' }
                            icon= {loading && { name: 'spinner', loading: true }}
                        />
                    </Form>
                </div> 
        </CardLayout>
    )
}