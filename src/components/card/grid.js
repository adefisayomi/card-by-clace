import styles from './style/grid.module.scss'
import Masonry from 'react-masonry-css'
import { GlobalState } from '../../context/globalState'


export default function grids ({children}) {

    const {UI} = GlobalState()

    const breakPoints = {
        default: 4,
        1200: 3,
        900: 2,
        600: 1
    }

        return (
            <div className= {styles.grid} style= {{ backgroundColor: UI.bgColor, color: UI.color}}>
                <Masonry
                    breakpointCols={breakPoints}
                    className= {styles.my_masonry_grid}
                    columnClassName= {styles.my_masonry_grid_column}
                    
                >
                  {children}
                </Masonry>
            </div>
        )
}