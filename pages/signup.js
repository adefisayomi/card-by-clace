import Signup from '../src/components/account/signup'
import axios from 'axios'

// export async function getServerSideProps (ctx) {

//     const res = await axios.get('/user')

//         if (res && res.data.data && !res.data.data.guest) {
//             return {
//                 redirect: {
//                     destination: '/',
//                     permanent: true
//                 }
//             }
//         }
//         else {
//          return { props: {user: res.data.data} }
//         }
// }


export default function signup () {
    return <Signup />
}