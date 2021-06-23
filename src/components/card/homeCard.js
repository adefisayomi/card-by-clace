import styles from './style/homeCard.module.scss'
import Slider from '../slider/slider'
import Details from './details'
import Header from '../re-usables/header'
import useSWR from 'swr'


export default function homeCard ({product, height}) {


  const {data: author} = useSWR(() => product ? `/user/${product.author._id}` : '', {revalidateOnFocus: true})

  return (

      <div className= {styles.homeCard}>

        <div className= {styles.homeCard_header}>
            <Header 
                header= {{ title: product?.details?.title, subheader: product?.details?.category }}
                user= { author }
                icon= {{ name: 'more', content: product?.details?.description }}
                path= {{ title: `/${author?.username||author?._id}/${product?._id}` }}
            />
        </div>

           <Slider dots= {false} height= {height} images = {product?.details?.images || ''} />

        <div className= {styles.homeCard_details}>
          <Details product= {product} />
        </div>
      </div>
  )
}