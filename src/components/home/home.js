import styles from './home.module.css'
import useSWR, {useSWRInfinite} from 'swr'
import DisplayProduct from '../user/displayProduct'
import { GlobalState } from '../../context/globalState'
import LoadingProduct from '../re-usables/loadingProduct'
import {useEffect, useState} from 'react'



export default function home() {

const productPerRequest = 10
const [count, setCount] = useState(productPerRequest)

const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(() => `/products/query/all/${count}`);
const productReducer = data && data.reduce((a, b) => a.concat(b), [])

const [products, setProducts] = useState([])

useEffect(() => {
    if (productReducer && productReducer.length > 0) {
        const newProduct = sanitizeDtata(productReducer, products)
        setProducts(prev => [ ...prev, ...newProduct ])
    }
}, [data])


// const onScroll = () => {
    typeof window !== 'undefined' && window.addEventListener('scroll', function() {

            const totalHeight = document.body.scrollHeight // the total page height
            const scrollPoint = window.scrollY + window.innerHeight;  // scroll point on the page
            // fetch more data when you get to to page end
            if (scrollPoint === totalHeight) {
                setCount( prevState => prevState + productPerRequest )
                setSize( size + 1 )
            }
        });


  return (
      <div className= {styles.home} id= 'home' >
            {
                products && products.length > 0 ? 
                products.map((product, index) => (
                <DisplayProduct key= {index} product= {product} />
                )) : <LoadingProduct />
            }
        </div>
  );
}



const sanitizeDtata = (source, target) => {
    const arrayOfID = target && target.length > 0 ? target.map( prod => prod?._id ) : []
    const basket = []

    for (let x= 0; x <= source.length; x++) {
        if ( source[x] && source[x]._id && !arrayOfID.includes(source[x]._id)) {
            basket.push(source[x])
        } 
        else continue
    }
    return basket
}