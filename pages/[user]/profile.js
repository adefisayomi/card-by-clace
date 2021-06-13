import axios from 'axios'
import UpdateProfile from '../../src/components/user/update_user'


export async function getServerSideProps (ctx) {

    const res = await axios.get('/user')
    if (res?.data && !res.data?.success || res.data.data?.guest) {
        return {
            redirect: {
                destination: ctx.resolvedUrl,
                permanent: false
            }
        }
    }
    else {
        return { props: { user: res.data.data } }
    }
}


export default function profile ({user}) {
    return <UpdateProfile user= {user} />
}