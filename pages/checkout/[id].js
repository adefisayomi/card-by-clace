import axios from "axios";
import Thankyou from "../../src/components/checkout/thank_you";


// export async function getServerSideProps (ctx) {
//     // confirm transaction by query
//     const res = await axios.post(`/checkout/validate`)
//     if
// }


export default function thanks () {
    return <Thankyou />
}