import { useRouter } from 'next/router'
import useSWR from 'swr'
import styles from './style/profile_tab.module.css'


export default function ProfileTab ({width, user, border}) {

    const router = useRouter()

    const randomColor = () =>  '#'+Math.floor(Math.random()*16777215).toString(16)

    return(
        <>
        { user && user._id &&
            <div className= {styles.profile_tab}
                style= {{ width: width, height: width, border: border, borderColor: randomColor() }}
                onClick= {() => user ? router.push(`/${user.username || user._id}`) : ''}
                >
                { user.image && user?.image?.url ?
                    <span className= {styles.profile_tab_image}>
                        <img src= {user?.image?.url} alt="profile-picture"/>
                    </span> :
                    <span>
                        <h1> {user?.username ? user.username[0] : user?.first_name ? user?.first_name[0] : ''} </h1>
                    </span>
                }
            </div>}
        </>
    )
}