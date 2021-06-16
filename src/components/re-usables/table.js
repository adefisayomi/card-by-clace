import styles from './style/table.module.css'
import {Table, Header, Icon} from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'
import { useRouter } from 'next/router'



export const TableLayout = ({children}) => {

  const {UI} = GlobalState()

  return(
    <Table basic='very' selectable unstackable striped celled style= {{ flex: '1 1', color: UI.color }} inverted = {UI.dark ? true : false}>
      {children}
    </Table>
  )
}

export const TableBody = ({clients}) => {

  const {UI} = GlobalState()
  const router = useRouter()
  const randomColor = () =>  '#'+Math.floor(Math.random()*16777215).toString(16)

// onClick= {() => router.push(`${router.asPath}/${client._id}`)}


  return(
    <Table.Body >
      {clients && clients.map((client, index) => (

        <Table.Row style= {{ color: UI.color, cursor: 'pointer'}} key= {index}  >

        <Table.Cell id= {styles.table_body_cell} >

          <Header image style= {{ display: 'flex', alignItems: 'center' }}>
              <span className= {styles.table_image} style= {{ color: UI.color, borderColor: randomColor()}} >
                <h1>{(client.first_name)[0] || 'c'}</h1>
              </span>
            <Header.Content>

              <span className= {styles.title} style= {{ color: UI.color}}>{client.first_name || ''}</span>

              <Header.Subheader>
                <span className= {styles.subheader}>
                  {client.email}
                </span>
              </Header.Subheader>

            </Header.Content>
          </Header>

        </Table.Cell>

        <Table.Cell>₦ {client.total || 0}</Table.Cell>

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
            {headers && headers.map((head, index) => (
              <Table.HeaderCell key= {index} id= {styles.table_body_cell}>
                 {head}
               </Table.HeaderCell>
            ))}
          </Table.Row>
      </Table.Header>
    )
}