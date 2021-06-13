import styles from './style/user.module.css'
import Header from '../re-usables/header'
import { GlobalState } from '../../context/globalState'
import  Gallery from '../re-usables/gallery'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Empty from '../re-usables/empty'
import LoadingProduct from '../re-usables/loadingProduct'
import UserNotFound from '../re-usables/userNotFound'
import CardLayout from '../re-usables/cardLayout'
import Footer from '../re-usables/footer'


export default function User () {

    const router = useRouter()
    const {UI, user, products} = GlobalState()

    const {data: currentUser, isValidating} = useSWR(() => {
        if (router.query && router.query.user) {
            return `/user/${router.query.user}`
        }
        return null
    }, {revalidateOnFocus: true})

    const {data: currenUserProducts} = useSWR(() => {
        if (currentUser && currentUser._id ) {
            return `/products/${currentUser._id}`
        }
        return null
    }, { revalidateOnFocus: true})


    return(
        <CardLayout>
            {
                currentUser && currenUserProducts ?
                <div className= {styles.user}>
                    <header  style= {{ borderBottom: UI.border}} >
                        <Header 
                            user= {currentUser}
                            header= {{ title: `@ ${currentUser.username}` || '', 
                            subheader: `${currentUser?.first_name || ''}  ${currentUser?.last_name?.join(' ') || '' }` || '' }}
                            icon= {{name: currentUser?._id === user?._id && 'edit'}}
                            path= {{ icon: `${router.asPath}/profile` }}
                        />

                      {currentUser?._id === user?._id &&
                        <span className= {styles.user_footer}>
                            <Footer content= {{ content: 'Add product', icon: 'plus', onClick: () => router.push(`${router.asPath}/create`) }}/>
                        </span>}
                    </header>

                    <div className= {styles.user_main}>
                        {
                            currenUserProducts.length > 0 ? <Gallery products = {currenUserProducts} /> :
                            <Empty content= {{ text: 'You currently have no product.', icon: 'image' }} />
                        }
                    </div>
                </div> :

                    isValidating ?

                  <LoadingProduct title = 'Loading profile' /> :

                  <UserNotFound content= 'User not found' />
            }
        </CardLayout>
    )
}