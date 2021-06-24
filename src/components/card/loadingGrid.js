// import { Placeholder } from 'semantic-ui-react'
// import { GlobalState } from '../../context/globalState'
// import styles from './style/loadingGrid.module.scss'


// export default function loadingGrid ({height}) {

//     const {UI} = GlobalState()

//     return (
//         // <div className= {styles.loading} style= {{ height: height }}>
//         //     {/* {
//         //         [1, 2, 3, 4, 5, 6, ].forEach((prod, index) => {
                    // <Placeholder key= {index} style= {{ height: height }} fluid className= {styles.loading_placeholder} inverted= {UI.dark ? true : false}>
                    //     <Placeholder.Image />
                    // </Placeholder>
//         //         })
//         //     } */}
//         // </div>

//     )
// }

import styles from './style/loadingGrid.module.scss'
import Masonry from 'react-masonry-css'
import {Placeholder} from 'semantic-ui-react'
import { GlobalState } from '../../context/globalState'


export default function loadingGrid () {

    const {UI} = GlobalState()

    const breakPoints = {
        default: 4,
        1100: 3,
        750: 2,
        600: 1
    }
    const sizes = [ '230px', '250px', '270px','300px', '400px','450px']
    const pickRandomSize = () => {
        const index = Math.floor(Math.random() * 10)
        return sizes[index]
    }
    let pageSize = typeof window !== 'undefined' && screen.height
    const array = pageSize <= 600 ? sizes.slice(0, 1) : sizes

        return (
            <div className= {styles.grid}>
                <Masonry
                    breakpointCols={breakPoints}
                    className= {styles.my_masonry_grid}
                    columnClassName= {styles.my_masonry_grid_column}
                    
                >
                  {
                       array.map((prod, index) => (
                        <Placeholder key= {index} style= {{ height: pickRandomSize() }} fluid className= {styles.loading_placeholder} inverted= {UI.dark ? true : false}>
                            <Placeholder.Image />
                        </Placeholder>
                      ))
                  }
                </Masonry>
            </div>
        )
}