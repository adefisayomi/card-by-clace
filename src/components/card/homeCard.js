import styles from './style/homeCard.module.scss'
import Slider from '../slider/slider'
import Details from './details'
import Header from '../re-usables/header'
import useSWR from 'swr'
import { Fragment } from 'react'
import {Placeholder} from 'semantic-ui-react'


export default function homeCard ({product, height}) {


  const {data: author} = useSWR(() => product ? `/user/${product.author._id}` : '', {revalidateOnFocus: true})

  return (
      <Fragment>
        {
          product && product._id && product.details.images && product.details.images[0].url ?
          <div className= {styles.homeCard}>
            <div className= {styles.homeCard_header}>
                <Header 
                    header= {{ title: product?.details?.title, subheader: product?.details?.category }}
                    user= { author }
                    icon= {{ name: 'more', content: product?.details?.description }}
                    path= {{ title: `/${author?.username||author?._id}/${product?._id}` }}
                />
            </div>

              <Slider dots= {false} images = {product?.details?.images || ''} height= {height} />

            <div className= {styles.homeCard_details}>
              <Details product= {product} path= {`/${author?.username||author?._id}/${product?._id}`} />
            </div>
          </div> : 
          <Placeholder className= {styles.homeCard_placeholder} style= {{ height: height }}>
            <Placeholder.Image />
          </Placeholder>
        }
      
      </Fragment>
  )
}