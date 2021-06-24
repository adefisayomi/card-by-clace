import { useRouter } from 'next/router'
import styles from './style/profile_tab.module.scss'
import {Image} from 'semantic-ui-react'


export default function ProfileTab ({width, user, border}) {

    const router = useRouter()

    const randomColor = () =>  '#'+ Math.floor(Math.random()*16777215).toString(16)

    return(
        <div className= {styles.profile_tab} 
            style= {{ width: width, height: width, border: border, borderColor: randomColor() }}
            onClick= {() => router.push(`/${user?.username || user?._id}`)}
            >
            {
                user && user.image && user.image.url ? 
                <Image src= {user.image.url} alt= 'profile-picture' /> : 
                user && user.username || user.first_name ? 
                <h1> {user?.username ? user.username[0] : user?.first_name ? user?.first_name[0] : ''} </h1> :
                <h1> C</h1>
            }
            
        </div>
    )
}