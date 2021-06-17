import styles from './home.module.css'
import useSWR from 'swr'
import HomeCard from '../user/homeCard'
import { GlobalState } from '../../context/globalState'
import LoadingProduct from '../re-usables/loadingProduct'
import Slider from '../slider/slider'


export default function home () {

    const {UI} = GlobalState()
    const {data: products} = useSWR('/products', { revalidateOnFocus: true})

    return (
        <div className= {styles.home}>
            {/* <Slider /> */}
            {
                products && products.length > 0 ? 
                products.map((product, index) => (
                <HomeCard key= {index} product= {product} />
                )) : <LoadingProduct />
            }
        </div>
    )
}