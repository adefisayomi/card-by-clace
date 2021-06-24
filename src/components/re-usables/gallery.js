import styles from './style/gallery.module.scss'
import Slider from '../slider/coverSlider'
import { GlobalState } from '../../context/globalState'
import { Label, Icon } from 'semantic-ui-react'
import {useRouter} from 'next/router'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Popup from './pop_up'


export default function gallery ({products}) {

    const router = useRouter()
    const {UI, user} = GlobalState()


    return(
        <div className= {styles.gallery}>

            {products && products.length > 0 && 

            products.map((product, index) => (

                <div key= {index} className= {styles.gallery_div}>

                    <span className= {styles.gellery_span}>
                        <Slider images= {product?.details?.images || []}  />
                    </span>
                    <span className= {styles.gallery_span_overlay}>
                        <span>
                                <Label as= 'a' tag color= 'blue' onClick= {() => router.push(`${router.asPath}/${product._id}`)}>
                                    ₦{product?.details?.price || ''}
                                </Label>
                                {
                                    product.author?._id === user?._id &&
                                    <Popup
                                        trigger= {<Icon name= 'undo' link onClick= {() => router.push(`${router.asPath}/${product._id}/update`)}/>}
                                        content= 'update product'
                                    />
                                }
                        </span>
                    </span>
                </div>
            ))}
        </div>
    )
}