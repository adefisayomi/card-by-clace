import styles from './style/productCard.module.scss'
import CardLayout from '../re-usables/cardLayout'
import Slider from '../slider/slider'
import { useRouter } from 'next/router'
import {Icon, Divider} from 'semantic-ui-react'
import useSWR from 'swr'
import { GlobalState } from '../../context/globalState'
import Action from './action'
import { useState, useEffect } from 'react'
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
        <CardLayout header= {product?.details?.title || ''} width= '550px' >
            <div className= {styles.productCard} style= {{ color: UI.color, backgroundColor: UI.bgColor}}>

                <div className= {styles.productCard_slider} >
                    <Slider images= {product?.details?.images} />
                </div>

                <div className= {styles.productCard_action} >
                    <span>
                        <Action handleExpandClick= {handleExpandClick} expanded= {expanded} product= {product}  />
                    </span>

                    <span >
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Divider />
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
                    </span>
                </div>
            </div>
        </CardLayout>
    )
}