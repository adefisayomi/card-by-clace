import PopUp from './pop_up'
import ProfileTab from './profileTab'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from './style/header.module.css'
import { useRouter } from 'next/router';
import { GlobalState } from '../../context/globalState';


export default function Header({ user,  header= {},  icon = {}, width= '40px', path= {}}) {

  const router = useRouter()
  const {UI} = GlobalState()

    return (
      <div className= {styles.header}>

        <div className= {styles.header_details}>
          <span> <ProfileTab user= {user || ''} width= {width} /> </span>

          <span className= {styles.header_details_title}>
            <a onClick= {() => router.push(path?.title || '')} >{header?.title}</a>
            <h4>{header.subheader}</h4>
          </span>
        </div>

        { icon &&
          <span className= {styles.header_popup}>
          <PopUp content= {icon.content || ''} trigger= {
              <IconButton onClick= {() => path.icon ? router.push(path.icon) : ''} aria-label="settings">
                 {icon.name == 'arrow' ? 
                    <ArrowForwardIosIcon style= {{ color: 'rgb(29, 162, 250)' }} /> :
                    icon.name == 'more' ? 
                    <MoreVertIcon style= {{ color: 'rgb(29, 162, 250)'}}  />  :
                    icon.name == 'edit' ?
                    <EditIcon style= {{ color: 'rgb(29, 162, 250)'}}  />  :
                   ''} 
              </IconButton>
          } />
        </span>
        }
      </div>
    )
  }

  // <span className= {styles.header_image}>
  //         <ProfileTab user= {header.user_id || ''} width= {width} />
  //       </span>

  //       <span className= {styles.header_titles}>
  //           <a onClick= {() => router.push(link?.header || '')} >{header.header || ''}</a>
  //           <h4>{header.subheader || ''}</h4>
  //       </span>

  //       <span className= {styles.header_icon}>
  //         <PopUp content= {icon.content || ''} trigger= {
  //             <IconButton onClick= {() => link.icon ? router.push(path.icon) : ''} aria-label="settings">
  //                {icon.name == 'arrow' ? 
  //                   <ArrowForwardIosIcon style= {{ color: 'rgb(29, 162, 250)' }} /> :
  //                   icon.name == 'more' ? 
  //                   <MoreVertIcon style= {{ color: 'rgb(29, 162, 250)'}}  />  :
  //                   icon.name == 'edit' ?
  //                   <EditIcon style= {{ color: 'rgb(29, 162, 250)'}}  />  :
  //                  ''} 
  //             </IconButton>
  //         } />
  //       </span>