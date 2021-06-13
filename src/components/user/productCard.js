import styles from './style/productCard.module.css'
import CardLayout from '../re-usables/cardLayout'
import { useRouter } from 'next/router'
import {Icon, Divider} from 'semantic-ui-react'
import Slider from '../slider/slider'
import useSWR from 'swr'
import { GlobalState } from '../../context/globalState'
import Action from './action'
import { useState } from 'react'
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Comments from '../comments/comments'
import CommentForm from '../comments/commentForm'
import OrderForm from '../order/order_form'


export default function productCard () {

    const router = useRouter()
    const {UI} = GlobalState()
    const [expanded, setExpanded] = useState(false)
    const handleExpandClick = () => setExpanded(!expanded)
  
    const {data: product} = useSWR(() => {
        return router.query ? `/products/${router.query.user}/${router.query.product}` : ''
    }, {revalidateOnFocus: true})
  
    const {data: author} = useSWR(() => {
        return router.query ? `/user/${router.query.user}` : ''
    }, {revalidateOnFocus: true})


    return (
        <CardLayout>
            <div className= {styles.product}>
                <header style= {{ borderBottom: UI.border }}>
                    <h1>{product?.details?.title || ''}</h1>
                    <span className= {styles.product_cancel}>
                        <Icon name= 'cancel' link bordered onClick= {() => router.back()} />
                    </span>
                </header>
                <span className= {styles.product_images}>
                    <Slider images= {product?.details?.images} />
                </span>
                <span className= {styles.product_action}>
                    <Action handleExpandClick= {handleExpandClick} expanded= {expanded} product= {product}  />
                </span>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <div className= {styles.product_order_form}>
                        <OrderForm product = {product} />
                    </div>
                    <Divider />
                    <CardMedia>
                        <Comments product = {product} />
                    </CardMedia>
                    <CardMedia className= {styles.card_comment}>
                        <CommentForm product = {product} />
                    </CardMedia> 
                </Collapse>
            </div>
        </CardLayout>
    )
}