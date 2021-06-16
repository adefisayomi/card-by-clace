import styles from './style/gallery.module.css'
import Slider from '../slider/slider'
import { GlobalState } from '../../context/globalState'
import { Label, Icon } from 'semantic-ui-react'
import {useRouter} from 'next/router'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';


export default function gallery ({products, onClick}) {

    const router = useRouter()
    const {UI, user} = GlobalState()


    return(
        <div className= {styles.gallery}>
            {products && products.length > 0 && 
                products.map((product, index) => (
                    <div key= {index} className= {styles.gallery_div}>

                        <span className= {styles.gellery_span}>
                            <Slider images= {product?.details?.images || []} />
                        </span>
                        <span className= {styles.gallery_span_overlay}>
                            <span>
                                    <Label as= 'a' tag color= 'blue' onClick= {() => router.push(`${router.asPath}/${product._id}`)}>
                                        ₦{product?.details?.price || ''}
                                    </Label>
                                    {
                                        product.author?._id === user?._id &&
                                        <IconButton aria-label="settings" onClick= {() => router.push(`${router.asPath}/${product._id}/update`)}>
                                            <EditIcon style= {{ color: 'rgb(29, 162, 250)', fontSize: '15px'}}  />
                                        </IconButton>
                                    }
                            </span>
                        </span>
                    </div>
            ))}
        </div>
    )
}