import { memo } from 'react'
import { Icon } from 'semantic-ui-react'
import styles from './style/upload_image.module.css'
import { GlobalState } from '../../context/globalState'


const Upload = memo(({onDelete, onChange, images, hide}) => {

    const {UI} = GlobalState()

    return(
        <div className= {styles.upload} >
           {images && images.map((image, index) => (
               <span className= {styles.upload_image} key= {index}>
                    <img src= { image.url ? image.url : image.name ? URL.createObjectURL(image) : '' } encType="multipart/form-data"  alt="" />
                    <span className= {styles.upload_overlay}>
                        {onDelete && <Icon id= {image.id ? image.id : image.name ? image.name : ''} name= 'cancel' size= 'large' color= 'red' link onClick= {(e) => onDelete(e)}/>}
                    </span>
                </span>
           ))}

                {!hide && <label htmlFor="upload_image" >
                    <Icon size= 'large' name= 'plus' link style= {{ color: 'white' }} onChange= {onChange}/>
                    <input type="file" name="upload_image" id="upload_image" onChange= {onChange} multiple/>
                </label>}
        </div>
    )
})

export default Upload