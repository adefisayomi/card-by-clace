import styles from './style/upload_profile_picture.module.css'
import {Icon} from 'semantic-ui-react'
import { memo } from 'react'


const UploadProfilePicture = memo(({onChange, image, text , onDelete, width}) => {


    return(
        <div className= {styles.upload_profile_picture} style= {{ width: width , height: width }}>
            <div className= {styles.upload_profile_picture_div}>
              { image ? 
                    <img src= { image && image.name ? URL.createObjectURL(image) : image && image.url ? image.url : '' } alt=""/>
                    :
                <h1>{text ? text[0] : 'nora'}</h1>}
            </div>
            { image && onDelete &&
             <div className= {styles.upload_profile_picture_delete}>
                <Icon
                    name= 'cancel'
                    color= 'red'
                    fitted
                    size= 'large'
                    id= {image.id ? image.id : image.name ? image.name : ''}
                    link
                    onClick= {onDelete}
                />
            </div>}
            <label htmlFor="logo" className= {styles.upload_profile_picture_label}>
            <input type="file" name="logo" id="logo" onChange= {onChange}/>
                <Icon
                    name= 'camera'
                    fitted
                    circular
                    inverted
                    link
                    onChange= {onChange}
                />
            </label>
        </div>
    )
})

export default UploadProfilePicture