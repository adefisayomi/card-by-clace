import Update from '../../../src/components/user/update_product'
import axios from 'axios'


// export async function getServerSideProps (ctx) {

//     try {
//         const product = await axios.get(`/products/${ctx.query.user}/${ctx.query.product}`)
//         return {
//             props: { product: product.data.data }
//         }
//     }
//     catch(err) {
//         return {
//             redirect: {
//                 destination: ctx.resolvedUrl,
//                 permanent: false
//             }
//         }
//     }
// }

export default function update () {
    return <Update />
}