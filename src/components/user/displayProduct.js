import styles from './style/display_product.module.css'
import CardLayout from '../re-usables/cardLayout'
import Header from '../re-usables/header'
import Slider from '../slider/slider'
import useSWR from 'swr'


export default function displayProduct ({product}) {

    const {data: author} = useSWR(() => product ? `/user/${product.author._id}` : '', {revalidateOnFocus: true})
    
    return (
        <CardLayout>
            <div className= {styles.display_product}>
                <header>
                    <Header 
                        header= {{ title: product?.details?.title, subheader: product?.details?.category }}
                        user= { author }
                        icon= {{ name: 'more', content: product?.details?.description }}
                        path= {{ title: `/${author?.username||author?._id}/${product?._id}` }}
                    />
                </header>
                <div className= {styles.display_product_images}> <Slider images= {product?.details?.images} /> </div>
            </div>
        </CardLayout>
    )
}