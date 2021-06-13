import Head from 'next/head'
import {useRouter} from 'next/router'

const Header = () => {

    const router = useRouter()
    const title = router.asPath.split('/').pop().replace('/', '|').replace('[', '').replace(']', '')


    return (
        <Head>
            <title>card | {title || 'Home'} </title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"/>
            <meta name="theme-color" content="#000000" />
            <meta name="description" content="Web site created using create-next-app" />
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
        </Head>
    )
    
}

export default Header