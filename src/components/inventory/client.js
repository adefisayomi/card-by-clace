import styles from './style/client.module.css'
import { TableLayout, TableHeader, TableBody } from '../re-usables/table'


const clients = [{
    first_name: 'dolapo',
    email: 'oluwole@gmail.com',
    total: 12000,
    _id: '23413422456',
    created_at: 25243534
}]

export default function client () {

    return (
        <div className= {styles.client}>
            <TableLayout>
                <TableHeader headers= {['client', 'revenue']} />
                <TableBody clients= {clients} />
            </TableLayout>
        </div>
    )
}