import styles from './style/table.module.css'
import {v4 as uuid} from 'uuid'
import {Table, Header, Icon} from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'
import moment from 'moment'
import { useRouter } from 'next/router'



export const TableLayout = ({children}) => {

  const {UI} = GlobalState()

  return(
    <Table basic='very' selectable unstackable striped celled style= {{ flex: '1 1', color: UI.color }} inverted = {UI.dark ? true : false}>
      {children}
    </Table>
  )
}

export const TableBody = ({business}) => {

  const {UI} = GlobalState()
  const router = useRouter()

  return(
    <Table.Body >
      {business && business.map(bus => (
        <Table.Row style= {{ color: UI.color, cursor: 'pointer'}} key= {uuid()} onClick= {() => router.push(`${router.asPath}/${bus._id}`)} >
        <Table.Cell  style= {{
                padding: '10px',
                fontFamily: 'Roboto',
                fontWeight: '500',
                fontSize: '13px',
                textTransform: 'capitalize'
               }}>
          <Header image style= {{ display: 'flex', alignItems: 'center' }}>
              <span >
                        {bus.image?.url ?
                        <span className= {styles.profile_tab_image} style= {{ border: UI.border,backgroundColor: UI.bgColor }}>
                            <img src= {bus.image.url} alt="profile picture"/>
                        </span>  :
                        <Icon circular color= 'teal' inverted= {UI.dark ? true : false} >
                            <span className= {styles.profile_tab_text}>{(bus && bus.business_name)[0]}</span> 
                        </Icon> 
                        }
              </span>
            <Header.Content>
              <span className= {styles.title} style= {{ color: UI.color}}>{bus.business_name}</span>
              <Header.Subheader>
                <span className= {styles.subheader} style= {{ color: UI.color}}>
                  {bus.created_at && moment(bus.created_at).format('lll')}
                </span>
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>${bus.revenue || 0}</Table.Cell>
      </Table.Row>
      ))}
    </Table.Body>
  )
}


export const TableHeader = ({headers}) => {

  const {UI} = GlobalState()

    return(
      <Table.Header style= {{ color: UI.color}}>
          <Table.Row style= {{ color: UI.color, }}>
            {headers && headers.map(head => (
              <Table.HeaderCell key= {uuid()} style= {{ 
                padding: '10px',
                fontFamily: 'Roboto',
                fontWeight: '500',
                fontSize: '13px',
                textTransform: 'capitalize',
                color: UI.color
               }}>
                 {head}
               </Table.HeaderCell>
            ))}
          </Table.Row>
      </Table.Header>
    )
}