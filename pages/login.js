import axios from 'axios'
import Login from '../src/components/account/login'


export async function getServerSideProps (ctx) {

    const res = await axios.get('/user')
    if (res && res.data.success && res.data.data && !res.data.data.guest) {
        return {
            redirect: {
                destination: ctx.resolvedUrl,
                permanent: false
            }
        }
    }
    else {
        return { props: {  } }
    }
}


export default function login () {
    return <Login />
}