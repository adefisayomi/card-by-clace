import styles from './style/grid.module.scss'
import Masonry from 'react-masonry-css'


export default function grids ({children}) {

    const breakPoints = {
        default: 4,
        1100: 3,
        750: 2,
        600: 1
    }

        return (
            <div className= {styles.grid}>
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