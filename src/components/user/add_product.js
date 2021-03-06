import CardLayout from "../re-usables/cardLayout"
import { GlobalState } from "../../context/globalState"
import UploadImage from '../re-usables/upload_image'
import { useState } from "react"
import { Form, Button, Dropdown, Icon, Checkbox} from 'semantic-ui-react'
import styles from './style/add_product.module.css'
import { GetMultipleImage } from "../../utils/actions/getImage"
import { useRouter } from "next/router"
import {businessCategory} from '../../utils/static_files/menu'


export default function CreateProduct () {

    const router = useRouter()
    const {productAction, setAlert, UI, user} = GlobalState()
    const [form, setForm] = useState({images: [], options: {}})
    const [loading, setLoading] = useState(false)
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const getCategory = (e, {value}) => setForm({...form, category: value})
    const getOptions = (e) => setForm({...form, options: {...form.options, [e.target.name]: (e.target.value).split(',') }})

    // -----------------------------------------------------------
    const [showOption, setShowOptions] = useState({size: false, color: false})
    const toggleSize = () => {
        setShowOptions({...showOption, size: !showOption.size})
        setForm({...form, options: {...form.options, size: []}})
    }
    const toggleColor = () => {
        setShowOptions({...showOption, color: !showOption.color})
        setForm({...form, options: {...form.options, color: []}})
    }
    // ------------------------------------------------------------

    const getImages = async (e) => {
        const img = await GetMultipleImage(e)
        if(!img.success) setGlobalAlert({message: img.message})
        else setForm({...form, images: [...form.images, ...img.data]})
    }
    const deleteImage = (e) => setForm({...form, images: form.images.filter(img => img.name !== e.target.id)})

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await productAction.uploadProduct({form, setAlert})
        if (!res.success) setLoading(false)
        else {
            setLoading(false)
            setForm({})
            router.back()
        }
    }

    return(
        <CardLayout header= 'Create product.' redirect= {!user} width= '550px' >
            <div className= {styles.create} id= {styles.create}>
                <span className= {styles.create_images}>
                    <UploadImage onChange= {getImages} onDelete= {deleteImage} images= {form?.images} />
                </span>

                <Form>
                    <h1 style= {{ borderTop: UI.border, borderBottom: UI.border }}>product details -- </h1>

                    <Form.Field>
                        <label style= {{ color: UI.color }}>category</label>
                        <Dropdown
                            placeholder= 'category'
                            name= 'category'
                            type= 'text'
                            selection
                            search
                            value= {form.category || ''}
                            options= {businessCategory || []}
                            onChange= {getCategory}
                            style= {{border: UI.border, backgroundColor: UI.body}}
                            id= {styles.add_product_dropdown}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label style= {{ color: UI.color }}>Product title</label>
                        <input
                            placeholder= 'Product title'
                            name= 'title'
                            type= 'text'
                            value= {form.title || ''}
                            onChange= {getForm}
                            style= {{border: UI.border, backgroundColor: UI.body}}
                        />
                    </Form.Field> 

                    <Form.Group widths= 'equal'>
                            <Form.Field>
                                <label style= {{ color: UI.color }}>Price</label>
                                <input
                                    placeholder= 'Price'
                                    name= 'price'
                                    type= 'number'
                                    value= {form.price || ''}
                                    onChange= {getForm}
                                    style= {{border: UI.border, backgroundColor: UI.body}}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label style= {{ color: UI.color }}>Quantity</label>
                                <input
                                    placeholder= '10'
                                    name= 'quantity'
                                    min= '1'
                                    max= '100000'
                                    type= 'number'
                                    value= {form.quantity || ''}
                                    onChange= {getForm}
                                    style= {{border: UI.border, backgroundColor: UI.body}}
                                />
                            </Form.Field> 
                        </Form.Group>

                        <div className= {styles.add_product_options}>
                            <span id= {styles.add_product_options_header}>
                               <span>
                                   <Checkbox 
                                        label= {`Add sizes`}
                                        onChange= {toggleSize}
                                    />
                                </span>
                                <span>
                                    <Checkbox 
                                        label= {`Add colors`}
                                        onChange= {toggleColor}
                                    />
                                </span>
                            </span>
                            <span className= {styles.add_product_options_box}>
                                { showOption.size && 
                                    <label htmlFor="size">
                                        size -- 
                                        <input
                                            value= {form.options.size || ''}
                                            style= {{border: UI.border, backgroundColor: UI.body}}
                                            type="text" name="size" id="size"
                                            placeholder= 'seperate values with a comma'
                                            onChange = {getOptions}
                                        />
                                    </label>}

                                { showOption.color && 
                                    <label htmlFor="color">
                                        color -- 
                                        <input 
                                            value= {form.options.color || ''}
                                            style= {{border: UI.border, backgroundColor: UI.body}}
                                            type="text" name="color" id="color"
                                            placeholder= 'seperate values with a comma'
                                            onChange = {getOptions}
                                        />
                                    </label>}
                            </span>
                        </div>

                        <Form.Field>
                            <label style= {{ color: UI.color }}>Product Description</label>
                            <Form.TextArea
                                placeholder= 'Product Description...'
                                name= 'description'
                                value= {form.description || ''}
                                onChange= {getForm}
                                style= {{border: UI.border, backgroundColor: UI.body}}
                            />
                        </Form.Field> 
                        <Button
                            type= 'submit'
                            onClick= {handleSubmit}
                            icon= {{ name: loading ? 'spinner' : 'plus', loading }}
                            content= {loading? `Uploading... ` : 'Upload product'}
                            color= 'blue'
                            id= {styles.add_product_button}
                        />
                </Form>
            </div>
        </CardLayout>
        
    )
}