import styles from './style/homeCard.module.css'
import CardLayout from '../re-usables/cardLayout'
import Header from '../re-usables/header'
import Slider from '../slider/slider'
import useSWR from 'swr'


export default function homeCard ({product}) {

    const {data: author} = useSWR(() => product ? `/user/${product.author._id}` : '', {revalidateOnFocus: true})
    
    return (
        <CardLayout>
            <div className= {styles.card}>
                <header>
                    <Header 
                        header= {{ title: product?.details?.title, subheader: product?.details?.category }}
                        user= { author }
                        icon= {{ name: 'arrow', content: product?.details?.description }}
                        path= {{ title: `${author?.username||author?._id}/${product?.details?.title||product?._id}` }}
                    />
                </header>
                <div className= {styles.card_images}> <Slider images= {product?.details?.images} /> </div>
            </div>
        </CardLayout>
    )
}